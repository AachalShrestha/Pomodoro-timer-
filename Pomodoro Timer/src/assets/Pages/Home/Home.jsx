import { use, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Timer from "../../Components/Timer/Timer";
import Header from "../../Components/Header/Header";
import Settings from "../../Components/Settings/Settings";


function App() {
  const navigate = useNavigate()
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const setNewTimes = (newWorkTime, newBreakTime) => {
    setWorkTime(newWorkTime);
    setBreakTime(newBreakTime);
  };
  return (
    <>
     <div>
        <Header/>
        <div className="settings">
          <button className="button settings-button" onClick={() => navigate("/settings")}>Settings</button>
        </div>
      <Timer newWorkTime={workTime} newBreakTime={breakTime} />
      <Settings setNewTimes={setNewTimes} />
     </div>
    </>
  );
}

export default App;
