import { useState } from "react";
import "./App.css";

function App() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [interest, setInterest] = useState("");

  const calculateInterest = () => {
    const si = (principal * rate * time) / 100;
    setInterest(si);
  };

  return (
    <div className="container">
      <h1>Simple Interest Calculator</h1>

      <input
        type="number"
        placeholder="Enter Principal"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Rate (%)"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Time (Years)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button onClick={calculateInterest}>
        Calculate
      </button>

      <h2>Simple Interest: {interest}</h2>
    </div>
  );
}

export default App;