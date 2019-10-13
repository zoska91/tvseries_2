import { APIs } from './APIs';
import { Element } from './Element';

export class Buttons {
  constructor(parent, container) {
    this.API = new APIs();
    this.parent = parent;
    this.container = container;
  }

  createButtonAddToFavorites(id) {
    if (window.location.pathname === '/profile') {
      const aa = async id => {
        try {
          const resp = await this.API.getIdsOfFavorites();
          let isInFavorites = resp.data.findIndex(
            x => x.seriesId === Number(id)
          );
          console.log(isInFavorites);

          if (isInFavorites === -1) {
            console.log('add');
            const button = new Element(
              'button',
              this.container,
              `${this.parent}__button`,
              'Add to my favorites'
            );
            button.createElement();

            //dodaj do ulubionych
            const buttonAdd = document.querySelector('.one-tv-series__button');

            buttonAdd.addEventListener('click', () => {
              fetch(`profile/${id}`, {
                method: 'POST',
                body: JSON.stringify(id)
              });
              location.reload();
            });
          } else {
            console.log('add');
            const button = new Element(
              'button',
              this.container,
              `${this.parent}__button`,
              `You have this tv series in your favorites. 
              <br>
              Go to your profile!`
            );
            button.createElement();

            const buttonAdd = document.querySelector('.one-tv-series__button');
            buttonAdd.addEventListener('click', () => location.reload());
          }
        } catch (err) {
          console.log(err);
        }
      };
      aa(id);
    } else {
      const button = new Element(
        'a',
        this.container,
        `${this.parent}__button`,
        'Go to your profile to add to favorites',
        null,
        null,
        '/profile'
      );
      button.createElement();
    }
  }
}
