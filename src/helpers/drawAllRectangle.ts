import { Rectangle } from "./../models/classRectangle";

export function drawAllRectangle(
  rectangleList: Rectangle[],
  canvas: HTMLCanvasElement
) {
  rectangleList.forEach((item) => item.draw(canvas, 1));
}
