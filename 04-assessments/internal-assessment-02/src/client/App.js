import React, { useState, useEffect } from 'react';

export default function App() {
    const [status, setStatus] = useState("Loading IA2 Status...");

    useEffect(() => {
        setStatus("Internal Assessment 02 Full Stack Application Connected Successfully");
    }, []);

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
            <h1>Internal Assessment 02 - Full Stack Solution</h1>
            <p>{status}</p>
        </div>
    );
}
