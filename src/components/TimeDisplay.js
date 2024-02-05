export default function TimeDisplay({ remainingSeconds, timeDisplayColor }) {
  const minutes =
    remainingSeconds < 0
      ? Math.ceil(remainingSeconds / 60)
          .toString()
          .replace("-", "")
      : Math.floor(remainingSeconds / 60)
          .toString()
          .replace("-", "")
  let seconds = (remainingSeconds % 60).toString().replace("-", "")
  if (seconds < 10) seconds = "0" + seconds
  const formatted = (remainingSeconds < 0 ? "-" : "") + minutes + ":" + seconds

  return (
    <h2 id="time-display" style={{ color: timeDisplayColor }}>
      {formatted}
    </h2>
  )
}
