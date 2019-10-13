import { APIs } from "./APIs";
import { Element } from "./Element";

export class Buttons {
  constructor(parent, container) {
    this.API = new APIs();
    this.parent = parent;
    this.container = container;
  }

  createButtonAddToFavorites(id) {
    if (window.location.pathname === "/profile") {
      const button = new Element(
        "button",
        this.container,
        `${this.parent}__button`,
        "Add to my favorites"
      );
      button.createElement();

      //dodaj do ulubionych
      const buttonAdd = document.querySelector(".one-tv-series__button");

      console.log();
      buttonAdd.addEventListener("click", () => {
        fetch(`profile/${id}`, {
          method: "POST",
          body: JSON.stringify(id)
        });
      });
    } else {
      const button = new Element(
        "a",
        this.container,
        `${this.parent}__button`,
        "Go to your profile to add to favorites",
        null,
        null,
        "/profile"
      );
      button.createElement();
    }
  }
}
