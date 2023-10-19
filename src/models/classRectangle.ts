import { handlerLengthLine } from "../helpers/handlerLengthLine";

export class Rectangle {
  id: number;
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  width: number;
  height: number;
  color: number[];
  borderRadius: number;
  constentText: string;

  constructor(x: number, y: number, id: number, color: number[]) {
    this.id = id;
    this.startX = x - 80;
    this.endX = x + 80;
    this.startY = y - 90;
    this.endY = y + 90;
    this.width = 160;
    this.height = 180;
    this.color = color;
    this.borderRadius = 30;
    this.constentText = "";
  }
  draw = (canvas: HTMLCanvasElement, opacity: number) => {
    let ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.fillStyle = `rgb(${this.color},${opacity})`;
    ctx.moveTo(this.startX + this.borderRadius, this.startY);
    ctx.arcTo(
      this.startX + this.width,
      this.startY,
      this.startX + this.width,
      this.startY + this.height,
      this.borderRadius
    );
    ctx.arcTo(
      this.startX + this.width,
      this.startY + this.height,
      this.startX,
      this.startY + this.height,
      this.borderRadius
    );
    ctx.arcTo(
      this.startX,
      this.startY + this.height,
      this.startX,
      this.startY,
      this.borderRadius
    );
    ctx.arcTo(
      this.startX,
      this.startY,
      this.startX + this.width,
      this.startY,
      this.borderRadius
    );
    ctx.fill();
    ctx.closePath();
  };
  updated = (x: number, y: number) => {
    this.startX = x - 80;
    this.endX = x + 80;
    this.startY = y - 90;
    this.endY = y + 90;
    this.width = 160;
    this.height = 180;
    this.color = this.color;
  };

  wipeOf = (canvas: HTMLCanvasElement) => {
    let ctx = canvas.getContext("2d")!;
    ctx.clearRect(this.startX, this.startY, 160, 180);
  };
  insertText = (canvas: HTMLCanvasElement, textInput: HTMLTextAreaElement) => {
    if (textInput.value) {
      this.constentText = textInput.value;
    }
    textInput.style.left = `${this.startX + 10}px`;
    textInput.style.top = `${this.startY + 90}px`;
    textInput.style.backgroundColor = `${this.color}`;
    textInput.focus();
    let ctx = canvas.getContext("2d")!;
    ctx.font = `${textInput.style.fontSize} Helvetica`;
    ctx.fillStyle = "white";
    const textWidth = ctx.measureText(textInput.value!).width;
    // handlerLengthLine(ctx, textWidth, textInput!.value);
    if (handlerLengthLine(ctx, textWidth, textInput!.value)!.length > 0) {
      let heightLine = this.startY + 45;
      for (let item of handlerLengthLine(ctx, textWidth, textInput.value)!) {
        ctx.fillText(item, this.startX + 15, heightLine);
        heightLine += 18;
      }
    }
  };
}
