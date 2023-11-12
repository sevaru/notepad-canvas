import { Rectangle } from "../models/classRectangle";

export function findRectangleByCoordinates(
  rectangleList: Rectangle[],
  x: number,
  y: number
): number | undefined {
  return rectangleList.find((item) => (
    item.startX! < x &&
    item.endX! > x &&
    item.startY! < y &&
    item.endY! > y
  ))?.id;
}
