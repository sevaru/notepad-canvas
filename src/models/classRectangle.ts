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
    // ctx.fillRect(this.startX, this.startY, this.width, this.height);
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
  insertText = (
    canvas: HTMLCanvasElement,
    textInput: HTMLTextAreaElement,
    text?: string
  ) => {
    if (text) {
      this.constentText = text;
    }
    textInput.style.left = `${this.startX + 10}px`;
    textInput.style.top = `${this.startY + 90}px`;
    textInput.style.backgroundColor = `${this.color}`;
    textInput.focus();
    // let ctx = canvas.getContext("2d")!;
    // ctx.font = "18px Helvetica";
    // ctx.fillStyle = "white";

    // ctx.fillText("hello<br>hi", this.startX + 10, this.startY + 45);
  };
}
