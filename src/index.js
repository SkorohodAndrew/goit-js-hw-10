import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onChangeHandler, DEBOUNCE_DELAY));

function onChangeHandler(e) {
  const searchValue = e.target.value.trim();
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';

  if (searchValue) {
    fetchCountries(searchValue)
      .then(result => {
        if (result.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        renderingHtml(result);
      })
      .catch(err => {
        Notify.failure('Oops, there is no country with that name.');
        console.log(`Something wrong... ${err}`);
      });
  }
}

function renderingHtml(countriesData) {
  if (countriesData.length <= 10 && countriesData.length >= 2) {
    countryList.insertAdjacentHTML(
      'afterbegin',
      createMarkupCountyList(countriesData)
    );
    return;
  }
  if (countriesData.length === 1) {
    countryList.insertAdjacentHTML(
      'afterbegin',
      createMarkupCountyList(countriesData, true)
    );
    countryInfo.insertAdjacentHTML(
      'afterbegin',
      createMarkupCountyInfo(countriesData)
    );
    return;
  }
}

function createMarkupCountyList(countriesData, isSingle = false) {
  return countriesData
    .map(({ name, flags }) => {
      return `<li class='country-item ${
        isSingle ? 'country-item--single' : null
      }'><img class='country-flag ${
        isSingle ? 'country-flag--single' : null
      }' src='${flags.svg}'/>${name.official}</li>`;
    })
    .join(' ');
}

function createMarkupCountyInfo(countriesData) {
  const capitalStr = countriesData[0].capital.join(', ');
  const population = countriesData[0].population;
  const languagesStr = Object.values(countriesData[0].languages).join(', ');
  return `<p class='country-description'><span class='description-label'>Capital:</span>${capitalStr}</p><p class='country-description'><span class='description-label'>Population:</span>${population}</p><p class='country-description'><span class='description-label'>Languages:</span>${languagesStr}</p>`;
}
