import { Rectangle } from "../models/classRectangle";
export function findRectangleByCoordinates(
  rectangleList: Rectangle[],
  x: number,
  y: number
) {
  let rectangle = {
    id: 0,
    flag: false,
  };
  rectangleList.forEach((item) => {
    if (
      item._startX! < x &&
      item._endX! > x &&
      item._startY! < y &&
      item._endY! > y
    ) {
      rectangle.flag = true;
      rectangle.id = item.id!;
    }
  });
  return rectangle;
}
