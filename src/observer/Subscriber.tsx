import { useEffect, useState } from 'react';
import { counterObserver } from './observer'; // Adjust the import path as needed

const CounterDisplay = () => {
    const [msg, setMsg] = useState('')

    useEffect(() => {
        const subscribe = counterObserver.subscribe(setMsg);

        // Clean up the subscription when the component unmounts
        return subscribe;
    }, []);

    return <p>message: {msg}</p>;
};

export default CounterDisplay;
