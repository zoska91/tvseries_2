import { DescriptionTvSeries } from "./DescriptionTvSeries";
import { Element } from "./Element";
import { APIs } from "./APIs";

export class ShowFavorites {
  constructor() {
    this.container = document.querySelector(".userSeries");
  }

  async show() {
    this.container.innerHTML = "";
    let n = 0;

    try {
      const API = new APIs();
      const data = await API.getIdsOfFavorites();
      const listIds = data.data;

      listIds.forEach(li => {
        const oneShortContainer = new Element(
          "div",
          this.container,
          "one-tv-series-small"
        );
        oneShortContainer.createElement();

        const oneShort = new DescriptionTvSeries(li.seriesId, n);
        oneShort.createOneShort();

        n++;
      });
    } catch (err) {
      console.log(err);
    }
  }
}

const list = new ShowFavorites();
list.show();
