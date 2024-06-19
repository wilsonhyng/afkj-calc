import React, { useState, useEffect } from 'react';

const calculateResults = (essencePerDayInput, currentEssenceInput, totalEssenceInput) => {
  console.log('Essence a day', essencePerDayInput);
  console.log('Current Essence ', currentEssenceInput);
  console.log('Total Essence ', totalEssenceInput);

  return ((parseFloat(totalEssenceInput) - parseFloat(currentEssenceInput)) / (parseFloat(essencePerDayInput) / 24) * 60);
};

const App = () => {
  const [essencePerDayInput, setEssencePerDayInput] = useState('');
  const [currentEssenceInput, setCurrentEssenceInput] = useState('');
  const [totalEssenceInput, setTotalEssenceInput] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedEssensePerDayInput = localStorage.getItem('essencePerDayInput');
    const savedCurrentEssenceInput = localStorage.getItem('currentEssenceInput');
    const savedTotalEssenceInput = localStorage.getItem('totalEssenceInput');

    if (savedEssensePerDayInput) setEssencePerDayInput(savedEssensePerDayInput);
    if (savedCurrentEssenceInput) setCurrentEssenceInput(savedCurrentEssenceInput);
    if (savedTotalEssenceInput) setTotalEssenceInput(savedTotalEssenceInput);

  }, []);

  useEffect(() => {
    localStorage.setItem('essencePerDayInput', essencePerDayInput);
    localStorage.setItem('currentEssenceInput', currentEssenceInput);
    localStorage.setItem('totalEssenceInput', totalEssenceInput);
  }, [essencePerDayInput, currentEssenceInput, totalEssenceInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = calculateResults(essencePerDayInput, currentEssenceInput, totalEssenceInput);
    setResult(res);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Essence / day</h2>
        <input
          type="text"
          value={essencePerDayInput}
          onChange={(e) => setEssencePerDayInput(e.target.value)}
        />
        <h2>Current Essence</h2>
        <input
          type="text"
          value={currentEssenceInput}
          onChange={(e) => setCurrentEssenceInput(e.target.value)}
        />
        <h2>Total Essence</h2>
        <input
          type="text"
          value={totalEssenceInput}
          onChange={(e) => setTotalEssenceInput(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>
      {result !== null && <h2>Result: {result} minutes</h2>}
    </div>
  );
};

export default App;