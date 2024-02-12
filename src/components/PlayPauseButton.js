import PauseIcon from "../ui_icons/pause.svg"
import PlayIcon from "../ui_icons/play.svg"

export default function PlayPauseButton({ disabled, timerIsRunning, onClick }) {
  return (
    <button
      id="play-pause-button"
      onClick={onClick}
      disabled={disabled}
      className={timerIsRunning ? "pause" : "play"}
      data-mixpanel-component="play-pause-button"
      data-mixpanel-component-id={timerIsRunning ? "pause" : "play"}
    >
      <img
        src={timerIsRunning ? PauseIcon : PlayIcon}
        alt={timerIsRunning ? "pause" : "play"}
        style={timerIsRunning ? null : { marginLeft: "8%" }}
      />
    </button>
  )
}
