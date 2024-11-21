const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=466ef338446928731e86da2978827c56&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=466ef338446928731e86da2978827c56&query=";

const search = document.getElementById("search");
const moviesContainer = document.getElementById("movies-container");
const spinner = document.getElementById("spinner");
const inputContainer = document.getElementById("input-container");

let movies = [];

const getMovies = async () => {
  const res = await fetch(APIURL);
  const data = await res.json();

  movies = data.results;

  displayMovie(movies);
  spinner.classList.add("d-none");
};

const displayMovie = (lists) => {
  moviesContainer.innerHTML = "";
  lists.forEach((item) => {
    const col = document.createElement("col");
    col.classList.add("col");

    col.innerHTML = `
      <div class="card" style="width: 18rem">
                <img
                  src="${IMGPATH}${item.poster_path}"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">${item.original_title}</h5>
                  <p class="card-text text-truncate">
                    ${item.overview}
                  </p>
                  <a href="#" class="btn btn-primary">Add to favorites</a>
                </div>
              </div>
    `;

    moviesContainer.appendChild(col);
  });
};

getMovies();

const searchMovie = async (query) => {
  const endPoint = SEARCHAPI + query;
  const res = await fetch(endPoint);
  const data = await res.json();

  movies = data.results;
  console.log(movies);
};

inputContainer.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  if (value.length <= 0) {
    displayMovie(movies);
    return;
  }

  searchMovie(value);
  const filteredMovies = movies.filter((movie) => {
    return (
      movie.original_title.toLowerCase().includes(value) ||
      movie.overview.toLowerCase().includes(value)
    );
  });

  moviesContainer.innerHTML = "";
  displayMovie(filteredMovies);
});
