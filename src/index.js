import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const refs = {
  searshForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.searshForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const valueSearch = e.currentTarget.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  if (valueSearch) {
    fetchCountries(valueSearch)
      .then(result => {
        if (valueSearch.lenguage > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        vievsHtml(result);
      })
      .catch(err => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}
function vievsHtml(countrisData) {
  if (countrisData.length <= 10 && countrisData.length >= 2) {
    countryList.insertAdjecentHTML('afterbegin');
  }
}
