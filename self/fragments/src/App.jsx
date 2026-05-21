import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Itemlist from "./components/Itemslist"  ;
import Errormes from "./components/Errormes"  ;
function App() {
  const [count, setCount] = useState(0)
  
  // let items=[];
  let items=[];

  return (
    <>
      <h1>Fragments</h1>  
      <Errormes items={items}></Errormes> 
      <Itemlist items={items}></Itemlist>
    </>
  )
}

export default App
