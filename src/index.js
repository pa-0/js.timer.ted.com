import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import TimeInput from "./components/TimeInput"
import TimeDisplay from "./components/TimeDisplay"
import Header from "./components/Header"
import ProgressBar from "./components/ProgressBar"
import Footer from "./components/Footer"
import { DEBOUNCE_TIMER_DURATION, DEFAULT_SETTINGS } from "./helpers/constants"
import "./index.css"
import { initMixpanel } from "./helpers/mixpanel"

initMixpanel()

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
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  // hideControls (boolean): when true, the header and footer should animate off
  // the screen to make additional room for the countdown timer. Set by a debounce
  // timer when the TimeDisplayView is on.
  const [hideControls, setHideControls] = useState(false)
  // modal (boolean): controls whether any modal is displayed over the main view.
  const [modal, setModal] = useState(false)

  useEffect(() => {
    /*
      This useEffect handles the logic to dynamically hide
      the header and footer during countdown if the mouse
      hasn't moved for a bit. It is NOT related to the
      main timer.
    */

    function setDebounceTimer() {
      // initialize a timeout to hide controls
      // if time runs out without a mouse movement
      window.debounce_timer = window.setTimeout(
        () => setHideControls(true),
        DEBOUNCE_TIMER_DURATION
      )
    }

    function clearDebounceTimer() {
      // clear any existing timeout that may have been running
      if (window.debounce_timer) {
        window.clearTimeout(window.debounce_timer)
      }
    }

    function handleMouseMove() {
      // on mouse move, show the controls,
      setHideControls(false)
      // clear any existing timeout,
      clearDebounceTimer()
      // and set a new one
      setDebounceTimer()
    }

    if (interval) {
      // if the main timer is running, set the timeout to hide controls
      setDebounceTimer()
      // create a mousemove event listener to reset the timeout
      window.addEventListener("mousemove", handleMouseMove)
    } else {
      // if the main timer is NOt running, clear any existing timeouts
      clearDebounceTimer()
    }

    // the cleanup function will handle closing the mousemove event listener
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [interval])

  /*
  START: MAIN TIMER FUNCTIONS
  The following functions are used to control the main timer.
  */

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

  /*
  END: MAIN TIMER FUNCTIONS
  */

  // timerIsRunning is a helpful boolean to represent whether the clock
  // is currently running (preventing the need to pass the whole
  // interval object around the app)
  const timerIsRunning = !!interval

  // timerIsSet is a helpful boolean to represent whether the clock
  // is indeed set with a time to count down from, though this could mean
  // that the timer is running or paused.
  const timerIsSet = !!totalSeconds

  // timerClassName defines the CSS class applied to the timer app,
  // controlling the color of the countdown clock and progress bar,
  // as well as the accessible colors setting and hide-controls debounce
  const timerClassName =
    (remainingSeconds < 0
      ? "over-time"
      : remainingSeconds < 60
      ? "final-minute"
      : "default") +
    (settings.useAccessibleColors ? " accessible-colors" : "") +
    (hideControls && !modal ? " hide-controls" : "")

  /*
  START: VIEW COMPONENTS
  These are the meta components that assemble full views
  */

  // show this view when the timer is set, meaning it's either running or paused
  const TimeDisplayView = () => (
    <>
      <Header
        settings={settings}
        setSettings={setSettings}
        modal={modal}
        setModal={setModal}
      />
      <TimeDisplay
        remainingSeconds={remainingSeconds}
        alwaysShowSeconds={settings.alwaysShowSeconds}
      />
      <ProgressBar
        remainingSeconds={remainingSeconds}
        totalSeconds={totalSeconds}
        timerIsRunning={timerIsRunning}
      />
      <Footer
        timerIsRunning={timerIsRunning}
        resetTimer={resetTimer}
        timerIsSet={timerIsSet}
        togglePlayPause={togglePlayPause}
        startTimer={startTimer}
      />
    </>
  )

  // show this view when the user is setting the timer
  const TimeInputView = () => (
    <>
      <Header
        settings={settings}
        setSettings={setSettings}
        modal={modal}
        setModal={setModal}
      />
      <TimeInput
        minutesInput={minutesInput}
        secondsInput={secondsInput}
        setMinutesInput={setMinutesInput}
        setSecondsInput={setSecondsInput}
      />
      <Footer
        timerIsRunning={timerIsRunning}
        resetTimer={resetTimer}
        timerIsSet={timerIsSet}
        togglePlayPause={togglePlayPause}
        startTimer={startTimer}
      />
    </>
  )
  /*
  END: VIEW COMPONENTS
  */

  return (
    <div id="timer" className={timerClassName}>
      {timerIsSet ? TimeDisplayView() : TimeInputView()}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Timer />
  </React.StrictMode>
)

// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
