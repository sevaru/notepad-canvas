import { Rectangle } from "../models/classRectangle";

export function createListForSave(rectangleList: Rectangle[]) {
  const newList = rectangleList.map((item) => {
    let result = {
      id: item.id,
      startX: item._startX,
      endX: item._endX,
      startY: item._startY,
      endY: item._endY,
      color: item._color,
      text: item.contextText,
      textSize: item.contextTextFontSize,
    };
    return result;
  });
  return newList;
}
