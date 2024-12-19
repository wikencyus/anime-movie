let page = 1;
let totalPages = 1; 
let lastSearchQuery = ''; 

const API_KEY = "63a40dcd0cbe620767ee84d1e129f35e";
const API_URL = () => `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;
const API_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_SEARCH_URL = (query) => `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  
  totalPages = data.total_pages; 
  showMovies(data.results);
}

function updatePage() {
  const url = lastSearchQuery 
    ? API_SEARCH_URL(lastSearchQuery) 
    : API_URL();
  getMovies(url);
  currentPage.innerHTML = page;
}

function nextPage() {
  if (page < totalPages) { 
    page += 1;
    updatePage();
  }
}

function prevPage() {
  if (page > 1) {
    page -= 1;
    updatePage();
  }
}

next.addEventListener("click", () => {
  nextPage();
});

prev.addEventListener("click", () => {
  prevPage();
});

function showMovies(movies) {
  moviesElement.innerHTML = '';
  movies.forEach((movie) => {
    const { title, poster_path, overview } = movie;
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie");
    
    movieCard.innerHTML = `
      <img src="${API_BASE_URL + poster_path}" alt="html the movie"/>
      <div class="detail">
        <h3>${title}</h3>
        <p>${overview.substring(0, 100)}...</p>
      </div>
    `;
    moviesElement.appendChild(movieCard);
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchQuery = search.value.trim();
  
  if (searchQuery !== '') {
    lastSearchQuery = searchQuery; 
    page = 1; 
    getMovies(API_SEARCH_URL(lastSearchQuery));
    search.value = '';
  }
});

getMovies(API_URL());
updatePage();

title.addEventListener('click', () => {
  location.reload();
});