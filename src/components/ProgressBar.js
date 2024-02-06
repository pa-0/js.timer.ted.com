export default function ProgressBar({
  totalSeconds,
  remainingSeconds,
  timeDisplayColor
}) {
  return (
    <div
      id="progress-bar"
      style={{
        background: timeDisplayColor + "44"
      }}
    >
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
