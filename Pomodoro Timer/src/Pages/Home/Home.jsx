import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Timer from "../../Components/Timer/Timer";
import Header from "../../Components/Header/Header";
import Settings from "../../Components/Settings/Settings";
import bgImg from "../../assets/Img/BG_IMG.png"; 
import settingsIcon from "../../assets/Img/settings.png"
import TitleBar from "../../Components/Header/TitleBar";

function App() {
  const navigate = useNavigate();
  const [workTime, setWorkTime] = useState(40);
  const [breakTime, setBreakTime] = useState(5);
  const [settingsOn, setSettingsOn] = useState(false); // Start with false (hidden)

  const handleSaveSettings = (newWorkTime, newBreakTime) => {
    setWorkTime(newWorkTime);
    setBreakTime(newBreakTime);
    setSettingsOn(false); // Close settings after saving
  };

  const toggleSettings = () => {
    setSettingsOn(prev => !prev); // Toggle visibility
  };

  return (
    <>
      
      <div className="home-wrapper">
        <TitleBar />
        <div className="settings">
          <img src={settingsIcon} onClick={toggleSettings} alt="Settings"/>
        </div>
        <Timer key={`${workTime}-${breakTime}`} workTime={workTime} breakTime={breakTime} />
        <Settings 
          onSave={handleSaveSettings}
          onClose={toggleSettings}
          currentWorkTime={workTime}
          currentBreakTime={breakTime}
          settingsOn={settingsOn} // Pass the visibility state
        />
      </div>
    </>
  );
}

export default App;