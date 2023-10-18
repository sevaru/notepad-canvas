import { Rectangle } from "../../models/classRectangle";
import { findRectangle } from "../../helpers/findRectangle";
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
