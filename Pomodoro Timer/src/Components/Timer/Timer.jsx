import { useState, useEffect, useRef } from "react";
import "./Timer.css"
import restart from "../../assets/Img/restart.png"
import idleGIF from "../../assets/Img/idle.gif";
import breakGIF from "../../assets/Img/break.gif";
import workGIF from "../../assets/Img/work.gif"
import ringSound from "../../assets/Audio/AU_ringing.mp3";



function Timer({workTime, breakTime, onButtonClick}) {

    const [timeLeft, setTimeLeft] = useState(workTime * 60); // in seconds
    const [isActive, setIsActive] = useState(false);
    const [isWorkMode, setIsWorkMode] = useState(true);
    const timerRef = useRef(null);

    const ringAudio = useRef(null);

    // Reset timer when workTime or mode changes
    useEffect(() => {
        setTimeLeft(isWorkMode ? workTime * 60 : breakTime * 60);
        setIsActive(false);
    }, [workTime, breakTime, isWorkMode]);

    //AUdio import
    useEffect(() => {
        ringAudio.current = new Audio(ringSound);
        return () => {
            if (ringAudio.current) {
            ringAudio.current.pause();
            ringAudio.current = null;
            }
        };
    }, []);
    // Timer logic
    useEffect(() => {
        let interval;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Switch mode when timer reaches 0
            setIsWorkMode(!isWorkMode);
            checkWorkMode();
            //Play ringtone to notify user
            playRingSound();

        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, isWorkMode]);

    // Format time display
    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleStartStop = () => {
        setIsActive(!isActive);
    };

    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(isWorkMode ? workTime * 60 : breakTime * 60);
    };

    const checkWorkMode = () =>{
        setTimeLeft(isWorkMode ? workTime * 60 : breakTime * 60);
    }

    const setNewTimes = (workTime, breakTime) => {
        setWorkTime(workTime);
        setBreakTime(breakTime);
    }

    //PLAY audio
    const playRingSound = () => {
        if (ringAudio.current) {
            ringAudio.current.currentTime = 0; // Rewind to start
            ringAudio.current.play().catch(e => console.log("Audio play failed:", e));
        }
    };
    return (
        <div className="timer-container">
            <div className="mode-buttons">
                <button 
                    className={`button ${isWorkMode ? 'active' : ''}`}
                    onClick={() => {setIsWorkMode(true); onButtonClick()}}
                >
                    Focus
                </button>
                <button 
                    className={`button ${!isWorkMode ? 'active' : ''}`}
                    onClick={() => {setIsWorkMode(false); onButtonClick();}}
                >
                    Break
                </button>
            </div>
            
            <div className="time-display" ref={timerRef}>
                {formatTime()}
            </div>

            <div className="gif-container">
            <img src={
                isActive 
                ? (isWorkMode ? workGIF : breakGIF)
                : idleGIF
            } alt="Timer status" />
            </div>
            
            <div className="bottom-buttons">
                <button className="button" onClick={() => {handleStartStop(); onButtonClick();}}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <img src={restart} onClick={() => {handleReset(); onButtonClick();}} className="restartButton"/>

            </div>
        </div>
    );
}


export default Timer;