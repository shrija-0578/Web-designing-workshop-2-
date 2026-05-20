import { useState } from 'react'
import App_name from "./components/App_name.jsx";
import Add_todo from "./components/Add_todo.jsx";
import Todo_item from './components/Todo_item.jsx';
import './App.css';
function App(){
  return(
    <center class="container_todo">
    <App_name/>   
    <Add_todo/>
    <Todo_item/>
    </center>
  )
}
  

export default App
