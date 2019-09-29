const Element = require('./Element');
const { scrollTo } = require('scroll-js');

class DescriptionTvSeries {
  constructor(id) {
    this.id = id;
    this.URL_id = 'http://api.tvmaze.com/shows/';

    this.containerResult = document.querySelector('.searchSeries__container-result');

    //stworzenie kontenera
    this.descriptionOneTvSeries = new Element('div', this.containerResult, 'one-tv-series');
    this.descriptionOneTvSeries.createElement();
    this.container = document.querySelector('.one-tv-series');
    this.containerFromTop = this.container.offsetTop;
  }

  createImg(image) {
    const img = new Element('img', this.container, 'one-tv-series__img-series', null, null, image);
    img.createElement();
  }

  createButton(id) {
    if (window.location.pathname === '/profile') {
      const button = new Element('button', this.container, 'one-tv-series__button', 'Add to my favorites');
      button.createElement();

      const buttonAdd = document.querySelector('.one-tv-series__button');
      buttonAdd.addEventListener('click', () => {
        fetch(`profile/${id}`, {
          method: 'POST',
          body: JSON.stringify(id)
        });
      });
    } else {
      const button = new Element(
        'a',
        this.container,
        'one-tv-series__button',
        'Login to add to your favorites',
        null,
        null,
        '/profile'
      );
      button.createElement();
    }
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

    scrollTo(document.body, { top: this.containerFromTop });
  }
}

module.exports = DescriptionTvSeries;
