const Element = require('./Element');
const { scrollTo } = require('scroll-js');

class DescriptionTvSeries {
  constructor(id, n) {
    this.id = id;
    this.URL_id = 'http://api.tvmaze.com/shows/';
    this.n = n;
    if (document.querySelector('.userSeries')) {
      this.shortDescriptions = [...document.querySelectorAll('.one-tv-series-small')];
    }

    //stworzenie kontenera
    this.container = document.querySelector('.one-tv-series') || this.shortDescriptions[this.n];
    this.parent = ``;
    this.parent = this.container.getAttribute('class');
  }

  createImg(image) {
    const img = new Element('img', this.container, `${this.parent}__img-series`, null, null, image);
    img.createElement();
  }

  createButton(id) {
    if (window.location.pathname === '/profile') {
      const button = new Element('button', this.container, `${this.parent}__button`, 'Add to my favorites');
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
        `${this.parent}__button`,
        'Login to add to favorites',
        null,
        null,
        '/profile'
      );
      button.createElement();
    }
  }

  createTitle(name) {
    const title = new Element('h2', this.container, `${this.parent}__title-series`, name);
    title.createElement();
  }

  createEpisodes(next) {
    //nastepny odcinek

    fetch(next)
      .then(resp => resp.json())
      .then(next => {
        const text = `Next episode: S${next.season} E${next.number}. Date: ${next.airdate}`;

        const nextInfo = new Element('p', this.container, `${this.parent}__next`, text);
        nextInfo.createElement();
      });
  }

  createInfo(text) {
    const info = new Element('p', this.container, `${this.parent}__info-series`, text);
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
            `${this.parent}__next`,
            'There are no plans for the next episode'
          );
          nextInfo.createElement();
        }
      });

    this.containerFromTop = this.container.offsetTop;
    scrollTo(document.body, { top: this.containerFromTop });
  }

  createOneShort() {
    fetch(`${this.URL_id}${this.id}`)
      .then(resp => resp.json())
      .then(resp => {
        this.createImg(resp.image.medium);
        this.createTitle(resp.name);

        if (resp._links.nextepisode) {
          this.createEpisodes(resp._links.nextepisode.href);
        } else {
          const nextInfo = new Element(
            'p',
            this.container,
            `${this.parent}__next`,
            'There are no plans for the next episode'
          );
          nextInfo.createElement();
        }

        //przycisk usun z ulubionych
        //pokaz wiecej
      });
  }
}
module.exports = DescriptionTvSeries;
