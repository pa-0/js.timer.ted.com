import BackIcon from "../ui_icons/back.svg"

export default function BackButton({ resetTimer }) {
  return (
    <button id="back-button" onClick={resetTimer}>
      <img src={BackIcon} alt="Go back" />
    </button>
  )
}
