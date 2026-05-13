import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  
// --------------------


  const validateForm = () => {

    let formErrors = {};

    if (name === '') {
      formErrors.name = 'Name is required';
    }

    if (email === '') {
      formErrors.email = 'Email is required';
    }

    if (password === '') {
      formErrors.password = 'Password is required';
    }
    if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters long';
    }
    if(!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email is invalid';
    }
     return (

    <div className="App">

      <div className="container">

        <h1>Registration Form</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit">Register</button>

        </form>

        <h2>Registered Users</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name} - {user.email}</li>
          ))}
        </ul>

      </div>

    </div>    
            )

  };

  return 
}

export default App
