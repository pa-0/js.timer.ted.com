export default function TimeDisplay({
  remainingSeconds,
  timeDisplayColor,
  alwaysShowSeconds
}) {
  const hours =
    remainingSeconds > 0 ? Math.floor(remainingSeconds / 3600) : null
  if (hours) {
    remainingSeconds -= hours * 3600
  }
  let minutes =
    remainingSeconds < 0
      ? Math.ceil(remainingSeconds / 60)
          .toString()
          .replace("-", "")
      : Math.floor(remainingSeconds / 60)
          .toString()
          .replace("-", "")
  let seconds = (remainingSeconds % 60).toString().replace("-", "")
  if (minutes < 10 && hours) minutes = "0" + minutes
  if (seconds < 10) seconds = "0" + seconds
  const formatted =
    (remainingSeconds < 0 ? "-" : "") +
    (hours ? hours + ":" : "") +
    minutes +
    (alwaysShowSeconds || remainingSeconds < 60 ? ":" + seconds : "")

  const fontSize = hours ? "clamp(16px, 22vw, 40vh)" : "clamp(16px, 30vw, 40vh)"

  return (
    <h2 id="time-display" style={{ fontSize, color: timeDisplayColor }}>
      {formatted}
    </h2>
  )
}
