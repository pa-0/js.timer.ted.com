import { colors } from "../helpers/colors"
import PauseIcon from "../ui_icons/pause.svg"
import PlayIcon from "../ui_icons/play.svg"

export default function PlayPauseButton({ disabled, timerIsRunning, onClick }) {
  return (
    <button
      id="play-pause-button"
      onClick={onClick}
      disabled={disabled}
      style={{ background: timerIsRunning ? colors.darkgrey : colors.green }}
    >
      <img
        src={timerIsRunning ? PauseIcon : PlayIcon}
        alt={timerIsRunning ? "Pause" : "Resume"}
        style={timerIsRunning ? null : { marginLeft: "8%" }}
      />
    </button>
  )
}
