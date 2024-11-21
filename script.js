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
const detailsContainer = document.getElementById("details-container");
const dets = document.getElementById("details");

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

// Rewmove From Favorites

const removeFromFavorites = (movie) => {
  favoriteMovies = favoriteMovies.filter((fav) => fav.id !== movie.id);
  localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
  displayFavorites();
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
           <button class="btn btn-primary">Remove From Favorties</button>
        </div>
      </div>
    `;

    col.querySelector("button").addEventListener("click", () => {
      removeFromFavorites(movie);
    });

    col.querySelector("img").addEventListener("click", () => {
      displayDetails(movie);
    });

    favoritesContainer.appendChild(col);
  });
};

// Display Details

const displayDetails = (movie) => {
  console.log(movie);
  main.classList.add("d-none");
  favs.classList.add("d-none");
  dets.classList.remove("d-none");

  detailsContainer.innerHTML = "";

  const detsCard = document.createElement("div");
  detsCard.innerHTML = `
    <div class="card mb-3" style="max-width: 900px">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src="${IMGPATH}${movie.poster_path}"
            class="img-fluid rounded-start"
            alt="${movie.original_title}"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${movie.original_title}</h5>
            <p class="card-text">
              ${movie.overview || "No description available."}
            </p>
            <p class="card-text">
              <strong>Release Date:</strong> ${movie.release_date || "N/A"}
            </p>
            <p class="card-text">
              <strong>Rating:</strong> ${movie.vote_average || "N/A"} / 10
            </p>
            <button class="btn btn-primary" id="back-to-main">Back to Movies</button>
            <button class="btn btn-primary favorites" data-id="${
              movie.id
            }">Add to Favorites</button>
          </div>
        </div>
      </div>
    </div>
  `;

  detailsContainer.appendChild(detsCard);

  // Back to Movies Event Listener
  document.getElementById("back-to-main").addEventListener("click", () => {
    dets.classList.add("d-none");
    main.classList.remove("d-none");
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

    // Add Event Listener for Showing Details
    col.querySelector("img").addEventListener("click", () => {
      displayDetails(movie);
    });
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
