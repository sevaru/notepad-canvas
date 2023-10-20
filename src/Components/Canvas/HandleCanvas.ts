import { Rectangle } from "../../models/classRectangle";
import { findRectangleByCoordinates } from "../../helpers/findRectangleByCordinates";
import { resizeWindowBrowser } from "../../helpers/resizeWindowBrowser";
import { createTextArea } from "../../helpers/createTextArea";
import { sortRectangleList } from "../../helpers/sortRectangleList";
let rectangleList: Rectangle[] = [];
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
    rectangleList
      .filter((item) => item.id !== idElement)
      .forEach((item) => item.draw(canvas, 1));
    rectangle?.draw(canvas, 0.5);
  }

  canvas.addEventListener("mousedown", (event) => {
    idElement = findRectangleByCoordinates(
      rectangleList,
      event.offsetX,
      event.offsetY
    ).id;
    // rectangleList.forEach((item) => item.draw(canvas, 1));

    // rectangleList.find((item) => item.id === idElement)?.draw(canvas, 1);
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
    // rectangleList.find((item) => item.id === idElement)?.draw(canvas, 1);
    // rectangleList.find((item) => item.id === idElement)?.draw(canvas, 1);
    // rectangleList = sortRectangleList(rectangleList, idElement);
    // rectangleList.forEach((item) => item.draw(canvas, 1));
    rectangleList.find((item) => item.id === idElement)?.draw(canvas, 1);
    rectangleList = sortRectangleList(rectangleList, idElement);
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
      rectangleList.push(rectangle);
      rectangle.draw(canvas, 1);
    }

    canvas.removeEventListener("mousemove", handleMouseDown);
    activeMove = false;
  });
  // DBCLICK///////////////////////////////////////////////////////
  canvas.addEventListener("dblclick", (event) => {
    const canvasContainer = document.querySelector(".canvas-сontainer");
    let element = rectangleList.find(
      (item) =>
        item.id ===
        findRectangleByCoordinates(rectangleList, event.offsetX, event.offsetY)
          .id
    );
    const textInput = createTextArea(element!.getInfoRectangle());
    element!.removeText(canvas, textInput.value);
    rectangleList.forEach((item) => item.draw(canvas, 1));
    element?.draw(canvas, 1);
    sortRectangleList(rectangleList, element!.id);
    if (element && rectangleList.length <= 6) {
      textInput.addEventListener("input", () => {
        let charCount = textInput.value.length;
        textInput.style.fontSize =
          Math.max(18, 18 + charCount <= 18 ? charCount : 18) + "px";
        while (textInput.scrollHeight > textInput.clientHeight) {
          let currentFontSize = parseFloat(
            window
              .getComputedStyle(textInput, null)
              .getPropertyValue("font-size")
          );
          textInput.style.fontSize = currentFontSize - 1 + "px";
        }
      });
      document.addEventListener("click", () => {
        element!.insertText(textInput);
        element?.draw(canvas, 1);
        textInput.remove();
      });
      textInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          element!.insertText(textInput);
          element?.draw(canvas, 1);
          textInput.remove();
        }
      });
      canvasContainer!.appendChild(textInput);
      element.insertText(textInput);
    }
  });

  return;
}
