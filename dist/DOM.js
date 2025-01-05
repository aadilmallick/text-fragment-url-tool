export class DOM {
    /**
     * Adding elements
     * */
    static createDomElement(html) {
        const dom = new DOMParser().parseFromString(html, "text/html");
        return dom.body.firstElementChild;
    }
    static addStyleTag(css) {
        const styles = document.createElement("style");
        styles.textContent = css;
        document.head.appendChild(styles);
        return styles;
    }
    static addElementsToContainer(container, elements) {
        const fragment = document.createDocumentFragment();
        elements.forEach((el) => fragment.appendChild(el));
        container.appendChild(fragment);
    }
    /**
     * querying elements
     * */
    static $ = (selector) => document.querySelector(selector);
    static $$ = (selector) => document.querySelectorAll(selector);
    static $throw = (selector) => {
        const el = DOM.$(selector);
        if (!el) {
            throw new Error(`Element not found: ${selector}`);
        }
        return el;
    };
    static createQuerySelectorWithThrow(containerElement) {
        const select = containerElement.querySelector.bind(containerElement);
        return ((_class) => {
            const query = select(_class);
            if (!query)
                throw new Error(`Element with selector ${_class} not found`);
            return query;
        });
    }
}
export function html(strings, ...values) {
    let str = "";
    strings.forEach((string, i) => {
        str += string + (values[i] || "");
    });
    return str;
}
export function css(strings, ...values) {
    let str = "";
    strings.forEach((string, i) => {
        str += string + (values[i] || "");
    });
    return str;
}
