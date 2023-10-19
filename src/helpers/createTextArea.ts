export function createTextArea() {
  const textInput = document.createElement("textarea");
  textInput.id = "text-input";
  textInput.style.position = "absolute";
  textInput.style.maxWidth = `${130}px`;
  textInput.style.minWidth = `${130}px`;
  textInput.style.maxHeight = "130px";
  textInput.style.height = "130px";
  textInput.style.outline = "none";
  textInput.style.resize = "none";
  textInput.style.color = "white";
  textInput.style.textAlign = "center";
  textInput.style.fontFamily = "Helvetica";
  textInput.style.overflow = "hidden";
  textInput.cols = 13;
  textInput.style.lineHeight = "15px";
  return textInput;
}
