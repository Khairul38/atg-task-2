import React, { createContext } from 'react';
import useFirebase from '../Hooks/useFirebase/useFirebase';
import usePosts from '../Hooks/usePosts/usePosts';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const allContext = useFirebase();
    const { poststs } = usePosts();
    const data = { allContext, poststs };
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;