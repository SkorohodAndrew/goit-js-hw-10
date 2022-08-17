const URL = 'https://restcountries.com/v3.1/name';
const searchEl = [
  'name',
  'capital',
  'population',
  'flags',
  'flags',
  'languages',
];

export const fetchCountries = name => {
  return fetch(`${URL}/${name}?${searchEl}`).then(r => {
    if (r.status === 200) {
      return r.json();
    }
    if (r.status === 404) {
      return Promise.reject('not found');
    }
  });
};
