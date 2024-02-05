import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import TimeInput from "./components/TimeInput"
import TimeDisplay from "./components/TimeDisplay"
import Header from "./components/Header"
import ProgressBar from "./components/ProgressBar"
import PlayPauseButton from "./components/PlayPauseButton"
import BackButton from "./components/BackButton"
import { colors } from "./helpers/colors"
import "./index.css"

const Timer = () => {
  // interval (window object): stores the instance of window.setInterval used
  // to decrement remaining time every second
  const [interval, setInterval] = useState()
  // totalSeconds (integer): the original value of the timer
  const [totalSeconds, setTotalSeconds] = useState()
  // remainingSeconds (integer): the amount of time left of the original timer
  const [remainingSeconds, setRemainingSeconds] = useState()
  // minutesInput (string): the user input value for number of minutes
  const [minutesInput, setMinutesInput] = useState("18")
  // secondsInput (string): the user input value for number of seconds
  const [secondsInput, setSecondsInput] = useState("00")
  // NOTE: input values are string not ints. This helps with formatting,
  // especially with leading 0s.

  function initializeWindowInterval() {
    // create an interval that decrements remainingSeconds every 1000ms
    const curr_interval = window.setInterval(() => {
      setRemainingSeconds(current => current - 1)
    }, 1000)
    setInterval(curr_interval)
  }

  function clearWindowInterval() {
    // if an existing interval exists, clear it to pause the timer
    if (interval) {
      window.clearInterval(interval)
      setInterval()
    }
  }

  function startTimer() {
    // convert the input values into a total number of seconds, and set
    // total and remaining seconds accordingly
    const timerValue = parseInt(minutesInput) * 60 + parseInt(secondsInput)
    setTotalSeconds(timerValue)
    setRemainingSeconds(timerValue)
    // Then, start the timer running by initializing the interval
    initializeWindowInterval()
  }

  function togglePlayPause() {
    // if the timer was already running, we pause it by clearing
    // the current interval. If not, then we initialize a new interval
    interval ? clearWindowInterval() : initializeWindowInterval()
  }

  function resetTimer() {
    // clear remaining and total seconds
    setRemainingSeconds()
    setTotalSeconds()
    // Reset the time input to 18:00 default
    setMinutesInput("18")
    setSecondsInput("00")
  }

  // timeDisplayColor is a value used by child components to
  // alert the speaker as time runs out. At one minute left,
  // the display turn from green to yellow. When time is up,
  // the display turns red indefinitely.
  const timeDisplayColor =
    remainingSeconds < 0
      ? colors.red
      : remainingSeconds < 60
      ? colors.yellow
      : colors.green

  // timerIsRunning is a helpful boolean to represent whether the clock
  // is currently running (preventing the need to pass the whole
  // interval object around the app)
  const timerIsRunning = !!interval

  // timerIsSet is a helpful boolean to represent whether the clock
  // is indeed set with a time to count down from, though this could mean
  // that the timer is running or paused.
  const timerIsSet = !!totalSeconds

  // show this view when the timer is set, meaning it's either running or paused
  const TimeDisplayView = () => (
    <>
      <TimeDisplay
        remainingSeconds={remainingSeconds}
        timeDisplayColor={timeDisplayColor}
      />
      <ProgressBar
        remainingSeconds={remainingSeconds}
        totalSeconds={totalSeconds}
        timeDisplayColor={timeDisplayColor}
      />
      <div id="buttons-container">
        <BackButton timerIsRunning={timerIsRunning} resetTimer={resetTimer} />
        <PlayPauseButton
          timerIsRunning={timerIsRunning}
          onClick={totalSeconds ? togglePlayPause : startTimer}
        />
      </div>
    </>
  )

  // show this view when the user is setting the timer
  const TimeInputView = () => (
    <>
      <TimeInput
        minutesInput={minutesInput}
        secondsInput={secondsInput}
        setMinutesInput={setMinutesInput}
        setSecondsInput={setSecondsInput}
      />
      <PlayPauseButton
        interval={interval}
        onClick={totalSeconds ? togglePlayPause : startTimer}
      />
    </>
  )

  return (
    <div id="timer">
      <Header />
      {timerIsSet ? <TimeDisplayView /> : <TimeInputView />}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Timer />
  </React.StrictMode>
)

// Register the service worker
if ("serviceWorker" in navigator) {
  // Wait for the 'load' event to not block other work
  window.addEventListener("load", async () => {
    // Try to register the service worker.
    try {
      // Capture the registration for later use, if needed
      let reg

      // Use ES Module version of our Service Worker in development
      if (import.meta.env?.DEV) {
        reg = await navigator.serviceWorker.register("/service-worker.js", {
          type: "module"
        })
      } else {
        // In production, use the normal service worker registration
        reg = await navigator.serviceWorker.register("/service-worker.js")
      }

      console.log("Service worker registered! 😎", reg)
    } catch (err) {
      console.log("😥 Service worker registration failed: ", err)
    }
  })
}
