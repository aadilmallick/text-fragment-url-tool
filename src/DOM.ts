type Selector = typeof DOM.$;

export class DOM {
  /**
   * Adding elements
   * */
  static createDomElement(html: string) {
    const dom = new DOMParser().parseFromString(html, "text/html");
    return dom.body.firstElementChild as HTMLElement;
  }
  static addStyleTag(css: string) {
    const styles = document.createElement("style");
    styles.textContent = css;
    document.head.appendChild(styles);
    return styles;
  }
  static addElementsToContainer(
    container: HTMLElement,
    elements: HTMLElement[]
  ) {
    const fragment = document.createDocumentFragment();
    elements.forEach((el) => fragment.appendChild(el));
    container.appendChild(fragment);
  }

  /**
   * querying elements
   * */
  static $ = (selector: string): HTMLElement | null =>
    document.querySelector(selector);
  static $$ = (selector: string): NodeListOf<HTMLElement> =>
    document.querySelectorAll(selector);

  static $throw = (selector: string): HTMLElement => {
    const el = DOM.$(selector);
    if (!el) {
      throw new Error(`Element not found: ${selector}`);
    }
    return el;
  };

  static createQuerySelectorWithThrow(
    containerElement: HTMLElement | ShadowRoot
  ) {
    const select = containerElement.querySelector.bind(
      containerElement
    ) as Selector;
    return ((_class: keyof HTMLElementTagNameMap) => {
      const query = select(_class);
      if (!query) throw new Error(`Element with selector ${_class} not found`);
      return query;
    }) as Selector;
  }
}

export function html(strings: TemplateStringsArray, ...values: any[]) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (values[i] || "");
  });
  return str;
}

export function css(strings: TemplateStringsArray, ...values: any[]) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (values[i] || "");
  });
  return str;
}
