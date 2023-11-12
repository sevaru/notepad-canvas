import { Rectangle } from "./models/classRectangle";
import { findRectangleByCoordinates } from "./helpers/findRectangleByCordinates";
import { resizeWindowBrowser } from "./helpers/resizeWindowBrowser";
import { sortRectangleList } from "./helpers/sortRectangleList";
import { findRectangleById } from "./helpers/findRectangleById";
import { TextAreaService } from "./TextAreaService";


export class Board {
  private selectedId: number | undefined;
  private textAreaService: TextAreaService | undefined;
  private container: HTMLElement;

  constructor(private canvas: HTMLCanvasElement, private rectangles: Rectangle[]) {
    this.bindEvents();
    if (!this.canvas.parentElement) {
      throw new Error('Canvas loh');
    }

    this.container = this.canvas.parentElement;
  }

  private bindEvents(): void {
    resizeWindowBrowser(this.canvas, this.rectangles);
    window.addEventListener("resize", () =>
      resizeWindowBrowser(this.canvas, this.rectangles)
    );

    this.canvas.addEventListener('mouseup', (event) => {
      if (this.textAreaService) {
        this.textAreaService.dispose();
        this.textAreaService = undefined;
        event.stopImmediatePropagation();
      }
    });

    this.canvas.addEventListener("mouseup", (event) => this.onMouseUp(event));
    this.canvas.addEventListener("mousedown", (event) => this.onMouseDown(event));
    this.canvas.addEventListener("dblclick", (event) => this.onDoubleClick(event));
  }

  private onDoubleClick(event: MouseEvent): void {
    const rectangleId = findRectangleByCoordinates(this.rectangles, event.offsetX, event.offsetY);
    if (rectangleId === undefined) {
      return;
    }
    const rectangle = findRectangleById(this.rectangles, rectangleId);
    if (!rectangle) {
      throw Error('moh sidr');
    }

    this.textAreaService = new TextAreaService(rectangle, this.container);

    rectangle.removeText();
    this.draw();
  }

  private onMouseDown(event: MouseEvent): void {
    this.selectedId = findRectangleByCoordinates(
      this.rectangles,
      event.offsetX,
      event.offsetY
    );
    if (this.selectedId !== undefined) {
      this.canvas.addEventListener("mousemove", this.onMouseMove);
      this.draw();
    }
  }

  private onMouseUp = (event: MouseEvent) => {
    if (this.selectedId === undefined) {
      // TODO: remove event listener, clear selectedId
      this.addNewRectangle(event.offsetX, event.offsetY);
      return;
    }

    event.preventDefault();
    sortRectangleList(this.rectangles, this.selectedId);
    this.draw();
    findRectangleById(this.rectangles, this.selectedId)?.draw();

    const foundRectangle = findRectangleByCoordinates(this.rectangles, event.offsetX, event.offsetY);

    if (
      this.rectangles.length < 6 &&
      !foundRectangle
    ) {
      this.addNewRectangle(event.offsetX, event.offsetY);
    }
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    this.selectedId = undefined;
  }

  private addNewRectangle(x: number, y: number): void {
    const rectangle = new Rectangle(
      this.canvas,
      x,
      y,
      this.rectangles.length + 1
    );
    this.rectangles.push(rectangle);
    rectangle.draw();
  }

  // TODO: rename
  private onMouseMove = (event: MouseEvent) => {
    if (this.selectedId === undefined) {
      return;
    }

    const rectangle = findRectangleById(this.rectangles, this.selectedId);
    if (!rectangle) {
      return;
    }

    rectangle.clear(this.canvas);

    this.rectangles
      .filter((item) => item.id !== rectangle.id)
      .forEach((item) => item.draw());

    rectangle.update(event.offsetX, event.offsetY);
    rectangle.draw({ opacity: 0.5 });
  }

  private draw(): void {
    this.rectangles.forEach((item) => item.draw());
  }
}
