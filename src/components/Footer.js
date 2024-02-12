import BackButton from "./BackButton"
import PlayPauseButton from "./PlayPauseButton"

export default function Footer({
  timerIsRunning,
  resetTimer,
  timerIsSet,
  togglePlayPause,
  startTimer
}) {
  return (
    <footer>
      {timerIsSet && !timerIsRunning ? (
        <BackButton resetTimer={resetTimer} />
      ) : null}
      <PlayPauseButton
        timerIsRunning={timerIsRunning}
        onClick={timerIsSet ? togglePlayPause : startTimer}
      />
    </footer>
  )
}
