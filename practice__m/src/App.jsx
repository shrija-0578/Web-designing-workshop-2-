import { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [table, setTable] = useState([]);

  const generateTable = () => {
    let result = [];

    for (let i = 1; i <= 10; i++) {
      result.push(`${number} × ${i} = ${number * i}`);
    }

    setTable(result);
  };

  return (
    <div className="container">
      <h1>Multiplication Table Generator</h1>

      <input
        type="number"
        placeholder="Enter a number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button onClick={generateTable}>
        Generate Table
      </button>

      <div className="table">
        {table.map((row, index) => (
          <p key={index}>{row}</p>
        ))}
      </div>
    </div>
  );
}

export default App;