const moviesContainerEl = document.getElementById("movies-container");
const emptyStateEl = document.getElementById("empty-state");

// Load watchlist from localStorage
function loadWatchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (watchlist.length === 0) {
    emptyStateEl.style.display = "block";
    return;
  }

  emptyStateEl.style.display = "none";
  renderWatchlist(watchlist);
}

function renderWatchlist(movies) {
  moviesContainerEl.innerHTML = "";

  for (let movie of movies) {
    let movieItem = `
      <div class="movie-item">
        <img src="${movie.Poster}" alt="${movie.Title} Poster" class="movie-poster">
        <div class="movie-info">
          <p class="movie-title">${movie.Title} <span><i class="fa-solid fa-star"></i> ${movie.imdbRating}</span></p>
          <div class="movie-details">
            <span class="movie-runtime">${movie.Runtime}</span>
            <span class="movie-genre">${movie.Genre}</span>
            <span class="movie-remove">
              <i class="fa-solid fa-circle-minus" data-imdb-id="${movie.imdbID}"></i>
              Remove
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

// Remove movie from watchlist
document.addEventListener("click", (event) => {
  if (event.target.closest(".movie-remove")) {
    const imdbId =
      event.target.dataset.imdbId ||
      event.target.closest(".movie-remove").querySelector("i").dataset.imdbId;
    removeFromWatchlist(imdbId);
  }
});

function removeFromWatchlist(imdbId) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const movieToRemove = watchlist.find((movie) => movie.imdbID === imdbId);

  watchlist = watchlist.filter((movie) => movie.imdbID !== imdbId);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));

  if (movieToRemove) {
    alert(`${movieToRemove.Title} has been removed from your watchlist!`);
  }

  loadWatchlist();
}

// Load watchlist when page loads
loadWatchlist();
