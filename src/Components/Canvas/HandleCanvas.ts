// import { Rectangle } from "./../../types/index";
const rectangleList: Rectangle[] = [];
class Rectangle {
  id: number;
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  width: number;
  height: number;
  constructor(x: number, y: number) {
    this.id = Math.floor(Math.random() * 10);
    this.startX = x - 80;
    this.endX = x + 80;
    this.startY = y;
    this.endY = y + 180;
    this.width = 160;
    this.height = 180;
  }
  draw = (canvas: HTMLCanvasElement) => {
    let ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.fillRect(this.startX, this.startY, this.width, this.height);
    ctx.stroke();
    ctx.closePath();
  };
}
export function handleCanvas(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      rectangleList.length < 1 &&
      !findRectangle(rectangleList, event.offsetX, event.offsetY).flag
    ) {
      let rectangle = new Rectangle(event.offsetX, event.offsetY);
      rectangle.draw(canvas);
      rectangleList.push({ ...rectangle });
    }
  });
  handlerOnPressedButton(canvas, findRectangle);
  return;
}
function findRectangle(rectangleList: Rectangle[], x: number, y: number) {
  let rectangle = {
    id: 0,
    flag: false,
  };
  rectangleList.forEach((item) => {
    if (
      item.startX! < x &&
      item.endX! > x &&
      item.startY! < y &&
      item.endY! > y
    ) {
      rectangle.flag = true;
      rectangle.id = item.id!;
    }
  });
  return rectangle;
}
// Обработчик на нажатую кнопку кнопку
function handlerOnPressedButton(canvas: HTMLCanvasElement, findRectangle: any) {
  let isMousePressed = false;
  const handle = (event: MouseEvent) => {
    if (isMousePressed) {
      console.log("нажата");
    }
  };

  canvas.addEventListener("mousedown", (event: any) => {
    if (event.button === 0) {
      isMousePressed = true; // Кнопка мыши нажата
    }
  });
  canvas.addEventListener("mouseup", function (event: any) {
    if (event.button === 0) {
      isMousePressed = false; // Кнопка мыши отпущена

      canvas.removeEventListener("mousemove", handle);
    }
  });

  canvas.addEventListener("mousemove", handle);
}
