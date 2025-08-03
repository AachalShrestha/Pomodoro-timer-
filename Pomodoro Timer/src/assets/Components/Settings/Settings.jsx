import { useState } from "react";
import Header from "../Header/Header";

function Settings ({setNewTimes}) {
    const [tempWorkTime, setTempWorkTime] = useState(25);
  const [tempBreakTime, setTempBreakTime] = useState(5);
    return(

        <>
            <Header/>
            <div className="settings-header">
                <h3>Settings</h3>
            </div>
            <div className="timer-settings-container">
                <div>
                    <input >
                    </input>
                    Minutes
                </div>
                <div>
                    <input >
                    </input>
                    Seconds
                </div>
            <button className="button" onClick={() => setNewTimes(tempWorkTime, tempBreakTime)}>Save changes</button> 
            </div>
        </>
    )
}
export default Settings;