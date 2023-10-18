// import { Rectangle } from "./../../types/index";
const rectangleList: Rectangle[] = [];
let colorList = [
  [134, 166, 157],
  [242, 178, 99],
  [242, 198, 194],
  [242, 133, 133],
  [137, 217, 157],
  [22, 72, 115],
];
// 0.8
class Rectangle {
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
export function handleCanvas(canvas: HTMLCanvasElement) {
  function resizeWindowBrowser() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    rectangleList.forEach((item) => item.draw(canvas, 1));
  }
  resizeWindowBrowser();
  window.addEventListener("resize", resizeWindowBrowser);

  let activeMove = false;
  let idElement: number;
  let id = 0;
  function handleMouseDown(event: MouseEvent) {
    let c = rectangleList.find((item) => item.id === idElement);
    c?.wipeOf(canvas);
    c!.updated(event.offsetX, event.offsetY);
    rectangleList.forEach((item) =>
      item.id === idElement ? item.draw(canvas, 0.5) : item.draw(canvas, 1)
    );
  }

  canvas.addEventListener("mousedown", (event) => {
    idElement = findRectangle(rectangleList, event.offsetX, event.offsetY).id;
    if (findRectangle(rectangleList, event.offsetX, event.offsetY).flag) {
      canvas.addEventListener("mousemove", handleMouseDown);
      activeMove = true;
    } else {
      console.log("Вы находитесь не на элементе");
    }
  });
  canvas.addEventListener("mouseup", (event) => {
    event.preventDefault();
    // rectangleList
    //   .find(
    //     (item) =>
    //       item.id ===
    //       findRectangle(rectangleList, event.offsetX, event.offsetY).id
    //   )
    //   ?.draw(canvas, 1);
    rectangleList.forEach((item) => item.draw(canvas, 1));
    if (
      rectangleList.length < 6 &&
      !findRectangle(rectangleList, event.offsetX, event.offsetY).flag &&
      !activeMove
    ) {
      let color = colorList[Math.floor(Math.random() * colorList.length)];
      colorList = colorList.filter((item) => item !== color);
      let rectangle = new Rectangle(
        event.offsetX,
        event.offsetY,
        (id += 1),
        color
      );
      rectangle.draw(canvas, 1);
      rectangleList.push(rectangle);
    }
    canvas.removeEventListener("mousemove", handleMouseDown);
    activeMove = false;
  });
  canvas.addEventListener("dblclick", (event) => {
    const canvasContainer = document.querySelector(".canvas-сontainer");
    const textInput = document.createElement("textarea");
    textInput.id = "text-input";
    textInput.style.position = "absolute";
    textInput.style.maxWidth = `${130}px`;
    textInput.style.minWidth = `${130}px`;
    textInput.style.maxHeight = "130px";
    textInput.style.height = "130px";
    textInput.style.outline = "none";
    textInput.style.resize = "none";
    textInput.style.color = "white";
    textInput.style.textAlign = "center";
    textInput.style.fontFamily = "Helvetica";
    textInput.style.overflow = "hidden";
    textInput.cols = 13;
    textInput.addEventListener("input", () => {
      let charCount = textInput.value.length;
      textInput.style.fontSize =
        Math.max(18, 18 + charCount <= 18 ? charCount : 18) + "px";
      while (textInput.scrollHeight > textInput.clientHeight) {
        let currentFontSize = parseFloat(
          window.getComputedStyle(textInput, null).getPropertyValue("font-size")
        );
        textInput.style.fontSize = currentFontSize - 1 + "px";
      }
    });

    let element = rectangleList.find(
      (item) =>
        item.id ===
        findRectangle(rectangleList, event.offsetX, event.offsetY).id
    );
    if (element && rectangleList.length <= 6) {
      canvas.addEventListener("click", () => {
        element!.insertText(canvas, textInput, textInput.value);
        textInput.remove();
      });
      textInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          element!.insertText(canvas, textInput, textInput.value);
          textInput.remove();
        }
      });
      canvasContainer!.appendChild(textInput);
      element.insertText(canvas, textInput);
    }
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
