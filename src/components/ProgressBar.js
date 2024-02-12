export default function ProgressBar({
  timerIsRunning,
  totalSeconds,
  remainingSeconds
}) {
  return (
    <div id="progress-bar">
      {remainingSeconds < 0 && (
        <div
          id="overtime-warning"
          style={!timerIsRunning ? { animation: "unset" } : null}
        >
          OVER TIME
        </div>
      )}
      <div
        id="progress-bar-elapsed"
        style={{
          width: `${((totalSeconds - remainingSeconds) * 100) / totalSeconds}%`
        }}
      />
    </div>
  )
}
