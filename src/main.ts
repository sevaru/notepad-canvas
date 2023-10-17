import "./style.css";
import { handleCanvas } from "./Components/Canvas/HandleCanvas";
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
  <div class="notepad-container">
  <h1>Canvas Notepad</h1>
  <div class="canvas-сontainer">
  <canvas id="canvas"></canvas>
  </div>
  </div>
  </div>
`;

handleCanvas(document.querySelector<HTMLCanvasElement>("canvas")!);
