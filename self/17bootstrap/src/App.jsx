import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div>  
   <h3>Welcome to Bootstrap</h3> 
   <button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
  </div>
  )
}

export default App 
