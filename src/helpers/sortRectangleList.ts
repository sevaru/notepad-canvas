import { Rectangle } from "../models/classRectangle";

// FIXME: Doska bringRectangleToFront
export function sortRectangleList(rectangleList: Rectangle[], id: number): Rectangle[] {
  const indexToFind = rectangleList.findIndex((obj) => obj.id === id);
  if (indexToFind === -1) {
    return rectangleList;
  }
  
  const foundElement = rectangleList[indexToFind];
  for (let i = indexToFind; i < rectangleList.length - 1; i++) {
    rectangleList[i] = rectangleList[i + 1];
  }
  rectangleList[rectangleList.length - 1] = foundElement;
  return rectangleList;
}
