export function handlerLengthLine(line: number, text: string) {
  const dividedStr: string[] = [];
  const partLength = Math.ceil(text.length / Math.round(line / 130));
  const rowOfLines = Math.round(line / 130);
  if (text) {
    if (rowOfLines <= 1) {
      dividedStr.push(text);
      return dividedStr;
    }
    for (let i = 0; i < rowOfLines; i++) {
      const start = i * partLength;
      const end = start + partLength;
      dividedStr.push(text.slice(start, end));
    }
    return dividedStr;
  }
  return dividedStr;
}
