export default function BackButton({ timerIsRunning, resetTimer }) {
  return timerIsRunning ? null : (
    <button id="back-button" onClick={resetTimer}>
      <img src="/back.svg" alt="Go back" />
    </button>
  )
}
