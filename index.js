const formElement = document.getElementById("search-form");
const inputElement = document.getElementById("search-input");
const moviesContainerEl = document.getElementById("movies-container");
const moviesArrayForWatchList = [];

const apikey = "c906c7e9";

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  const inputValue = inputElement.value.trim();
  console.log(inputValue);

  moviesArrayForWatchList.length = 0;

  const response = await fetch(
    `http://www.omdbapi.com/?s=${encodeURIComponent(
      inputValue
    )}&apikey=${apikey}`
  );

  const data = await response.json();
  console.log(data);
  let imdbIds = [];

  for (let movie of data.Search) {
    imdbIds.push(movie.imdbID);
  }

  const moviesResponse = await getMoviesByIds(imdbIds);
  console.log(moviesResponse);

  moviesArrayForWatchList.push(...moviesResponse);

  renderMovies(moviesResponse);

  inputElement.value = "";
});

async function getMoviesByIds(imdbIds) {
  const responses = await Promise.all(
    imdbIds.map((id) =>
      fetch(`http://www.omdbapi.com/?i=${id}&apikey=${apikey}`).then(
        (response) => response.json()
      )
    )
  );
  return responses;
}

function renderMovies(movies) {
  moviesContainerEl.innerHTML = ""; // Clear previous results

  for (let movie of movies) {
    let movieItem = `
      <div class="movie-item">
        <img src="${movie.Poster}" alt="Sample Movie Poster" class="movie-poster">
        <div class="movie-info">
          <p class="movie-title">${movie.Title} <span><i class="fa-solid fa-star"></i> ${movie.imdbRating}</span></p>
          <div class="movie-details">
            <span class="movie-runtime">${movie.Runtime}</span>
            <span class="movie-genre">${movie.Genre}</span>
            <span class="movie-add">
              <i class="fa-solid fa-circle-plus" data-imdb-id="${movie.imdbID}"></i>
              Watchlist
            </span>
          </div>
          <p class="movie-description">
            ${movie.Plot}
          </p>
        </div>
      </div>
      <div class="divider"></div>
    `;
    moviesContainerEl.insertAdjacentHTML("beforeend", movieItem);
  }
}

document.addEventListener("click", (event) => {
  if (event.target.dataset.imdbId) {
    addToWatchList(event.target.dataset.imdbId);
  }
});

function addToWatchList(imdbId) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (watchlist.length > 0) {
    const movieToAdd = watchlist.filter((movie) => movie.imdbID === imdbId)[0];
    if (movieToAdd) {
      alert(`${movieToAdd.Title} is already in your watchlist!`);
      return;
    }
  }

  const movieToAdd = moviesArrayForWatchList.filter(
    (movie) => movie.imdbID === imdbId
  )[0];

  watchlist.push(movieToAdd);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  alert(`${movieToAdd.Title} has been added to your watchlist!`);
}
