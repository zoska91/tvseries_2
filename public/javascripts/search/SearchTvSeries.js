import { DescriptionTvSeries } from "../DescriptionTvSeries";
import { Element } from "../Element";

export class SearchTvSeries {
  constructor(title) {
    this.URL = "http://api.tvmaze.com/search/";
    this.title = title;
    this.listResult = document.querySelector(".searchSeries__list-result");
    this.containerResult = document.querySelector(
      ".searchSeries__container-result"
    );
  }

  //pobiera wyniki z API
  async getList() {
    try {
      const resp = await fetch(`${this.URL}shows?q=${this.title}`);
      const data = await resp.json();
      return data;
    } catch (err) {
      console.log(err);
    }
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
  showResultSearch() {
    //czyszczenie wynikow
    if (this.listResult) this.listResult.innerHTML = "";

    this.getList().then(resp => {
      //sprawdzenie czy sa wyniki
      console.log(resp);

      if (resp.length === 0) {
        console.log("ok");
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
    });
  }
}
