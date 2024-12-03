import { useEffect, useState } from "react"
import "./Menu.css"
import { Plugins } from "../Widgets/Plugins";
import { usePluginStore } from "../../stores/pluginStore";

const Menu = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState([]);
  const setPluginOpen = usePluginStore(state => state.setPluginOpen);
  const setPluginsPosition = usePluginStore(state => state.setPluginsPosition);
  const pluginsOpen = usePluginStore(state => state.pluginsOpen);

  const handleMenu = (e) => {
    const clickMenu = e.target.closest('.menu');
    const background = document.querySelector(".background");
    if(e.button === 2 && background.contains(e.target)){
      setMousePos([e.y, e.x]);
      setIsMenuOpen(true);
    } else if(e.button === 0 && !clickMenu && isMenuOpen){
      setIsMenuOpen(false);
    }
  }

  const handlePluginOpen = (e) => {
    let id = parseInt(e.currentTarget.dataset.id);
    setPluginOpen(id);
    let heightLimit = (window.innerHeight / 5) * 2.7;
    let WidthLimit = (window.innerWidth / 6) * 4;
    let pluginPosX = mousePos[1] > WidthLimit ? WidthLimit : mousePos[1];
    let pluginPosY = mousePos[0] > heightLimit ? heightLimit : mousePos[0];
    setPluginsPosition({
      id,
      y: pluginPosY,
      x: pluginPosX
    })
    setIsMenuOpen(false);
  }

  useEffect(() => {

    window.addEventListener("contextmenu", e => {
      e.preventDefault();
    })

    window.addEventListener("mousedown", handleMenu)

    return () => {
      window.removeEventListener("mousedown", handleMenu);
    }
  },[isMenuOpen])
  
  return (
      <div className="menu" style={{display: `${isMenuOpen ? "flex" : "none"}`, top: mousePos[0] + 2 || 0, left: mousePos[1] + 2 || 0}}>
        <div className="options button">
          <span className="text">Open</span>
          <span className="options_open">&gt;</span>
          <div className="extra_option">
            {Plugins.map(element => 
              <div 
                className={`action button ${pluginsOpen.includes(element.data.id) ? 'disabled' : ''}`} 
                data-id={element.data.id} key={element.data.id} 
                onClick={handlePluginOpen}
              >
                <span className="text">{element.data.name}</span>
              </div>
            )}
          </div>
        </div>
        <div className="toggle button">
            <span className="checkmark">✓</span>
            <span className="text">Disabled</span>
        </div>
        <div className="options button">
            <span className="text">Replace</span>
            <span className="options_open">&gt;</span>
        </div>
        <hr className="separator" />
        <div className="toggle button">
            <span className="checkmark">✓</span>
            <span className="text">Animations</span>
        </div>
      </div>
  )
}

export default Menu