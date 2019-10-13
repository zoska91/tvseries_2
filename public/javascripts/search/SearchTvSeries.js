import { DescriptionTvSeries } from "../DescriptionTvSeries";
import { Element } from "../Element";
import { APIs } from "../APIs";

export class SearchTvSeries {
  constructor(title) {
    this.title = title;
    this.listResult = document.querySelector(".searchSeries__list-result");
    this.containerResult = document.querySelector(
      ".searchSeries__container-result"
    );
  }

  //pokazuje jeden wybrany serial
  showPickTvSeries(id) {
    const descriptionOneTvSeries = new Element(
      "div",
      this.containerResult,
      "one-tv-series"
    );
    descriptionOneTvSeries.createElement();

    const result = new DescriptionTvSeries(id);

    result.createDescription();
  }

  //pokazuje liste szukanego tytulu
  async showResultSearch() {
    //czyszczenie wynikow
    if (this.listResult) this.listResult.innerHTML = "";

    try {
      const API = new APIs();
      const resp = await API.getSearchTitle(this.title);
      //sprawdzenie czy sa wyniki

      if (resp.length === 0) {
        const noResult = new Element(
          "p",
          this.containerResult,
          "searchSeries__noResult",
          "We can't find your TV series :( Try again!"
        );
        noResult.createElement();
      }
      //czy jest węcej niż jeden wynik
      else if (resp.length > 1) {
        resp.forEach(element => {
          const text = `${element.show.name} - ${element.show.premiered} ${
            element.show.network
              ? "[" + element.show.network.country.code + "]"
              : ""
          }`;

          const listItem = new Element(
            "li",
            this.listResult,
            "searchSeries__list-item",
            text,
            element.show.id
          );
          listItem.createElement();
        });

        const tvSerierToPick = [
          ...document.querySelectorAll(".searchSeries__list-item")
        ];

        //pobiera id wybranego serialu
        tvSerierToPick.forEach(el => {
          el.addEventListener("click", () => {
            const idTvSeries = el.getAttribute("date-id");
            this.showPickTvSeries(idTvSeries);
          });
        });
      } else {
        const idTvSeries = resp[0].show.id;
        this.showPickTvSeries(idTvSeries);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
