// OMDb API integration
// Docs: http://www.omdbapi.com/
// You need an API key from http://www.omdbapi.com/apikey.aspx

const OMDB_API_URL = 'http://localhost:3003/api';
const OMDB_API_KEY = 'f655a5cd'; // Replace with your OMDb API key

/**
 * Fetch movie data by title
 * @param {string} title - Movie title to search
 * @returns {Promise<Object>} Movie data or error
 */
export async function fetchMovieByTitle(title) {
    const url = `${OMDB_API_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        return { error: error.message };
    }
}

/**
 * Fetch movies by search term
 * @param {string} search - Search term
 * @returns {Promise<Object>} Search results or error
 */
export async function searchMovies(search) {
    const url = `${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(search)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        return { error: error.message };
    }
}
