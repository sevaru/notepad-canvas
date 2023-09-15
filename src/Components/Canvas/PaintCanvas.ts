import { Rectangle } from "./../../types/index";

const rectangleList: Rectangle[] = [];
let rectangle: Rectangle = {
  id: null,
  startX: null,
  endX: null,
  startY: null,
  endY: null,
  width: 160,
  height: 180,
};
export function handleCanvas(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvas.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      rectangleList.length < 4 &&
      !findRectangle(rectangleList, event.offsetX, event.offsetY).flag
    ) {
      rectangle.startX = event.offsetX - 80;
      rectangle.endX = event.offsetX + 80;
      rectangle.startY = event.offsetY;
      rectangle.endY = event.offsetY + 180;
      drawRectangle(canvas, event);
      rectangleList.push({ ...rectangle, id: Math.floor(Math.random() * 10) });
      console.log(rectangleList);
    }
    console.log(findRectangle(rectangleList, event.offsetX, event.offsetY));
  });
  handlerOnPressedButton(canvas);
  return;
}

// Рисует прямоугольники
function drawRectangle(canvas: HTMLCanvasElement, event: MouseEvent) {
  let ctx = canvas.getContext("2d")!;
  ctx.beginPath();
  ctx.fillRect(
    event.offsetX - 80,
    event.offsetY,
    rectangle.width,
    rectangle.height
  );
  ctx.stroke();
  ctx.closePath();
}
// ищет прямоугольники на холсте
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
function handlerOnPressedButton(canvas: any) {
  let isMousePressed = false;
  canvas.addEventListener("mousedown", (event: any) => {
    if (event.button === 0) {
      isMousePressed = true; // Кнопка мыши нажата
    }
  });
  canvas.addEventListener("mouseup", function (event: any) {
    if (event.button === 0) {
      isMousePressed = false; // Кнопка мыши отпущена
    }
  });
  canvas.addEventListener("mousemove", function (event: any) {
    if (isMousePressed) {
      console.log("Нажата");
    }
  });
}
// console.log(
//   rectangle.startX! < event.offsetX &&
//     rectangle.endX! > event.offsetX &&
//     rectangle.startY! < event.offsetY &&
//     rectangle.endY! > event.offsetY
// );
// console.log(findRectangle(rectangleList, event.offsetX, event.offsetY));
