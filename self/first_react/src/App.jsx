import kgbutton from "./kgbutton";
import Hello from "./hello";
import Reuseable from "./reuseable";
function App()  {
  return <div>
    <h1>Hello World</h1>
    {/* not working
      <kgbutton >button</kgbutton>  */}
      <Hello/>
      <Reuseable></Reuseable>
      <Reuseable></Reuseable>
      <Reuseable></Reuseable>
      <Reuseable></Reuseable>
  </div>  
}
 
export default App;