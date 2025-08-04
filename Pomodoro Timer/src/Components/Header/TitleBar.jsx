import "./Header.css";
import cross from "../../assets/Img/top-cross.png";
import minimize from "../../assets/Img/top-minimize.png";

function TitleBar() {
  const handleMinimize = () => {
    console.log('Minimize clicked'); // Debugging
    if (window.electronAPI?.minimizeWindow) {
      window.electronAPI.minimizeWindow();
    } else {
      console.error('Electron API not available');
    }
  };

  const handleClose = () => {
    console.log('Close clicked'); // Debugging
    if (window.electronAPI?.closeWindow) {
      window.electronAPI.closeWindow();
    } else {
      console.error('Electron API not available');
    }
  };

  return (
    <div className="custom-title-bar">
      <div className="window-title"><h4>Pomodoro Timer.:☆</h4></div>
      <div className="window-controls">
        <div 
          className="minimize-btn title-btn" 
          onClick={handleMinimize}
        >
          <img src={minimize} alt="Minimize" />
        </div>
        <div 
          className="close-btn title-btn" 
          onClick={handleClose}
        >
          <img src={cross} alt="Close" />
        </div>
      </div>
    </div>
  );
}

export default TitleBar;