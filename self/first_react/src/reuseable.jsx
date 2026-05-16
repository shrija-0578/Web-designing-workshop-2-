function Reuseable() {
  return <div style={{border:"1px solid black", margin:"10px", padding:"10px",display:"inline-block",backgroundColor:"lightblue"}}>
    <h3>This is a reuseable component</h3>
    <p>random no. is{Math.round(Math.random() * 100)}</p>
    
  </div>
}
export default Reuseable;