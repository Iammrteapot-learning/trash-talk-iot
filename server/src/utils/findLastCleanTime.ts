export function findLastCleanTime(data: { datetime: string; value: number }[]) {
  let lastCleanTime = "> 10";
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].value <= 15) {
      lastCleanTime = data[i].datetime;
      break;
    }
  }

  if (lastCleanTime !== "> 10") {
    const lastCleanDate = new Date(lastCleanTime);
    const now = new Date();
    const diffMs = now.getTime() - lastCleanDate.getTime();

    // const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    // const diffHours = Math.floor(
    //   (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    // );
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    // const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    //return `Difference: ${diffDays} days, ${diffHours} hours, ${diffMinutes} minutes, ${diffSeconds} seconds`;
    return diffMinutes;
  } else {
    return "> 10";
  }
}

export function convertLastUpdatedTime(datetime: string) {
  const date = new Date(datetime);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return diffMinutes;
}
