// import { Rectangle } from "./../../types/index";
const rectangleList: Rectangle[] = [];
let w: number;
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
    this.startY = y - 90;
    this.endY = y + 90;
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
  updated = (x: number, y: number) => {
    console.log(rectangleList);
    this.startX = x - 80;
    this.endX = x + 80;
    this.startY = y - 90;
    this.endY = y + 90;
    this.width = 160;
    this.height = 180;
  };
  retWidth = () => {
    let width = this.startX;
    let height = this.startY;
    return { width, height };
  };
  wipeOf = (canvas: HTMLCanvasElement) => {
    let ctx = canvas.getContext("2d")!;
    ctx.clearRect(this.startX, this.startY, 160, 180);
  };
}
export function handleCanvas(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let activeMove = false;
  let idElement: number;

  function handleMouseDown(event: MouseEvent) {
    let c = rectangleList.find((item) => item.id === idElement);
    c?.wipeOf(canvas);
    c!.updated(event.offsetX, event.offsetY);
    c!.draw(canvas);
    c!.startX = event.offsetX - 80;
    c!.endX = event.offsetX + 80;

    c!.startY = event.offsetY - 90;
    c!.endY = event.offsetY + 90;
    rectangleList.forEach((item) => item.draw(canvas));
  }

  canvas.addEventListener("mousedown", (event) => {
    idElement = findRectangle(rectangleList, event.offsetX, event.offsetY).id;
    if (findRectangle(rectangleList, event.offsetX, event.offsetY).flag) {
      canvas.addEventListener("mousemove", handleMouseDown);
      activeMove = true;
      w = event.offsetX;
    } else {
      console.log("Вы находитесь не на элементе");
    }
  });
  canvas.addEventListener("mouseup", (event) => {
    event.preventDefault();
    if (
      rectangleList.length < 5 &&
      !findRectangle(rectangleList, event.offsetX, event.offsetY).flag &&
      !activeMove
    ) {
      let rectangle = new Rectangle(event.offsetX, event.offsetY);
      rectangle.draw(canvas);
      rectangleList.push({ ...rectangle });
    }
    canvas.removeEventListener("mousemove", handleMouseDown);
    activeMove = false;
  });

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

// function handlerOnPressedButton(canvas: HTMLCanvasElement, findRectangle: any) {
//   let isMousePressed = false;
//   const handle = (event: MouseEvent) => {
//     if (isMousePressed) {
//       console.log("нажата");
//     }
//   };

//   canvas.addEventListener("mousedown", (event: any) => {
//     if (event.button === 0) {
//       isMousePressed = true;
//     }
//   });
//   canvas.addEventListener("mouseup", function (event: any) {
//     if (event.button === 0) {
//       isMousePressed = false;

//       canvas.removeEventListener("mousemove", handle);
//     }
//   });

//   canvas.addEventListener("mousemove", handle);
// }
