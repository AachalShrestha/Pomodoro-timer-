import { useState, useEffect, useRef } from "react";

function Timer({ workTime, breakTime }) {
    const [timeLeft, setTimeLeft] = useState(workTime * 60);
    const [isActive, setIsActive] = useState(false);
    const [isWorkMode, setIsWorkMode] = useState(true);
    const timerRef = useRef(null);

    // Reset when workTime/breakTime props change
    useEffect(() => {
        setTimeLeft(isWorkMode ? workTime * 60 : breakTime * 60);
        setIsActive(false);
    }, [workTime, breakTime, isWorkMode]);

    // Timer logic
    useEffect(() => {
        let interval;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsWorkMode(!isWorkMode);
            setTimeLeft(!isWorkMode ? workTime * 60 : breakTime * 60);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, isWorkMode, workTime, breakTime]);

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="timer-container">
            {/* ... (keep your existing JSX) ... */}
        </div>
    );
}

export default Timer;