const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=466ef338446928731e86da2978827c56&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=466ef338446928731e86da2978827c56&query=";

let movies = [];

const getMovies = async () => {
  const res = await fetch(APIURL);
  const data = await res.json();

  movies = data.results;
  console.log(data.results);
  return movies;
};

const displayMovie = (lists) => {\
    lists.fo
};

window.addEventListener("load", getMovies);
