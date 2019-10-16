export class Element {
  constructor(element, parent, nameClass, text, id, img, href) {
    this.element = element;
    this.parent = parent;
    this.nameClass = nameClass;
    this.text = text;
    this.id = id;
    this.img = img;
    this.href = href;
  }

  createElement() {
    const el = document.createElement(this.element);
    el.classList.add(this.nameClass);
    if (this.id) el.setAttribute('data-id', this.id);
    if (this.img) el.setAttribute('src', this.img);
    if (this.text) el.innerHTML = this.text;
    if (this.href) el.setAttribute('href', this.href);

    this.parent.appendChild(el);
  }
}
