import { useState, useEffect } from "react";
import settingsIcon from "../../assets/Img/settings.png";
import crossIcon from "../../assets/Img/top-cross.png";
import "./Settings.css";

function Settings({ onSaveTime, onClose, currentWorkTime, currentBreakTime, settingsOn, onButtonClick }) {
    const [tempWorkTime, setTempWorkTime] = useState(currentWorkTime);
    const [tempBreakTime, setTempBreakTime] = useState(currentBreakTime);

    // Reset temp values when props change
    useEffect(() => {
        setTempWorkTime(currentWorkTime);
        setTempBreakTime(currentBreakTime);
    }, [currentWorkTime, currentBreakTime]);

    const handleInputChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1); // Ensure minimum 1
        
        if (e.target.name === "work") {
            setTempWorkTime(value);
        } else if (e.target.name === "break") {
            setTempBreakTime(value);
        }
    };

    const handleSave = () => {
        const work = Number(tempWorkTime);
        const breakVal = Number(tempBreakTime);
        
        if (work > 0 && breakVal > 0) {
            onSaveTime(work, breakVal);
        }
    };

    return (
        <div className={`settings-wrapper ${settingsOn ? 'settings-on' : 'settings-off'}`}>
            <div className="settings-inner">
            <div className="settings-header-wrapper">
                <div className="settings-header">
                    <div className="settings-title">
                        <img src={settingsIcon} alt="Settings" />
                        <h3>Settings</h3>
                    </div>
                    <img 
                        src={crossIcon} 
                        onClick={() => {
                        onButtonClick();
                        onClose();
                    }}
                        alt="Close" 
                        className="close-icon pointer"
                    />
                </div>
            </div>
            <div className="timer-settings-container">
                <h3>Timer</h3>
                <div className="timer-settings-inputs">
                    <div className="input-group">
                        <label>
                            <input 
                                name="work" 
                                type="number"
                                min="1"
                                value={tempWorkTime}
                                onChange={handleInputChange}
                            />
                            Focus (min)
                        </label>
                    </div>
                    <div className="input-group">
                        <label>
                            <input 
                                name="break" 
                                type="number"
                                min="1"
                                value={tempBreakTime}
                                onChange={handleInputChange}
                            />
                            Break (min)
                        </label>
                    </div>
                </div>
                <button 
                    className="save-button" 
                    onClick={() => {
                        handleSave();
                        onButtonClick();
                        onClose();
                    }}
                >
                    Save changes
                </button> 
            </div>
            </div>
        </div>
    );
}

export default Settings;