import { RectangleInfoForSaveTypes } from "./../../types/index";
import { Rectangle } from "./../../models/classRectangle";
import { rectangleList, rectangleListClear } from "../../store";
import { createListForSave } from "../../helpers/createListForSave";
import { drawAllRectangle } from "../../helpers/drawAllRectangle";

export function handleLinks(
  save: HTMLLinkElement,
  download: HTMLDivElement,
  canvas: HTMLCanvasElement
) {
  save.addEventListener("click", () => {
    save.setAttribute("download", "text.json");
    if (rectangleList.length > 0) {
      const newRectangleList = createListForSave(rectangleList);
      const str = JSON.stringify(newRectangleList);
      const blob = new Blob([str], { type: "aplication/json" });
      save.href = URL.createObjectURL(blob);
    } else {
      alert("Нет элементов которые можно сохранить");
    }
  });
  download.addEventListener("click", () => {
    let link = document.querySelector<HTMLLinkElement>(".link-download")!;
    link.addEventListener("click", handleDownload);
    function handleDownload() {
      let file = document.querySelector(".fileUpload")! as HTMLInputElement;
      async function handleInputChange(event: any) {
        let files = event.target.files;
        let filee = files[0];
        async function parseJsonFile(filee: any) {
          return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = (event: any) =>
              resolve(JSON.parse(event.target.result));
            fileReader.onerror = (error) => reject(error);
            fileReader.readAsText(filee);
          });
        }
        let res: any = await parseJsonFile(filee);
        let rectangle: Rectangle[] = res.map((item: any) => {
          return new Rectangle(
            item.x,
            item.y,
            item.id,
            item.text,
            item.textSize
          );
        });
        rectangleList.forEach((item) => item.wipeOf(canvas));
        rectangleListClear();
        rectangle.forEach((item) => {
          rectangleList.push(item);
        });
        drawAllRectangle(rectangleList, canvas, 1);
        file.value = "";
        file.removeEventListener("change", handleInputChange);
      }
      file!.addEventListener("change", handleInputChange);
      link.removeEventListener("click", handleDownload);
    }
  });
}
