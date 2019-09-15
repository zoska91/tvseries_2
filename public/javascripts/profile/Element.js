class Element {
  constructor(element, parent, nameClass, text, id, img) {
    this.element = element;
    this.parent = parent;
    this.nameClass = nameClass;
    this.text = text;
    this.id = id;
    this.img = img;
  }

  createElement() {
    const el = document.createElement(this.element);
    el.classList.add(this.nameClass);
    if (this.id) el.setAttribute('date-id', this.id);
    if (this.img) el.setAttribute('src', this.img);
    if (this.text) el.innerHTML = this.text;

    this.parent.appendChild(el);
  }
}
