import { useState } from "react";
import "./App.css";

// Define the App component
const App = () => {
  // State for saving event name
  const [eventName, setEventName] = useState("");
  const [start, setStart] = useState("Start");

  // State for timer functionality
  const [countdown, setCountdown] = useState("");
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerID, setTimerID] = useState(null);

  // Function to handle starting the timer
  const startTimer = () => {
    // Get date and time inputs
    const dateInput = document.getElementById("date").value;
    const timeInput = document.getElementById("time").value;
    // Check if both date and time are selected
    if (!dateInput || !timeInput) {
      alert("Please select both date and time.");
      return;
    }

    const selectedDate = new Date(`${dateInput}T${timeInput}`);
    const now = new Date();
    const timeDifference = selectedDate.getTime() - now.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);

    // Check if the selected time is in the future
    if (secondsDifference <= 0) {
      alert("Please select a future date and time.");
      return;
    }

    let remainingTime = secondsDifference;
    setCountdown(remainingTime);
    setTimerRunning(true);
    setStart("Stop");
    const timer = setInterval(() => {
      remainingTime--;
      setCountdown(remainingTime);
      if (remainingTime <= 0) {
        clearInterval(timer);
        setTimerRunning(false);
        setStart("Start");
        alert("Congratulations! The desired time has been completed.");
      }
    }, 1000);
    setTimerID(timer);
  };

  // Function to stop the timer
  const stopTimer = () => {
    clearInterval(timerID);
    setTimerRunning(false);
    setCountdown(0);
    setStart("Start");
  };

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(countdown / (60 * 60 * 24));
  const hours = Math.floor((countdown % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((countdown % (60 * 60)) / 60);
  const seconds = countdown % 60;

  // Function to handle saving event name
  const handleSave = () => {
    const inputName = document.getElementById("inputName");
    const eventNameSpan = document.getElementById("event-name");

    if (inputName && eventNameSpan) {
      setEventName(inputName.value);
    }
  };

  // Return the JSX for the component
  return (
    <>
      <div className="container">
        <main>
          <h1>Count Down Timer</h1>
          <div className="eventInput">
            <input
              type="text"
              aria-label="Event Name Input"
              placeholder="Type event name"
              id="inputName"
            ></input>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
          <div className="dateTime-container">
            <label htmlFor="date">Set Date:</label>
            <input type="date" aria-label="date" id="date"></input>
            <label htmlFor="time">Set Time:</label>
            <input type="time" aria-label="time" id="time"></input>
          </div>
          <button
            className="start-btn"
            onClick={timerRunning ? stopTimer : startTimer}
          >
            {start}
          </button>
          <div className="timer-container">
            <div className="eventName-container">
              <p>
                Remaining Time of: <span id="event-name">{eventName}</span>
              </p>
            </div>
            <div className="timer">
              <div className="days-container">
                <h2>{days}</h2>
                <h3>Days</h3>
              </div>
              <div className="hours-container">
                <h2>{hours}</h2>
                <h3>Hours</h3>
              </div>
              <div className="minutes-container">
                <h2>{minutes}</h2>
                <h3>Minutes</h3>
              </div>
              <div className="seconds-container">
                <h2>{seconds}</h2>
                <h3>Seconds</h3>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App; // Export the App component
