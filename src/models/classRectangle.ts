import { handlerLengthLine } from "../helpers/handlerLengthLine";
export let colorList = [
  [134, 166, 157],
  [242, 178, 99],
  [242, 198, 194],
  [242, 133, 133],
  [137, 217, 157],
  [22, 72, 115],
];
export function setColorList() {
  colorList = [
    [134, 166, 157],
    [242, 178, 99],
    [242, 198, 194],
    [242, 133, 133],
    [137, 217, 157],
    [22, 72, 115],
  ];
}
function getColor(color: number[] | null = null): number[] {
  if (!color) {
    let colorRandom = colorList[Math.floor(Math.random() * colorList.length)];
    colorList = colorList.filter(
      (item) => String(item) !== String(colorRandom)
    );
    return colorRandom;
  }
  colorList = colorList.filter((item) => String(item) !== String(color));
  return color!;
}

export class Rectangle {
  id: number;
  _startX: number;
  _endX: number;
  _startY: number;
  _endY: number;
  _width: number;
  _height: number;
  _color: number[];
  borderRadius: number;
  contextText: string;
  contextTextFontSize: string;
  activeInput: boolean;

  constructor(
    x: number,
    y: number,
    id: number,
    text?: string,
    textSize?: string,
    color?: number[],
    startX?: number,
    endX?: number,
    startY?: number,
    endY?: number
  ) {
    this.id = id;
    this._startX = startX ?? x - 80;
    this._endX = endX ?? x + 80;
    this._startY = startY ?? y - 90;
    this._endY = endY ?? y + 90;
    this._width = 160;
    this._height = 180;
    this._color = getColor(color);
    this.borderRadius = 30;
    this.contextText = text ?? "";
    this.contextTextFontSize = textSize ?? "";
    this.activeInput = false;
  }
  getInfoRectangle = () => {
    const info = {
      startX: this._startX,
      endX: this._endX,
      startY: this._startY,
      endY: this._endY,
      width: this._width,
      height: this._height,
      color: this._color,
      contextText: this.contextText,
    };
    return info;
  };
  draw = (canvas: HTMLCanvasElement, opacity: number) => {
    let ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.fillStyle = `rgb(${this._color},${opacity})`;
    ctx.moveTo(this._startX + this.borderRadius, this._startY);
    ctx.arcTo(
      this._startX + this._width,
      this._startY,
      this._startX + this._width,
      this._startY + this._height,
      this.borderRadius
    );
    ctx.arcTo(
      this._startX + this._width,
      this._startY + this._height,
      this._startX,
      this._startY + this._height,
      this.borderRadius
    );
    ctx.arcTo(
      this._startX,
      this._startY + this._height,
      this._startX,
      this._startY,
      this.borderRadius
    );
    ctx.arcTo(
      this._startX,
      this._startY,
      this._startX + this._width,
      this._startY,
      this.borderRadius
    );
    ctx.fill();
    if (this.contextText) {
      ctx.font = `${this.contextTextFontSize} Helvetica`;
      ctx.fillStyle = "white";
      if (handlerLengthLine(ctx, this.contextText)!.length > 0) {
        let heightLine = this._startY + 45;
        for (let item of handlerLengthLine(ctx, this.contextText)!) {
          ctx.fillText(item, this._startX + 15, heightLine);
          heightLine += 18;
        }
      }
    }
    ctx.closePath();
  };
  drawText = (canvas: HTMLCanvasElement) => {
    let ctx = canvas.getContext("2d")!;
    if (this.contextText) {
      ctx.font = `${this.contextTextFontSize} Helvetica`;
      ctx.fillStyle = "white";
      if (handlerLengthLine(ctx, this.contextText)!.length > 0) {
        let heightLine = this._startY + 45;
        console.log(handlerLengthLine(ctx, this.contextText));
        for (let item of handlerLengthLine(ctx, this.contextText)!) {
          ctx.fillText(item, this._startX + 15, heightLine);
          heightLine += 18;
        }
      }
    }
  };
  updated = (x: number, y: number) => {
    this._startX = x - 80;
    this._endX = x + 80;
    this._startY = y - 90;
    this._endY = y + 90;
    this._width = 160;
    this._height = 180;
    this._color = this._color;
  };

  wipeOf = (canvas: HTMLCanvasElement) => {
    let ctx = canvas.getContext("2d")!;
    ctx.clearRect(this._startX, this._startY, 160, 180);
  };

  insertText = (textInput: HTMLTextAreaElement) => {
    this.contextText = textInput.value;
    this.contextTextFontSize = textInput.style.fontSize;
    textInput.focus();
  };
  removeText = (canvas: HTMLCanvasElement, textInput: string) => {
    textInput = this.contextText;
    this.contextText = "";
    this.wipeOf(canvas);
    this.draw(canvas, 1);
  };
}
