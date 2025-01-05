export class SelectionManager {
    static getSelection() {
        const selection = document.getSelection();
        if (!selection)
            return "";
        return selection.toString();
    }
    static onSelect(callback) {
        document.addEventListener("mouseup", () => {
            const selection = document.getSelection();
            if (!selection)
                return;
            callback(selection?.toString() || "", selection);
        });
    }
    static clearSelection() {
        document.getSelection()?.removeAllRanges();
    }
    static selectRange(range) {
        document.getSelection()?.removeAllRanges();
        document.getSelection()?.addRange(range);
        return range.toString();
    }
    static createBasicRange(element, start, end) {
        const range = new Range();
        range.setStart(element, start);
        range.setEnd(element, end);
        return range;
    }
}
export class RangeModel {
    range = new Range();
    selectElement(element) {
        this.range.selectNodeContents(element);
    }
    setStart(node, offset) {
        this.range.setStart(node, offset);
    }
    setEnd(node, offset) {
        this.range.setEnd(node, offset);
    }
    getText() {
        return this.range.toString();
    }
    getContents() {
        return this.range.cloneContents();
    }
    deleteContents() {
        this.range.deleteContents();
    }
}
