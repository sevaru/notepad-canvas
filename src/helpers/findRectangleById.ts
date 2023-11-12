import { Rectangle } from "../models/classRectangle";

export function findRectangleById(rectangles: Rectangle[], id: number) {
  const result = rectangles.find((item) => item.id === id);
  return result;
}

