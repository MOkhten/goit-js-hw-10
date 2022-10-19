import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import { createMarkup } from './createMarkup';
import { createFullMarkup } from './createMarkup';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

let inputVal = '';

const refs = {
    inputRef: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info')
}

const handleSubmit = e => {
    e.preventDefault();
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
    inputVal = e.target.value.trim().toLowerCase();
    
    if (!inputVal) {
        return;
    }
    
    fetchCountries(inputVal)
     .then(data => {    
         if (data.length === 1) {
             fullMarkup(data);
         }
         else if (data.length >= 2 && data.length <= 10) {
             previuwMarkup(data);
         }
         else if (data.length > 10) {
             Notify.info ("Too many matches found. Please enter a more specific name.");
         }
     }).catch(error => {
         Notify.failure("Oops, there is no country with that name")
     })
}

refs.inputRef.addEventListener('input', debounce(handleSubmit, DEBOUNCE_DELAY));


function previuwMarkup(data) {
    const markup = data.map(createMarkup).join('');
    refs.list.innerHTML = markup;
}

function fullMarkup(data) {
    const markup = data.map(createFullMarkup).join('');
    refs.info.innerHTML = markup;
}

 