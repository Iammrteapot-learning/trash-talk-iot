export function findLastCleanTime(data: { datetime: string; value: number }[]) {
  let lastCleanTime;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].value <= 10) {
      lastCleanTime = data[i].datetime;
      break;
    }
  }
  return lastCleanTime;
}
