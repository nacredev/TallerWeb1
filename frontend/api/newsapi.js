// Módulo para consumir la API de Noticias propia (FastAPI)
const NEWS_API_BASE = 'http://localhost:8000';

// Top noticias (usa endpoint propio /news/top/stories)
export async function getTopNews(category = 'technology', limit = 10) {
    try {
        const url = `${NEWS_API_BASE}/news/top/stories?limit=${encodeURIComponent(limit)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al obtener noticias');
        const data = await res.json();

        // Normalizar por si cambian keys; el backend ya devuelve { articles: [...] }
        const articles = (data.articles || []).map((a) => ({
            title: a.title,
            description: a.description,
            urlToImage: a.urlToImage || './assets/img/movies-1.jpg',
            url: a.url,
            publishedAt: a.publishedAt,
            source: a.source,
            author: a.author,
        }));
        return { articles };
    } catch (error) {
        console.error('Error fetching news:', error);
        return { articles: [] };
    }
}

// Búsqueda/filtrado simple por categoría usando /news?category=
export async function searchNews(query, limit = 10, offset = 0) {
    try {
        const params = new URLSearchParams();
        params.set('limit', String(limit));
        params.set('offset', String(offset));
        if (query && query.trim()) params.set('category', query.trim());
        const res = await fetch(`${NEWS_API_BASE}/news?${params.toString()}`);
        if (!res.ok) throw new Error('Error al buscar noticias');
        const data = await res.json();
        const articles = (data.articles || []).map((a) => ({
            title: a.title,
            description: a.description,
            urlToImage: a.urlToImage || './assets/img/movies-1.jpg',
            url: a.url,
            publishedAt: a.publishedAt,
            source: a.source,
            author: a.author,
        }));
        return { articles };
    } catch (error) {
        console.error('Error searching news:', error);
        return { articles: [] };
    }
}