import React, { useState, useEffect } from 'react';

export default function CounterHook() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Current Count: ${count}`;
    }, [count]);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>useState & useEffect Demo</h2>
            <h3>Count: {count}</h3>
            <button onClick={() => setCount(count + 1)} style={{ marginRight: '10px' }}>Increment</button>
            <button onClick={() => setCount(count - 1)} style={{ marginRight: '10px' }}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}
