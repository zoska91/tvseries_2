import { Element } from "./Element";
import { scrollTo } from "scroll-js";
import { APIs } from "./APIs";
import { PartInfo } from "./PartInfo";
import { Buttons } from "./Buttons";

export class DescriptionTvSeries {
  constructor(id, n) {
    this.id = id;
    this.n = n;

    if (document.querySelector(".userSeries")) {
      this.shortDescriptions = [
        ...document.querySelectorAll(".one-tv-series-small")
      ];
    }

    this.container =
      document.querySelector(".one-tv-series") ||
      this.shortDescriptions[this.n];
    this.parent = this.container.getAttribute("class");

    this.partInfo = new PartInfo(this.parent, this.container);
    this.buttons = new Buttons(this.parent, this.container);
  }

  async createDescription() {
    this.container.innerHTML = "";
    try {
      const API = new APIs();
      const resp = await API.getInfoOneId(this.id);

      if (resp.image.medium) this.partInfo.createImg(resp.image.medium);
      this.buttons.createButtonAddToFavorites(this.id);
      this.partInfo.createTitle(resp.name);
      this.partInfo.createInfo(resp.summary);
      if (resp._links.nextepisode)
        this.partInfo.createEpisodes(resp._links.nextepisode.href);
      else this.partInfo.createEpisodes(null);
    } catch (err) {
      console.log(err);
    }

    this.containerFromTop = this.container.offsetTop;
    scrollTo(document.body, { top: this.containerFromTop });
  }

  async createOneShort() {
    try {
      const API = new APIs();
      const resp = await API.getInfoOneId(this.id);

      if (resp.image.medium) this.partInfo.createImg(resp.image.medium);
      this.partInfo.createTitle(resp.name);
      if (resp._links.nextepisode)
        this.partInfo.createEpisodes(resp._links.nextepisode.href);
      else this.partInfo.createEpisodes(null);

      //przycisk usun z ulubionych
      //pokaz wiecej
    } catch (err) {
      console.log(err);
    }
  }
}
