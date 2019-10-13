import { Element } from "./Element";
import { APIs } from "./APIs";

export class PartInfo {
  constructor(parent, container) {
    this.API = new APIs();
    this.parent = parent;
    this.container = container;
  }

  createImg(image) {
    const img = new Element(
      "img",
      this.container,
      `${this.parent}__img-series`,
      null,
      null,
      image
    );
    img.createElement();
  }

  createTitle(name) {
    const title = new Element(
      "h2",
      this.container,
      `${this.parent}__title-series`,
      name
    );
    title.createElement();
  }

  createInfo(text) {
    const info = new Element(
      "p",
      this.container,
      `${this.parent}__info-series`,
      text
    );
    info.createElement();
  }

  createEpisodes(next) {
    //nastepny odcinek
    if (next) {
      fetch(next)
        .then(resp => resp.json())
        .then(next => {
          const text = `Next episode: S${next.season} E${next.number}. Date: ${next.airdate}`;

          const nextInfo = new Element(
            "p",
            this.container,
            `${this.parent}__next`,
            text
          );
          nextInfo.createElement();
        });
    } else {
      const nextInfo = new Element(
        "p",
        this.container,
        `${this.parent}__next`,
        "There are no plans for the next episode"
      );
      nextInfo.createElement();
    }
  }
}
