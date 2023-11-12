import { Rectangle } from "../models/classRectangle";

// adjustCanvasDimensions
// resizeCanvasToBrowser
export function resizeWindowBrowser(
  canvas: HTMLCanvasElement,
  rectangleList: Rectangle[]
) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  rectangleList.forEach((item) => item.draw());
}
