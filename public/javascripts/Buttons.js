import { APIs } from './APIs';
import { Element } from './Element';

export class Buttons {
  constructor(parent, container) {
    this.API = new APIs();
    this.parent = parent;
    this.container = container;
  }

  button(element, parent, nameClass, text, id) {
    const button = new Element(element, parent, nameClass, text, id);
    button.createElement();
  }

  createButtonAddToFavorites(id) {
    if (window.location.pathname === '/profile') {
      const aa = async id => {
        try {
          const resp = await this.API.getIdsOfFavorites();
          let isInFavorites = resp.data.findIndex(
            x => x.seriesId === Number(id)
          );

          if (isInFavorites === -1) {
            this.button(
              'button',
              this.container,
              `${this.parent}__button`,
              'Add to my favorites'
            );

            //dodaj do ulubionych
            const buttonAdd = document.querySelector('.one-tv-series__button');

            buttonAdd.addEventListener('click', () => {
              fetch(`profile/add/${id}`, {
                method: 'POST',
                body: JSON.stringify(id)
              });
              location.reload();
            });
          } else {
            this.button(
              'button',
              this.container,
              `${this.parent}__button`,
              `You have this tv series in your favorites. 
              <br>
              Go to your profile!`
            );

            const buttonAdd = document.querySelector('.one-tv-series__button');
            buttonAdd.addEventListener('click', () => location.reload());
          }
        } catch (err) {
          console.log(err);
        }
      };
      aa(id);
    } else {
      this.button(
        'a',
        this.container,
        `${this.parent}__button`,
        'Go to your profile to add to favorites',
        null,
        null,
        '/profile'
      );
    }
  }

  remove(id) {
    const button = document.querySelector(`[data-id='${id}']`);

    const windowsRemove = () => {
      const windows = [
        ...document.querySelectorAll('.one-tv-series-small__are-you-sure')
      ];
      windows.forEach(window => window.remove());
    };

    button.addEventListener('click', () => {
      //skasowanie innych okienek
      windowsRemove();
      console.log(id);

      const areYouSure = new Element(
        'div',
        this.container,
        `${this.parent}__are-you-sure`,
        `
              <p>Are you sure you want delete this tv series from your favoritest?</p>
              <button class="button" data-name="yes">yes</button>
              <button class="button" data-name="no">no</button>
              `
      );
      areYouSure.createElement();

      const buttonNo = document.querySelector("[data-name='no']");
      const buttonYes = document.querySelector("[data-name='yes']");

      //no
      buttonNo.addEventListener('click', windowsRemove);
      document.addEventListener('keypress', e => {
        if (e.keyCode === '27') windowsRemove();
      });

      //yes
      buttonYes.addEventListener('click', () => {
        fetch(`profile/remove/${id}`, {
          method: 'POST',
          body: JSON.stringify(id)
        });
        location.reload();
      });
    });
  }

  createButtonRemoveFromFavorites(id) {
    this.button(
      'button',
      this.container,
      `${this.parent}__button-remove`,
      'x',
      id
    );

    this.remove(id);
  }

  createButtonMoreInfo(id) {
    this.button(
      'button',
      this.container,
      `${this.parent}__button-more-info`,
      'more info'
    );
  }
}
