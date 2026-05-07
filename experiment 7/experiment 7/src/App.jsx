import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Student from './componet/Student'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Student name="Rahul Sharma" sub="computer science" marks={85} />
      <Student name="Anita Verma" sub="Information Technology" marks={92} />
      <Student name="Rohan Gupta" sub="Electronics" marks={78} />
    </>
  )
}

export default App
