import "./Header.css"
import cross from "../../assets/Img/top-cross.png";
import minimize from "../../assets/Img/top-minimize.png";
function Header (){
    return(
        <>
            <header>
            <div className="header-container">
                Pomodoro Timerrrrr
            </div>
            <div className="window-controls">
                    <button 
                      className="minimize-btn" 
                      onClick={() => window.electronAPI?.minimizeWindow()}
                    >
                      <img src={minimize} alt="Minimize" />
                    </button>
                    <button 
                      className="close-btn" 
                      onClick={() => window.electronAPI?.closeWindow()}
                    >
                      <img src={cross} alt="Close" />
                    </button>
                    </div>
            </header>
        </>
    )
}

export default Header