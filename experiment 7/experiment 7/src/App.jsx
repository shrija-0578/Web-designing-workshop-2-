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
    <div className="main-container">
      <h1>Student Information</h1>

      <div className="card">
        <h2>Rahul Sharma</h2>
        <p>Course: Computer Science</p>
        <p>Marks: 85</p>
      </div>

      <div className="card">
        <h2>Anita Verma</h2>
        <p>Course: Information Technology</p>
        <p>Marks: 92</p>
      </div>

      <div className="card">
        <h2>Rohan Gupta</h2>
        <p>Course: Electronics</p>
        <p>Marks: 78</p>
      </div>
    </div>
    </>
  )
}

export default App
