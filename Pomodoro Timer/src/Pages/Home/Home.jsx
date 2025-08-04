import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Timer from "../../Components/Timer/Timer";
import Header from "../../Components/Header/Header";
import Settings from "../../Components/Settings/Settings";
import bgImg from "../../assets/Img/BG_IMG.png"; 
import settingsIcon from "../../assets/Img/settings.png"
import TitleBar from "../../Components/Header/TitleBar";
import clickSound from "../../assets/Audio/AU_button-click.mp3";

function App() {
  const navigate = useNavigate();
  const [workTime, setWorkTime] = useState(40);
  const [breakTime, setBreakTime] = useState(5);
  const [settingsOn, setSettingsOn] = useState(false); // Start with false (hidden)

  const ringAudio = useRef(null);

  //New audio instance
  useEffect(() => {
      ringAudio.current = new Audio(clickSound);
      return () => {
          if (ringAudio.current) {
          ringAudio.current.pause();
          ringAudio.current = null;
          }
      };
  }, []);


  const handleSaveSettings = (newWorkTime, newBreakTime) => {
    setWorkTime(newWorkTime);
    setBreakTime(newBreakTime);
    setSettingsOn(false); // Close settings after saving
  };

  const toggleSettings = () => {
    setSettingsOn(prev => !prev); // Toggle visibility
  };

    //PLAY audio
  const playCLickSound = () => {
      if (ringAudio.current) {
        ringAudio.current.currentTime = 0; // Rewind to start
        ringAudio.current.play().catch(e => console.log("Audio play failed:", e));
      }
  };


  return (
    <>
      
      <div className="home-wrapper">
        <TitleBar />
        <div className="settings pointer">
          <img 
            src={settingsIcon} 
            onClick={() => {
              toggleSettings();
              playCLickSound();
            }} 
            alt="Settings"
          />
        </div>
        <Timer key={`${workTime}-${breakTime}`} workTime={workTime} breakTime={breakTime} onButtonClick={playCLickSound} />
        <Settings 
          onSaveTime={handleSaveSettings}
          onClose={toggleSettings}
          currentWorkTime={workTime}
          currentBreakTime={breakTime}
          settingsOn={settingsOn} // Pass the visibility state
          onButtonClick={playCLickSound}
        />
      </div>
    </>
  );
}

export default App;