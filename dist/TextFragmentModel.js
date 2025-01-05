export class TextFragmentURLManager {
    url;
    static createFragmentURL(url, text) {
        return `${url}#:~:text=${encodeURIComponent(text)}`;
    }
    static createFragmentURLWithStartAndEnd(url, startText, endText) {
        return `${url}#:~:text=${encodeURIComponent(startText)},${encodeURIComponent(endText)}`;
    }
    constructor(url) {
        this.url = url;
    }
    createFragmentURL(text) {
        return TextFragmentURLManager.createFragmentURL(this.url, text);
    }
    createFragmentURLWithStartAndEnd(startText, endText) {
        return TextFragmentURLManager.createFragmentURLWithStartAndEnd(this.url, startText, endText);
    }
    createFragmentLink(text) {
        const a = document.createElement("a");
        a.href = this.createFragmentURL(text);
        return a;
    }
    createFragmentLinkWithStartAndEnd(startText, endText) {
        const a = document.createElement("a");
        a.href = this.createFragmentURLWithStartAndEnd(startText, endText);
        return a;
    }
}
