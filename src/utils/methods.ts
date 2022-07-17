export function TimeToMinute(second: number) {
  return `${formatTime(Math.floor(second / 60))}:${formatTime(Math.floor(second % 60))}`
}

function formatTime(time: number) {
  return time > 9 ? time : '0' + time
}
