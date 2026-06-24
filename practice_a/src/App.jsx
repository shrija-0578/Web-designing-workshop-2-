import { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [color, setColor] = useState("black");

  const checkArmstrong = () => {
    let num = parseInt(number);
    let temp = num;
    let digits = num.toString().length;
    let sum = 0;

    while (temp > 0) {
      let digit = temp % 10;
      sum += digit ** digits;
      temp = Math.floor(temp / 10);
    }

    if (sum === num) {
      setResult(`${num} is an Armstrong Number`);
      setColor("green");
    } else {
      setResult(`${num} is NOT an Armstrong Number`);
      setColor("red");
    }
  };

  return (
    <div className="container">
      <h1>Armstrong Number Checker</h1>

      <input
        type="number"
        placeholder="Enter a Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button onClick={checkArmstrong}>
        Check
      </button>

      <h2 style={{ color: color }}>{result}</h2>
    </div>
  );
}

export default App;