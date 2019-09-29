const Element = require('./Element');
const SearchTvSeries = require('./SearchTvSeries');

const findBtn = document.querySelector('.searchSeries__button');
const findForm = document.querySelector('.searchSeries__form');
const findInput = document.querySelector('.searchSeries__input');
const searchSeries = document.querySelector('.searchSeries');
const userSeries = document.querySelector('.userSeries');

findForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!findInput.value) return; //zakończ jeśli pole puste

  //pobranie szukanej wartości
  const title = findInput.value;

  //skasowanie userSeries
  if (userSeries) userSeries.classList.add('off');

  // stworzenie nowego kontenera - jeśli jest wyczyszczenie go
  if (!document.querySelector('.searchSeries__container-result')) {
    const containerResult = new Element('div', searchSeries, 'searchSeries__container-result');
    containerResult.createElement();
  } else {
    document.querySelector('.searchSeries__container-result').innerHTML = '';
  }

  //stowrzenie kontenera ul na liste

  const containerResultParent = document.querySelector('.searchSeries__container-result');
  const listResult = new Element('ul', containerResultParent, 'searchSeries__list-result');
  listResult.createElement();

  //pobranie wyników wyszukiwania
  const titleList = new SearchTvSeries(title);
  titleList.showResultSearch();

  findInput.value = '';
});
