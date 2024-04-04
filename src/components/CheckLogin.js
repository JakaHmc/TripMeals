import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { auth } from './Firebase';

function CheckLogin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Replace useHistory with useNavigate

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsLoggedIn(!!user); // Set isLoggedIn to true if user exists, false otherwise
        });

        return () => unsubscribe();
    }, []);

    // Redirect to login page if user is not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            console.log("Lol")
            navigate('/login'); // Use navigate function instead of history.push
        }
    }, [isLoggedIn, navigate]);

    // No need to return anything from CheckLogin component
    return null;
}

export default CheckLogin;
