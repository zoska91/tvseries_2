class SearchTvSeries {
  constructor(title) {
    this.URL = 'http://api.tvmaze.com/search/';
    this.title = title;
    this.listResult = document.querySelector('.searchSeries__list-result');
    this.containerResult = document.querySelector('.searchSeries__container-result');
  }

  //pobiera wyniki z API
  getList() {
    return fetch(`${this.URL}shows?q=${this.title}`)
      .then(resp => resp.json())
      .then(resp => resp);
  }

  addToMyFavorites(id) {
    let form = new Element('button', this.containerResult, 'searchSeries__btn-add-to-favorites', 'Add to my favorites');
    form.createElement();

    // fetch(`profile/add/${id}`, {
    //   method: 'POST'
    // })

    // w quizie - przełanie odp z buttona
  }
  //pokazuje jeden wybrany serial
  showPickTvSeries(id) {
    const result = new DescriptionTvSeries(id);
    result.createDescription();
    this.addToMyFavorites(id);
  }

  //pokazuje liste szukanego tytulu
  showResultSearch() {
    //czyszczenie wynikow
    if (this.listResult) this.listResult.innerHTML = '';

    this.getList().then(resp => {
      //sprawdzenie czy sa wyniki
      if (resp.lenght != 0) {
        console.log(resp);
        //czy jest węcej niż jeden wynik
        if (resp.length > 1) {
          resp.forEach(element => {
            const text = `${element.show.name} - ${element.show.premiered} ${
              element.show.network ? '[' + element.show.network.country.code + ']' : ''
            }`;

            const listItem = new Element('li', this.listResult, 'searchSeries__list-item', text, element.show.id);
            listItem.createElement();
          });

          const tvSerierToPick = [...document.querySelectorAll('.searchSeries__list-item')];

          //pobiera id wybranego serialu
          tvSerierToPick.forEach(el => {
            el.addEventListener('click', () => {
              const idTvSeries = el.getAttribute('date-id');
              this.showPickTvSeries(idTvSeries);
            });
          });
        } else {
          const idTvSeries = resp[0].show.id;
          this.showPickTvSeries(idTvSeries);
        }
      } else {
        this.containerResult.textContent = "We can't find your TV series :( Try again!";
      }
    });
  }
}
