import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { allContext } = useAuth();
    const { user, isLoading } = allContext;
    let location = useLocation();
    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress sx={{ color: '#EC9C31' }} />
        </Box>
    }
    if (user.email) {
        return children;
    }
    return <Navigate to="login" state={{ from: location }}></Navigate>
};

export default PrivateRoute;