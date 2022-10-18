import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

let inputVal = '';

const refs = {
    inputRef: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info')
}

const handleSubmit = e => {
    e.preventDefault();
    inputVal = e.target.value.trim().toLowerCase();
    
    if (!inputVal) {
        return;
    }
    fetchCountries(inputVal)
     .then(data => {    
         if (data.length === 1) {
             fullMarkup(data);
         }
         else if (data.length > 2 && data.length < 10) {
             previuwMarkup(data);
         }
         else if (data.length > 10) {
             Notify.failure ("Oops, there is no country with that name");
         }
     });
}

refs.inputRef.addEventListener('input', handleSubmit);

function createMarkup({ flags, name }) {
  return `<li class="country-list__item">
      <img
        class="country-list__flag"
        src="${flags.svg}"
        width="30px"
        height="20px"
      />
      <p class="country-list__name">${name.official}</p>
    </li>`;
}

function createFullMarkup({ flags, name, capital, population, languages }) {
    const langStr = Object.values(languages).join(',');
    return `<div class = "country-info"> 
    <ul class="country-list">
     <li class="country-list__item">
      <p class = "country-list__name">Столиця: ${name.official} </p>
      </li>
      <li class="country-list__item">
        <img class="country-list__flag"
        src="${flags.svg}" alt="Прапор країни" >
      </li>
      <li class="country-list__item">
      <p class = "country-list__capital">Столиця: ${capital} </p>
      </li>
      <li class="country-list__item">
      <p class = "country-list__population">Населення: ${population} </p>
      </li>
      <li class="country-list__item">
      <p class = "country-list__languages">Мова: ${langStr} </p>
      </li>
    </ul>
</div>`
}

function previuwMarkup(data) {
    const markup = data.map(createMarkup).join('');
    refs.list.innerHTML = markup;
}

function fullMarkup(data) {
    const markup = data.map(createFullMarkup).join('');
    refs.info.innerHTML = markup;
}

 