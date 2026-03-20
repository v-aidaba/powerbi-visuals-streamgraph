import powerbi from "powerbi-visuals-api";

import IVisual = powerbi.extensibility.visual.IVisual;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import DialogConstructorOptions = powerbi.extensibility.visual.DialogConstructorOptions;
import IDialogHost = powerbi.extensibility.visual.IDialogHost;

export class DialogVisual implements IVisual {
    private target: HTMLElement;
    private dialogHost: IDialogHost;

    constructor(options: DialogConstructorOptions) {
        this.target = options.element;
        this.dialogHost = options.host;
        this.renderDialogContent();
    }

    private renderDialogContent(): void {
        this.target.style.padding = "24px";
        this.target.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        this.target.style.display = "flex";
        this.target.style.flexDirection = "column";
        this.target.style.height = "100%";
        this.target.style.boxSizing = "border-box";
        this.target.style.color = "#333";

        const title = document.createElement("h2");
        title.textContent = "Dialog Title";
        title.style.margin = "0 0 12px 0";
        title.style.fontSize = "20px";
        title.style.fontWeight = "600";
        title.style.color = "#1a1a1a";
        this.target.appendChild(title);

        const description = document.createElement("p");
        description.textContent =
            "This dialog provides additional information about your Power BI visual. " +
            "You can use it to display instructions, configuration details, or any content " +
            "that requires the user's attention before proceeding.";
        description.style.margin = "0 0 8px 0";
        description.style.fontSize = "14px";
        description.style.lineHeight = "1.5";
        description.style.color = "#555";
        this.target.appendChild(description);

        const details = document.createElement("p");
        details.textContent =
            "Review the information above and click OK to confirm, or Close to dismiss this dialog.";
        details.style.margin = "0 0 16px 0";
        details.style.fontSize = "13px";
        details.style.lineHeight = "1.4";
        details.style.color = "#666";
        this.target.appendChild(details);

        const spacer = document.createElement("div");
        spacer.style.flex = "1";
        this.target.appendChild(spacer);

        const buttonRow = document.createElement("div");
        buttonRow.style.display = "flex";
        buttonRow.style.justifyContent = "flex-end";
        buttonRow.style.gap = "10px";
        buttonRow.style.borderTop = "1px solid #e0e0e0";
        buttonRow.style.paddingTop = "16px";

        const okButton = document.createElement("button");
        okButton.textContent = "OK";
        okButton.style.padding = "8px 24px";
        okButton.style.fontSize = "14px";
        okButton.style.fontWeight = "600";
        okButton.style.cursor = "pointer";
        okButton.style.border = "none";
        okButton.style.borderRadius = "4px";
        okButton.style.backgroundColor = "#0078d4";
        okButton.style.color = "#ffffff";
        okButton.addEventListener("click", () => {
            this.dialogHost.close(powerbi.DialogAction.OK);
        });
        buttonRow.appendChild(okButton);

        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.style.padding = "8px 24px";
        closeButton.style.fontSize = "14px";
        closeButton.style.fontWeight = "600";
        closeButton.style.cursor = "pointer";
        closeButton.style.border = "1px solid #8a8886";
        closeButton.style.borderRadius = "4px";
        closeButton.style.backgroundColor = "#ffffff";
        closeButton.style.color = "#333";
        closeButton.addEventListener("click", () => {
            this.dialogHost.close(powerbi.DialogAction.Close);
        });
        buttonRow.appendChild(closeButton);

        this.target.appendChild(buttonRow);
    }

    public update(options: VisualUpdateOptions): void {
        // Dialog visuals do not receive data updates
    }
}
