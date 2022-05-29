import { useState, useEffect } from 'react';

function Timer({length = 60, buzz, tick}) {
    const [start] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(start);
    const end = start ? new Date(start.getTime() + (length * 1000)) : null;
    const timeRemaining = currentTime && end ? Math.round((end.getTime() - currentTime.getTime()) / 1000) : length;

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), length);

        return () => {
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        if (timeRemaining <= 0) {
            buzz();
            return;
        }

        tick(timeRemaining);
    }, [currentTime]);
}

export default Timer;