import { Rectangle } from "../models/classRectangle";

export function createListForSave(rectangleList: Rectangle[]) {
  const newList = rectangleList.map((item) => {
    let result = {
      id: item.id,
      x: item.intialValueX,
      y: item.initialValueY,
      color: item._color,
      text: item.contextText,
      textSize: item.contextTextFontSize,
    };
    return result;
  });
  return newList;
}
