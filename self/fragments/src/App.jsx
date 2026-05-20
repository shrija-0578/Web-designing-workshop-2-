import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  let items=["An item", "A second item", "A third item","fourth", "A fourth item", "And a fifth one"];
  // let items=[];
  return (
    <>
      <h1>Fragments</h1>  
      {(items.length==0 ? <h3> empty list </h3>: null) }
      <ul class="list-group">
        {items.map((item) => (
          <li class="list-group-item"  key={item}> {item} </li>
        ))} 
        
      </ul> 
    </>
  )
}

export default App
