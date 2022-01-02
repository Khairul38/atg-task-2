import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from "firebase/auth";
import initializeFirebase from '../../Firebase/Firebase.init';

initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);

    const auth = getAuth();


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
        fetch('https://shrouded-stream-50106.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return { user, error, admin, isLoading, loading, setError, setUser, setUserName, setIsLoading, handleRegistration, handleLogin, logout }
};

export default useFirebase;