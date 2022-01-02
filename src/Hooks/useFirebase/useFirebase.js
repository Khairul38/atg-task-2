import { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from "firebase/auth";
import initializeFirebase from '../../Firebase/Firebase.init';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);

    const auth = getAuth();

    /* Provider */
    const googleProvider = new GoogleAuthProvider();

    /* Google Login/Register */
    const loginUsingGoogle = (location, navigate) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user
                setUser(user);
                saveUser(user.email, user.displayName, 'PUT');
                setError('');
                const redirect = location?.state?.from || '/';
                navigate(redirect);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    /* Display Name/User Name */
    const setUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(result => {
                setError('');
            })
            .catch(error => {
                setError(error.message);
            })
    }

    /* Email+Password Registration */
    const handleRegistration = (email, password, name, location, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const newUser = { email, displayName: name }
                setUser(newUser);
                setUserName(name);
                // save user to database
                saveUser(email, name, 'POST');
                setError('');
                const redirect = location?.state?.from || '/';
                navigate(redirect);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    /* Email+Password Login */
    const handleLogin = (email, password, location, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user);
                setError('');
                const redirect = location?.state?.from || '/';
                navigate(redirect);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    /* Log Out */
    const logout = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    /* Get the currently signed -in user */
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth]);

    /* Save user to database */
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://aqueous-stream-28542.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    /* Find Admin */
    useEffect(() => {
        setLoading(true);
        fetch(`https://aqueous-stream-28542.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
            .finally(() => setLoading(false));
    }, [user.email])

    // Customized Button
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(orange[200]),
        backgroundColor: orange[200],
        '&:hover': {
            backgroundColor: orange[300],
        },
    }));

    return { user, error, admin, isLoading, ColorButton, loading, setError, setUser, setUserName, setIsLoading, loginUsingGoogle, handleRegistration, handleLogin, logout }
};

export default useFirebase;