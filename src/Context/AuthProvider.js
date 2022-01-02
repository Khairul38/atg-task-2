import React, { createContext } from 'react';
import useFirebase from '../Hooks/useFirebase/useFirebase';
import useProducts from '../Hooks/useProducts/useProducts';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const allContext = useFirebase();
    const { products } = useProducts();
    const data = { allContext, products };
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;