import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from './Firebase';

function CheckLogin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsLoggedIn(!!user); // Set isLoggedIn to true if user exists, false otherwise
        });

        return () => unsubscribe();
    }, []);

    // Redirect to login page if user is not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            history.push('/login');
        }
    }, [isLoggedIn, history]);

    // No need to return anything from CheckLogin component
    return null;
}

export default CheckLogin;
