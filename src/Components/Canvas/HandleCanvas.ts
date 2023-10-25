import { Rectangle } from "../../models/classRectangle";
import { findRectangleByCoordinates } from "../../helpers/findRectangleByCordinates";
import { resizeWindowBrowser } from "../../helpers/resizeWindowBrowser";
import { createTextArea } from "../../helpers/createTextArea";
import { sortRectangleList } from "../../helpers/sortRectangleList";
import { rectangleList } from "./../../store/index";
// let rectangleList: Rectangle[] = [];

export function handleCanvas(canvas: HTMLCanvasElement) {
  resizeWindowBrowser(canvas, rectangleList);
  window.addEventListener("resize", () =>
    resizeWindowBrowser(canvas, rectangleList)
  );

  let activeMove = false;
  let idElement: number;
  // let id = 0;
  function handleMouseDown(event: MouseEvent) {
    let rectangle = rectangleList.find((item) => item.id === idElement);
    rectangle!.wipeOf(canvas);
    rectangle!.updated(event.offsetX, event.offsetY);
    rectangleList
      .filter((item) => item.id !== rectangle!.id)
      .forEach((item) => item.draw(canvas, 1));
    rectangle?.draw(canvas, 0.5);
  }

  canvas.addEventListener("mousedown", (event) => {
    idElement = findRectangleByCoordinates(
      rectangleList,
      event.offsetX,
      event.offsetY
    ).id;
    // rectangleList = sortRectangleList(rectangleList, idElement);
    if (
      findRectangleByCoordinates(rectangleList, event.offsetX, event.offsetY)
        .flag
    ) {
      canvas.addEventListener("mousemove", handleMouseDown);
      activeMove = true;
      rectangleList.forEach((item) => item.draw(canvas, 1));
      // rectangleList.find((item) => item.id === idElement)?.draw(canvas, 1);
    } else {
      console.log("Вы находитесь не на элементе");
    }
  });
  canvas.addEventListener("mouseup", (event) => {
    event.preventDefault();
    // rectangleList.find((item) => item.id === idElement)?.draw(canvas, 1);
    // rectangleList.find((item) => item.id === idElement)?.draw(canvas, 1);
    // rectangleList = sortRectangleList(rectangleList, idElement);
    sortRectangleList(rectangleList, idElement);
    rectangleList.forEach((item) => item.draw(canvas, 1));
    rectangleList.find((item) => item.id === idElement)?.draw(canvas, 1);
    if (
      rectangleList.length < 6 &&
      !findRectangleByCoordinates(rectangleList, event.offsetX, event.offsetY)
        .flag &&
      !activeMove
    ) {
      // let color = colorList[Math.floor(Math.random() * colorList.length)];
      // updateColorList(color);
      let rectangle = new Rectangle(
        event.offsetX,
        event.offsetY,
        rectangleList.length + 1
        // color
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
    element!.activeInput = true;
    const textInput = createTextArea(element!.getInfoRectangle());
    element!.removeText(canvas, textInput.value);
    // idElement = element!.id;
    // rectangleList = sortRectangleList(rectangleList, element!.id);
    rectangleList.forEach((item) => item.draw(canvas, 1));
    element?.draw(canvas, 1);

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
      function listenerDBClick() {
        element!.insertText(textInput);
        element?.draw(canvas, 1);
        textInput.remove();

        document.removeEventListener("click", listenerDBClick);
      }
      document.addEventListener("click", listenerDBClick);

      // function listenerKeyDown (event:KeyboardEvent) {
      //   if (event.key === "Enter") {
      //     element!.insertText(textInput);
      //     element?.draw(canvas, 1);
      //     textInput.remove();
      //   }
      // }
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
