const apiKey = "bf6646e1"; // replace with your OMDb API key
const categories = ["action", "comedy", "horror", "romance", "drama", "sci-fi"];
let pages = {}; // keeps track of current page for each category

async function fetchMovies(category, container) {
  try {
    const page = pages[category]; // current page
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${category}&type=movie&page=${page}`);
    const data = await res.json();

    if (data.Search) {
      data.Search.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.innerHTML = `
          <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
          <h4>${movie.Title}</h4>
          <p>${movie.Year}</p>
          <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">IMDb</a>
        `;
        container.appendChild(card);
      });
    } else {
      alert("No more movies found!");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

function init() {
  const root = document.getElementById("movies-root");

  categories.forEach(cat => {
    // start at page 1 for each category
    pages[cat] = 1;

    const section = document.createElement("div");
    section.classList.add("category-section");
    section.innerHTML = `
      <h2>${cat.toUpperCase()}</h2>
      <div class="movies-container" id="${cat}-movies"></div>
      <button class="load-btn" id="load-${cat}">Load More</button>
    `;
    root.appendChild(section);

    const container = document.getElementById(`${cat}-movies`);
    const loadBtn = document.getElementById(`load-${cat}`);

    // load first page immediately
    fetchMovies(cat, container);

    // load more on button click
    loadBtn.addEventListener("click", () => {
      pages[cat]++;
      fetchMovies(cat, container);
    });
  });
}

// wait for page to load before running JS
document.addEventListener("DOMContentLoaded", init);


















