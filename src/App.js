import React, { useState, useEffect } from 'react';
import './App.css';


// const calculateResults = (essencePerDayInput, currentEssenceInput, totalEssenceInput) => {
//   console.log('Essence a day', essencePerDayInput);
//   console.log('Current Essence ', currentEssenceInput);
//   console.log('Total Essence ', totalEssenceInput);

//   return ((parseFloat(totalEssenceInput) - parseFloat(currentEssenceInput)) / (parseFloat(essencePerDayInput) / 24) * 60);
// };


const calculateResults = (goldPerHourInput, essencePerDayInput, xpPerHourInput, currentEssenceInput, totalEssenceInput) => {
  const minutes = ((parseFloat(totalEssenceInput) - parseFloat(currentEssenceInput)) / (parseFloat(essencePerDayInput) / 24) * 60);

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.floor(minutes % 60);
  const seconds = Math.floor((minutes * 60) % 60);

  const now = new Date();
  const futureTime = new Date(now.getTime() + minutes * 60000);

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  let futureHours = futureTime.getHours();
  const futureMinutes = futureTime.getMinutes();
  const ampm = futureHours >= 12 ? 'PM' : 'AM';
  futureHours = futureHours % 12 || 12;

  const formattedFutureTime = `${String(futureHours).padStart(2, '0')}:${String(futureMinutes).padStart(2, '0')} ${ampm}`;

  return {
    futureTime,
    formattedTime,
    formattedFutureTime
  };
};


const App = () => {
  const [goldPerHourInput, setGoldPerHourInput] = useState('');
  const [essencePerDayInput, setEssencePerDayInput] = useState('');
  const [xpPerHourInput, setXpPerHourInput] = useState('');

  const [currentGoldInput, setCurrentGoldInput] = useState('');
  const [totalGoldInput, setTotalGoldInput] = useState('');

  const [currentEssenceInput, setCurrentEssenceInput] = useState('');
  const [totalEssenceInput, setTotalEssenceInput] = useState('');

  const [currentXpInput, setCurrentXpInput] = useState('');
  const [totalXpInput, setTotalXpInput] = useState('');
  const [result, setResult] = useState(null);

  // Countdown logic
  const [countdown, setCountdown] = useState("00:00:00"); // Placeholder for the countdown

  const handleInputFocus = (inputId) => {
    localStorage.setItem("lastFocusedInput", inputId);
  };

  useEffect(() => {
    const savedGoldPerHourInput = localStorage.getItem('goldPerHourInput');
    const savedCurrentGoldInput = localStorage.getItem('currentGoldInput');
    const savedTotalGoldInput = localStorage.getItem('totalGoldInput');

    const savedEssensePerDayInput = localStorage.getItem('essencePerDayInput');
    const savedCurrentEssenceInput = localStorage.getItem('currentEssenceInput');
    const savedTotalEssenceInput = localStorage.getItem('totalEssenceInput');

    const savedXpPerHourInput = localStorage.getItem('xpPerHourInput');
    const savedCurrentXpInput = localStorage.getItem('currentXpInput');
    const savedTotalXpInput = localStorage.getItem('totalXpInput');



    if (savedGoldPerHourInput) setGoldPerHourInput(savedGoldPerHourInput);
    if (savedCurrentGoldInput) setCurrentGoldInput(savedCurrentGoldInput);
    if (savedTotalGoldInput) setTotalGoldInput(savedTotalGoldInput);

    if (savedEssensePerDayInput) setEssencePerDayInput(savedEssensePerDayInput);
    if (savedCurrentEssenceInput) setCurrentEssenceInput(savedCurrentEssenceInput);
    if (savedTotalEssenceInput) setTotalEssenceInput(savedTotalEssenceInput);

    if (savedXpPerHourInput) setXpPerHourInput(savedXpPerHourInput);
    if (savedCurrentXpInput) setCurrentXpInput(savedCurrentXpInput);
    if (savedTotalXpInput) setTotalXpInput(savedTotalXpInput);

    const lastFocusedInput = localStorage.getItem("lastFocusedInput");
    let inputElement;
    if (lastFocusedInput) {
      inputElement = document.getElementById(lastFocusedInput);
    }
    if (!inputElement) {
      // If no last focused input found, default to the first input in the form
      inputElement = document.querySelector("input");
    }
    if (inputElement) {
      inputElement.focus();
    }


  }, []);

  useEffect(() => {
    if (result) {
      const interval = setInterval(() => {
        const now = new Date();
        const timeLeft = result.futureTime - now;

        if (timeLeft <= 0) {
          clearInterval(interval);
          setCountdown("Level Up!");
        } else {
          const hours = Math.floor(timeLeft / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

          setCountdown(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [result]);

  useEffect(() => {
    localStorage.setItem('goldPerHourInput', goldPerHourInput);
    localStorage.setItem('currentGoldInput', currentGoldInput);
    localStorage.setItem('totalGoldInput', totalGoldInput);

    localStorage.setItem('essencePerDayInput', essencePerDayInput);
    localStorage.setItem('currentEssenceInput', currentEssenceInput);
    localStorage.setItem('totalEssenceInput', totalEssenceInput);

    localStorage.setItem('xpPerHourInput', xpPerHourInput);
    localStorage.setItem('currentXpInput', currentXpInput);
    localStorage.setItem('totalXpInput', totalXpInput);
  }, [goldPerHourInput, currentGoldInput, totalGoldInput, essencePerDayInput, currentEssenceInput, totalEssenceInput, xpPerHourInput, currentXpInput, totalXpInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = calculateResults(goldPerHourInput, essencePerDayInput, xpPerHourInput, currentEssenceInput, totalEssenceInput);
    setResult(res);
  };

  return (
    <div className="app-container">
      <div className="title">
        AFK Journey Calculator
      </div>
      <img
        src="/detail-footer.jpg"
        alt="AFK Journey"
        className="responsive-image"
      />
      <div>
        <form className="flex-form" onSubmit={handleSubmit}>
          <h2>Gold / hr:</h2>
          <input
            id="goldPerHour"
            type="number"
            value={goldPerHourInput}
            onChange={(e) => {
              setGoldPerHourInput(e.target.value);
              handleInputFocus("goldPerHour");
            }}
            required />
          <h2>Essence / day:</h2>
          <input
            id="essencePerDay"
            type="number"
            value={essencePerDayInput}
            onChange={(e) => {
              setEssencePerDayInput(e.target.value);
              handleInputFocus("essencePerDay");
            }}
            required />
          <h2>XP / hour:</h2>
          <input
            id="xpPerHour"
            type="number"
            value={xpPerHourInput}
            onChange={(e) => {
              setXpPerHourInput(e.target.value);
              handleInputFocus("xpPerHour");
            }}
            required />
          <h2>Current Essence:</h2>
          <input
            id="currentEssence"
            type="number"
            value={currentEssenceInput}
            onChange={(e) => {
              setCurrentEssenceInput(e.target.value);
              handleInputFocus("currentEssence");
            }}
            required />
          <h2>Total Essence:</h2>
          <input
            id="totalEssence"
            type="number"
            value={totalEssenceInput}
            onChange={(e) => {
              setTotalEssenceInput(e.target.value);
              handleInputFocus("totalEssence");
            }}
            required />
          <button type="submit" className="calculate-button">Calculate</button>
        </form>
        <div className="calculate-results">
        <h2>{result ? 'You will level in' : ''}</h2>
        <h2>{result ? countdown : ''}</h2>
        <h2>{result ? `at ${result.formattedFutureTime}` : ''}</h2>
      </div>
      </div>
    </div>
  );
};

export default App;