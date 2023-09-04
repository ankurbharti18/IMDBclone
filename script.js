const apiKey = 'e55e13d2';
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const favoritesList = document.getElementById('favoritesList');

let favorites = [];

// Function to fetch movie data from OMDB API
async function searchMovie() {
    const searchTerm = searchInput.value;
    if (!searchTerm) return;

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`);
        const data = await response.json();

        if (data.Search) {
            displaySearchResults(data.Search);
        } else {
            searchResults.innerHTML = '<p>No results found</p>';
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to display search results
function displaySearchResults(results) {
    searchResults.innerHTML = '';
    results.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('card', 'mb-3');

        const image = document.createElement('img');
        image.classList.add('card-img-top');
        image.src = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'; // Use a placeholder image if no poster is available

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = movie.Title;

        const year = document.createElement('p');
        year.classList.add('card-text');
        year.textContent = `Year: ${movie.Year}`;

        const favoriteButton = document.createElement('button');
        favoriteButton.classList.add('btn', 'btn-primary');
        favoriteButton.textContent = 'Add to Favorites';
        favoriteButton.addEventListener('click', () => addToFavorites(movie));

        cardBody.appendChild(title);
        cardBody.appendChild(year);
        cardBody.appendChild(favoriteButton);

        movieCard.appendChild(image);
        movieCard.appendChild(cardBody);

        searchResults.appendChild(movieCard);
    });
}

// Function to add a movie to favorites
function addToFavorites(movie) {
    favorites.push(movie);
    displayFavorites();
}

// Function to display favorite movies
function displayFavorites() {
    favoritesList.innerHTML = '';
    favorites.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `${movie.Title} (${movie.Year})`;

        const removeButton = document.createElement('button');
        removeButton.classList.add('btn', 'btn-danger', 'float-right');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFromFavorites(movie));

        listItem.appendChild(removeButton);
        favoritesList.appendChild(listItem);
    });
}

// Function to remove a movie from favorites
function removeFromFavorites(movie) {
    favorites = favorites.filter(fav => fav !== movie);
    displayFavorites();
}

searchButton.addEventListener('click', searchMovie);
