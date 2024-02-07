export default function ProgressBar({
  timerIsRunning,
  totalSeconds,
  remainingSeconds,
  timeDisplayColor
}) {
  const overtime = remainingSeconds < 0
  return (
    <div
      id="progress-bar"
      style={
        overtime
          ? { height: "8vh" }
          : {
              background: `color-mix(in srgb, ${timeDisplayColor} 30%, transparent)`
            }
      }
    >
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
          width: `${((totalSeconds - remainingSeconds) * 100) / totalSeconds}%`,
          background: timeDisplayColor
        }}
      />
    </div>
  )
}
