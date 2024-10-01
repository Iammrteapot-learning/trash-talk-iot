export function computeTenAverage(data: { datetime: string; value: number }[]) {
  const result = [];
  const sectionSize = Math.floor(data.length / 10);

  if (sectionSize === 0) {
    return [];
  }

  for (let i = 0; i < 10; i++) {
    let sum = 0;
    for (let j = 0; j < sectionSize; j++) {
      sum += data[i * sectionSize + j].value;
    }
    console.log(data.length);
    console.log(i * sectionSize);
    result.push({
      datetime: data[i * sectionSize].datetime,
      value: (sum / sectionSize).toFixed(2),
    });
  }

  return result;
}
