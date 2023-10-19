import { Rectangle } from "../../models/classRectangle";
import { findRectangleByCoordinates } from "../../helpers/findRectangle";
import { resizeWindowBrowser } from "../../helpers/resizeWindowBrowser";
import { createTextArea } from "../../helpers/createTextArea";
import { handlerLengthLine } from "../../helpers/handlerLengthLine";
const rectangleList: Rectangle[] = [];
let colorList = [
  [134, 166, 157],
  [242, 178, 99],
  [242, 198, 194],
  [242, 133, 133],
  [137, 217, 157],
  [22, 72, 115],
];
export function handleCanvas(canvas: HTMLCanvasElement) {
  resizeWindowBrowser(canvas, rectangleList);
  window.addEventListener("resize", () =>
    resizeWindowBrowser(canvas, rectangleList)
  );

  let activeMove = false;
  let idElement: number;
  let id = 0;
  function handleMouseDown(event: MouseEvent) {
    let rectangle = rectangleList.find((item) => item.id === idElement);
    rectangle!.wipeOf(canvas);
    rectangle!.updated(event.offsetX, event.offsetY);
    rectangleList.forEach((item) =>
      item.id === idElement ? item.draw(canvas, 0.5) : item.draw(canvas, 1)
    );
  }

  canvas.addEventListener("mousedown", (event) => {
    idElement = findRectangleByCoordinates(
      rectangleList,
      event.offsetX,
      event.offsetY
    ).id;
    if (
      findRectangleByCoordinates(rectangleList, event.offsetX, event.offsetY)
        .flag
    ) {
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
      !findRectangleByCoordinates(rectangleList, event.offsetX, event.offsetY)
        .flag &&
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
    const textInput = createTextArea();
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
        findRectangleByCoordinates(rectangleList, event.offsetX, event.offsetY)
          .id
    );
    if (element && rectangleList.length <= 6) {
      document.addEventListener("click", () => {
        element!.insertText(canvas, textInput);
        textInput.remove();
      });
      textInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          element!.insertText(canvas, textInput);
          textInput.remove();
        }
      });
      canvasContainer!.appendChild(textInput);
      element.insertText(canvas, textInput);
    }
  });

  return;
}
