// Define variables to keep track of time and timer state
let totalMilliseconds = 0;
let intervalId = null;

// Cache DOM elements for later use
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapList = document.getElementById('lapTimes');

// Update the timer display
function updateDisplay() {
  let milliseconds = Math.floor((totalMilliseconds % 1000) / 10);
  let seconds = Math.floor((totalMilliseconds / 1000) % 60);
  let minutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
  let hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));

  display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

// Start or stop the stopwatch
function startStop() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    startStopButton.textContent = 'Start';
  } else {
    intervalId = setInterval(() => {
      totalMilliseconds += 10; // Increment by 10 ms
      updateDisplay();
    }, 10); // Update every 10 milliseconds
    startStopButton.textContent = 'Stop';
  }
}

// Add a lap time
function lapTime() {
  const li = document.createElement('li');
  li.textContent = display.textContent;
  lapList.appendChild(li);
}

// Reset the stopwatch
function reset() {
  clearInterval(intervalId);
  intervalId = null;
  totalMilliseconds = 0;
  updateDisplay();
  startStopButton.textContent = 'Start';
  lapList.innerHTML = ''; // Clear lap times
}

// Pad single digit numbers with a leading zero, flexible for milliseconds
function pad(number, places = 2) {
  return String(number).padStart(places, '0');
}

// Event listeners for the buttons
startStopButton.addEventListener('click', startStop);
lapButton.addEventListener('click', lapTime);
resetButton.addEventListener('click', reset);

// Initialize display
updateDisplay();
