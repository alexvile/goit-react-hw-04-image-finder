const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '28483362-313f04b4986d5508c9cd93d3a';
// const page = 2;

export function fetchImages(query, page) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Ups! Something went wrong'));
  });
}
