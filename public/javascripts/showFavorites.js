import { DescriptionTvSeries } from "./DescriptionTvSeries";
import { Element } from "./Element";

export class ShowFavorites {
  constructor() {
    this.container = document.querySelector(".userSeries");
  }

  getIds() {
    return fetch("/profile/favorites", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => data);
  }

  show() {
    this.container.innerHTML = "";
    let n = 0;

    this.getIds().then(data => {
      const list = data.data;

      //do poprawy!!!!!!!!!!!!!!!!
      list.forEach(li => {
        const oneShortContainer = new Element(
          "div",
          this.container,
          "one-tv-series-small"
        );
        oneShortContainer.createElement();

        const oneShort = new DescriptionTvSeries(li.seriesId, n);
        oneShort.createOneShort(li.seriesId, n);

        n++;
      });
    });
  }
}

const list = new ShowFavorites();
list.show();
