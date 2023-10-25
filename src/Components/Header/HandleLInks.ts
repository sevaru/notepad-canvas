import { Rectangle } from "./../../models/classRectangle";
import { rectangleList } from "../../store";
export function handleLinks(
  save: HTMLLinkElement,
  download: HTMLLinkElement,
  canvas: HTMLCanvasElement
) {
  save.addEventListener("click", () => {
    save.setAttribute("download", "text.json");
    if (rectangleList.length > 0) {
      let newRectangleList = rectangleList.map((item) => {
        let result = {
          id: item.id,
          x: item.intialValueX,
          y: item.initialValueY,
          color: item.color,
          text: item.contextText,
          textSize: item.contextTextFontSize,
        };
        return result;
      });
      let str = JSON.stringify(newRectangleList);
      let blob = new Blob([str], { type: "aplication/json" });
      save.href = URL.createObjectURL(blob);
      console.log("сохранить");
    } else {
      alert("Нет элементов которые можно сохранить");
    }
  });
  download.addEventListener("click", handleDownload);

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
        return new Rectangle(item.x, item.y, item.id, item.text, item.textSize);
      });
      rectangle.forEach((item) => {
        rectangleList.push(item);
      });
      rectangleList.forEach((item) => item.draw(canvas, 1));
      file.value = "";
      file.removeEventListener("change", handleInputChange);
    }
    file!.addEventListener("change", handleInputChange);
    download.removeEventListener("click", handleDownload);
  }
}
