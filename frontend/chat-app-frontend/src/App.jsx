import { useState } from 'react'
import ChatComponent from './ChatComponent';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <h1 style={{"color": 'red'}}>Fly like an eagle</h1>
      <ChatComponent />
    </div>
    </>
  )
}

export default App
