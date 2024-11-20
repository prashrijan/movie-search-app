const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=466ef338446928731e86da2978827c56&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=466ef338446928731e86da2978827c56&query=";

fetch(APIURL)
  .then((res) => res.json())
  .then((data) => console.log(data.results));
