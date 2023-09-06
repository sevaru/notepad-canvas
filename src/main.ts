import "./style.css";
import { Canvas } from "./Components/Canvas/canvas";
import { PaintCanvas } from "./Components/Canvas/PaintCanvas";
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    ${Canvas()}  
  </div>
`;

PaintCanvas(document.querySelector<HTMLCanvasElement>("canvas")!);
