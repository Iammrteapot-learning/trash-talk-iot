export function movingAverage(data: { datetime: string; value: string }[]) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    for (let j = i - 5; j <= i + 5; j++) {
      if (j >= 0 && j < data.length) {
        sum += parseFloat(data[j].value);
      }
    }
    result.push({ datetime: data[i].datetime, value: sum / 11 });
  }
  return result;
}
