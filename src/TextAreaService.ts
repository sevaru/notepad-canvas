import { createTextArea } from "./helpers/createTextArea";
import { Rectangle } from "./models/classRectangle";

export class TextAreaService {
    public textArea: HTMLTextAreaElement;

    constructor(private rectangle: Rectangle, container: HTMLElement) {
        this.textArea = createTextArea(rectangle.getInfoRectangle());
        this.bindEvents();
        container.appendChild(this.textArea);
        this.textArea.value = rectangle.contextText;
        this.textArea.focus();
    }

    public dispose(): void {
        this.rectangle.copyFromTextArea(this.textArea);
        this.rectangle.draw();
        this.textArea.remove();
    }

    private bindEvents() {
        this.textArea.addEventListener("input", () => {
            let charCount = this.textArea.value.length;
            this.textArea.style.fontSize =
                Math.max(18, 18 + charCount <= 18 ? charCount : 18) + "px";
            while (this.textArea.scrollHeight > this.textArea.clientHeight) {
                let currentFontSize = parseFloat(
                    window
                        .getComputedStyle(this.textArea, null)
                        .getPropertyValue("font-size")
                );
                this.textArea.style.fontSize = currentFontSize - 1 + "px";
            }
        });


        this.textArea.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.rectangle.copyFromTextArea(this.textArea);
                this.rectangle.draw();
                this.textArea.remove();
            }
        });
    }
}