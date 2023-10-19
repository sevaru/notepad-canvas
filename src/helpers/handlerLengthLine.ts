export function handlerLengthLine(ctx: any, textWidth: number, text: string) {
  const maxWidth = 130;
  const dividedStr: string[] = [];
  const partLength = Math.ceil(text.length / Math.ceil(textWidth / maxWidth));
  const rowOfLines = Math.ceil(textWidth / maxWidth);
  let newStr = text;
  if (text) {
    if (rowOfLines <= 1) {
      dividedStr.push(text);
      return dividedStr;
    }
    let start = 0;
    let end = 0;
    for (let i = 0; i <= newStr.length; i++) {
      let b = ctx.measureText(newStr.slice(start, i)).width;
      if (b > maxWidth) {
        dividedStr.push(newStr.slice(start, i));
        start = i;
        end = i;
      }
    }
    let str = newStr.slice(end, newStr.length - 1);
    dividedStr.push(str);
    newStr = str;
    //  for (let i = 0; i < rowOfLines; i++) {
    //    const start = i * partLength;
    //    const end = start + partLength;
    //    dividedStr.push(text.slice(start, end));
    //  }
    console.log(dividedStr);
    return dividedStr;
  }

  return dividedStr;
}
