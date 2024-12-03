import SmallSquare from "./SmallSquare.jsx"

const BigSquare = () => {
  return (
    <div className="bigSquare">
       {Array(4).fill(true).map((_, i) => <SmallSquare key={i} />)} 
    </div>
  )
}

export default BigSquare
