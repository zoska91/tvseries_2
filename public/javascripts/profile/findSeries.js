const findBtn = document.querySelector('.searchSeries__button');
const findForm = document.querySelector('.searchSeries__form');
const findInput = document.querySelector('.searchSeries__input');
const searchSeries = document.querySelector('.searchSeries');

findForm.addEventListener('submit', event => {
  event.preventDefault();

  //pobranie szukanej wartości
  const title = findInput.value;

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
  const titleList = new TvSeries(title);
  titleList.showResultSearch();

  findInput.value = '';
});
