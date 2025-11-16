// Módulo para consumir FastAPI (SQLite) - Noticias
const NEWS_API_BASE = 'http://192.168.100.26:8000';

// Top noticias (usa endpoint propio /news/top/stories)
export async function getTopNews(category = 'technology', limit = 10) {
    try {
        const response = await fetch(`${NEWS_API_BASE}/news/top/stories?limit=10`);
        if (!response.ok) throw new Error('Error al obtener noticias');
        const data = await response.json();
        
        return {
            articles: data.articles.map(article => ({
                title: article.title,
                description: article.description,
                urlToImage: article.urlToImage,
                url: article.url,
                publishedAt: article.publishedAt,
                source: article.source || 'InfoMóvil News'
            }))
        };
    } catch (error) {
        console.error('Error fetching news:', error);
        return { articles: [] };
    }
}

export async function searchNews(query, category = 'technology') {
    try {
        const params = new URLSearchParams({ limit: '10' });
        if (category) params.append('category', category);
        
        const response = await fetch(`${NEWS_API_BASE}/news?${params}`);
        if (!response.ok) throw new Error('Error al buscar noticias');
        const data = await response.json();
        
        return {
            articles: data.articles.map(article => ({
                title: article.title,
                description: article.description,
                urlToImage: article.urlToImage,
                url: article.url,
                publishedAt: article.publishedAt,
                source: article.source || 'InfoMóvil News'
            }))
        };
    } catch (error) {
        console.error('Error searching news:', error);
        return { articles: [] };
    }
}