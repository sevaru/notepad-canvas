import "./style.css";
import { handleCanvas } from "./Components/Canvas/HandleCanvas";
import { handleLinks } from "./Components/Header/HandleLInks";
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
  <div class="notepad-container">
  <header class="header-container">
  <div class="header">
  <div class="header-empty"></div>
  <div class="header-title"><h1>Canvas Notepad</h1></div>
  <div class="header-links">
  <a class="link-save">
  <img src="/src/images/Aniket-Suvarna-Box-Regular-Bx-save.svg"/>
  </a>
  <a class="link-download">
  <input type="file" id="file" class="fileUpload"></input>
  <label for="file">
  <img src="/src/images/Icons8-Windows-8-Folders-Downloads-Folder.512.png"/>
  </label>
  </a>
  </div>
  </div>
  </header>
  <div class="canvas-сontainer">
  <canvas id="canvas"></canvas>
  </div>
  </div>
  </div>
`;

handleCanvas(document.querySelector<HTMLCanvasElement>("canvas")!);
handleLinks(
  document.querySelector<HTMLLinkElement>(".link-save")!,
  document.querySelector<HTMLLinkElement>(".link-download")!,
  document.querySelector<HTMLCanvasElement>("canvas")!
);
