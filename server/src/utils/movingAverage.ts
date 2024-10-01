export function computeTenAverage(data: { datetime: string; value: number }[]) {
  const result = [];
  const sectionSize = Math.floor(data.length / 10);

  for (let i = 0; i < sectionSize; i++) {
    let sum = 0;
    for (let j = 0; j < sectionSize; j++) {
      sum += data[i + j].value;
    }
    result.push({
      datetime: data[i * sectionSize].datetime,
      value: sum / sectionSize,
    });
  }

  return result;
}
