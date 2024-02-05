import { colors } from "../helpers/colors"

export default function PlayPauseButton({ timerIsRunning, onClick }) {
  return (
    <button
      id="play-pause-button"
      onClick={onClick}
      style={{ background: timerIsRunning ? colors.darkgrey : colors.green }}
    >
      <img
        src={timerIsRunning ? "/pause.svg" : "play.svg"}
        alt={timerIsRunning ? "Pause" : "Resume"}
        style={timerIsRunning ? null : { marginLeft: 12 }}
      />
    </button>
  )
}
