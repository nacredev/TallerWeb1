// Módulo para consumir NestJS API (PostgreSQL) - Películas
const MOVIES_API_BASE = 'http://192.168.100.26:3001';

/**
 * Fetch movie data by title
 * @param {string} title - Movie title to search
 * @returns {Promise<Object>} Movie data or error
 */
export async function fetchMovieByTitle(title) {
    try {
        const response = await fetch(`${MOVIES_API_BASE}/movies/title?t=${encodeURIComponent(title)}`);
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
    try {
        const response = await fetch(`${MOVIES_API_BASE}/movies/search?s=${encodeURIComponent(search)}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        // La API devuelve {Search: [...], totalResults: "..."}
        const movies = data.Search || [];
        return {
            Response: movies.length > 0 ? 'True' : 'False',
            Search: movies.map(movie => ({
                Title: movie.Title,
                Year: movie.Year,
                imdbID: movie.imdbID,
                Type: movie.Type,
                Poster: movie.Poster,
                Genre: movie.Genre
            }))
        };
    } catch (error) {
        return { Response: 'False', Error: error.message };
    }
}
