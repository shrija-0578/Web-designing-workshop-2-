import { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");

  const checkPrime = () => {
    const num = parseInt(number);

    if (num <= 1) {
      setResult(`${num} is NOT a Prime Number`);
      return;
    }

    let isPrime = true;

    for (let i = 2; i <= num/2; i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      setResult(`${num} is a Prime Number`);
    } else {
      setResult(`${num} is NOT a Prime Number`);
    }
  };

  return (
    <div className="container">
      <h1>Prime Number Checker</h1>

      <input
        type="number"
        placeholder="Enter a Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button onClick={checkPrime}>
        Check
      </button>

      <h2>{result}</h2>
    </div>
  );
}

export default App;