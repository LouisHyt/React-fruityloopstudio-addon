import './App.css'
import {Background, Menu, Widgets} from './Components'

const App = () => {

  return (
    <div className='container'>
      <Menu />
      <Widgets />
      <Background />
    </div>
  )
}

export default App
