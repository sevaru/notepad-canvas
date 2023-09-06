export function PaintCanvas(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "blue";
  ctx.fillRect(10, 10, 100, 100);
  ctx.fillStyle = "green";
  ctx.fillRect(110, 10, 100, 100);

  ctx.beginPath();
  ctx.moveTo(300, 10);
  ctx.lineTo(400, 120);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(300, 200, 50, 0, (Math.PI / 2) * 3);
  ctx.stroke();
  return;
}
