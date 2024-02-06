import DownIcon from "../ui_icons/chevron-down.svg"
import UpIcon from "../ui_icons/chevron-up.svg"
import ColonIcon from "../ui_icons/colon.svg"

export default function TimeInput({
  minutesInput,
  secondsInput,
  setMinutesInput,
  setSecondsInput
}) {
  function handleMinutesInput(value) {
    setMinutesInput(cleanInput(Math.max(0, Math.min(90, value))))
  }

  function handleSecondsInput(value) {
    if (value >= 60) {
      // if seconds increments to 60, add a minute (up to max 90) and adjust the seconds
      setSecondsInput(cleanInput(value % 60))
      setMinutesInput(cleanInput(Math.min(90, parseInt(minutesInput) + 1)))
    } else if (value < 0) {
      // if seconds decrements below 0, remove a minute (minimum 0) and adjust the seconds to 59
      setSecondsInput("59")
      setMinutesInput(cleanInput(Math.max(0, parseInt(minutesInput) - 1)))
    } else if (minutesInput === "90") {
      // hard limit of 90 minutes, prevent adding additional seconds beyond 90 min
      return "00"
    } else {
      setSecondsInput(cleanInput(value))
    }
  }

  function cleanInput(value) {
    value = value.toString()
    if (isNaN(value) || !value.length) {
      // reset any bad or empty entries to be 00
      return "00"
    } else if (value.length < 2) {
      // add a leading 0 to single digit entries
      return "0" + value
    } else if (value.length > 2 && value[0] === "0") {
      // remove leading 0 from 3 digit entries
      return value.substring(1)
    } else return value
  }

  return (
    <div id="time-inputs-wrapper">
      <div className="time-input-group">
        <input
          type="number"
          value={minutesInput}
          onChange={event => handleMinutesInput(event.target.value)}
        />
        <div className="time-input-button-group">
          <button
            disabled={minutesInput === "90"}
            onClick={() => handleMinutesInput(parseInt(minutesInput) + 1)}
          >
            <img src={UpIcon} alt="Add minute" />
          </button>
          <button
            disabled={minutesInput === "00"}
            onClick={() => handleMinutesInput(parseInt(minutesInput) - 1)}
          >
            <img src={DownIcon} alt="Subtract minute" />
          </button>
        </div>
      </div>
      <img id="time-divider" src={ColonIcon} alt="Colon" />
      <div className="time-input-group">
        <input
          type="number"
          value={secondsInput}
          onChange={event => handleSecondsInput(event.target.value)}
        />
        <div className="time-input-button-group">
          <button
            disabled={minutesInput === "90"}
            onClick={() => handleSecondsInput(parseInt(secondsInput) + 1)}
          >
            <img src={UpIcon} alt="Add second" />
          </button>
          <button
            disabled={minutesInput === "00" && secondsInput === "00"}
            onClick={() => handleSecondsInput(parseInt(secondsInput) - 1)}
          >
            <img src={DownIcon} alt="Subtract second" />
          </button>
        </div>
      </div>
    </div>
  )
}
