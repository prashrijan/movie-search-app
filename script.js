const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=466ef338446928731e86da2978827c56&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=466ef338446928731e86da2978827c56&query=";

const search = document.getElementById("search");
const moviesContainer = document.getElementById("movies-container");
const spinner = document.getElementById("spinner");
const inputContainer = document.getElementById("input-container");
const favBtn = document.getElementById("fav");
const favoritesContainer = document.getElementById("favorites-container");
const main = document.getElementById("main");
const favs = document.getElementById("favs");

let movies = [];
let favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];

// Show Favorites Container
favBtn.addEventListener("click", () => {
  main.classList.add("d-none");
  favs.classList.remove("d-none");
  displayFavorites();
});

// Add to Favorites
const addToFavorites = (movie) => {
  if (!favoriteMovies.find((fav) => fav.id === movie.id)) {
    favoriteMovies.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
    displayFavorites();
  }
};

// Display Favorites
const displayFavorites = () => {
  favoritesContainer.innerHTML = "";
  favoriteMovies.forEach((movie) => {
    const col = document.createElement("div");
    col.classList.add("col");

    col.innerHTML = `
      <div class="card" style="width: 18rem">
        <img
          src="${IMGPATH}${movie.poster_path}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${movie.original_title}</h5>
          <p class="card-text text-truncate">
            ${movie.overview}
          </p>
        </div>
      </div>
    `;

    favoritesContainer.appendChild(col);
  });
};

// Fetch and Display Movies
const getMovies = async () => {
  const res = await fetch(APIURL);
  const data = await res.json();

  movies = data.results;
  displayMovie(movies);
  spinner.classList.add("d-none");
};

// Display Movies
const displayMovie = (lists) => {
  moviesContainer.innerHTML = "";
  lists.forEach((movie) => {
    const col = document.createElement("div");
    col.classList.add("col");

    col.innerHTML = `
      <div class="card" style="width: 18rem">
        <img
          src="${IMGPATH}${movie.poster_path}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${movie.original_title}</h5>
          <p class="card-text text-truncate">
            ${movie.overview}
          </p>
          <button class="btn btn-primary" data-id="${movie.id}">Add to Favorites</button>
        </div>
      </div>
    `;

    moviesContainer.appendChild(col);

    // Add Event Listener for Adding to Favorites
    col
      .querySelector("button")
      .addEventListener("click", () => addToFavorites(movie));
  });
};

// Search Movie
const searchMovie = async (query) => {
  const res = await fetch(SEARCHAPI + query);
  const data = await res.json();
  return data.results;
};

// Handle Input Search
inputContainer.addEventListener("input", async (e) => {
  const value = e.target.value.toLowerCase();

  if (!value) {
    displayMovie(movies);
    return;
  }

  const searchResults = await searchMovie(value);
  const filteredMovies = searchResults.filter(
    (movie) =>
      movie.original_title.toLowerCase().includes(value) ||
      movie.overview.toLowerCase().includes(value)
  );

  displayMovie(filteredMovies);
});

// Initialize App
getMovies();
displayFavorites();
