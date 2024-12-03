import "./Background.css"
import BigSquare from "./BigSquare"

const Background = () => {


  return (
    <div className="background">
      <div className="logo">
          <p className="logo__text">LD</p>   
      </div>
      {Array(325).fill(true).map((_, i) => <BigSquare key={i} />)}    
    </div>
  )
}

export default Background
