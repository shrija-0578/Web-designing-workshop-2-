import { useState } from 'react'
import './App.css'

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState("");

// shrija Lal
  const handleSubmit = (e) => {

    e.preventDefault();
// varication
    if(name === "" || email === "" || password === ""){
      setMessage("Please fill all the fields");
      return;
    }
    if(email.indexOf("@") === -1){
      setMessage("Please enter a valid email address");
      return;
    }

    const newuser = {
      name: name,
      email: email,
      password: password
    };
    setUsers([...users, newuser]);
    setName("");
    setEmail("");
    setPassword("");
    setMessage("User registered successfully");
  };

  return (
    <div className="container">

      <div className="form-box">

        <h1>Registration Form</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />          <button type="submit">
            Register
          </button>
        </form>
        <p className="success-message">
          {message}
        </p>

        <div className="users-box">

          <h2>Registered Users</h2>

          <ul>
            {
              users.map((user,index)=>(
                <li key={index}>
                  {user.name} - {user.email}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
export default App