import "./style.css";
import "./reset.css";
import { Board } from "./Board";

function main() {
  const canvas = document.querySelector<HTMLCanvasElement>("canvas");
  if (!canvas) {
    return;
  }

  new Board(canvas, []);
}


main();
