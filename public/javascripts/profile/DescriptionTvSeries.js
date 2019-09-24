const Element = require('./Element');
const { scrollTo } = require('scroll-js');

class DescriptionTvSeries {
  constructor(id) {
    this.id = id;
    this.URL_id = 'http://api.tvmaze.com/shows/';

    this.containerResult = document.querySelector('.searchSeries__container-result');

    this.heightWindow = window.innerHeight;

    //stworzenie kontenera
    this.descriptionOneTvSeries = new Element('div', this.containerResult, 'one-tv-series');
    this.descriptionOneTvSeries.createElement();
    this.container = document.querySelector('.one-tv-series');
  }

  createImg(image) {
    console.log(image);
    const img = new Element('img', this.container, 'one-tv-series__img-series', null, null, image);
    img.createElement();
  }

  createButton(id) {
    console.log(id);
    let form = new Element('button', this.container, 'searchSeries__btn-add-to-favorites', 'Add to my favorites');
    form.createElement();

    // fetch(`profile/add/${id}`, {
    //   method: 'POST'
    // })

    // w quizie - przełanie odp z buttona
  }

  createTitle(name) {
    const title = new Element('h2', this.container, 'one-tv-series__title-series', name);
    title.createElement();
  }

  createEpisodes(next) {
    //nastepny odcinek

    fetch(next)
      .then(resp => resp.json())
      .then(next => {
        const text = `Next episode: S${next.season} E${next.number} - title: ${next.name}. Date: ${next.airdate}`;

        const nextInfo = new Element('p', this.container, 'one-tv-series__next', text);
        nextInfo.createElement();
      });
  }

  createInfo(text) {
    const info = new Element('p', this.container, 'one-tv-series__info-series', text);
    info.createElement();
  }

  createDescription() {
    this.container.innerHTML = '';

    fetch(`${this.URL_id}${this.id}`)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);

        this.createImg(resp.image.medium);
        this.createButton(this.id);
        this.createTitle(resp.name);
        this.createInfo(resp.summary);

        if (resp._links.nextepisode) {
          this.createEpisodes(resp._links.nextepisode.href);
        } else {
          const nextInfo = new Element(
            'p',
            this.container,
            'one-tv-series__next',
            'There are no plans for the next episode'
          );
          nextInfo.createElement();
        }
      });

    scrollTo(document.body, { top: this.heightWindow });
  }
}

module.exports = DescriptionTvSeries;
