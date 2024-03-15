import React from 'react';
import CheckLogin from '../components/CheckLogin';

export default function Home() {
    return (
        <div>
            <CheckLogin /> {/* Check if user is logged in */}
            <h1>Home</h1>
        </div>
    );
}
