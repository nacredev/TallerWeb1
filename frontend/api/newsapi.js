// Módulo para consumir API de HackerNews
const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0';

export async function getTopNews(category = 'technology') {
    try {
        // Obtener los IDs de las últimas historias
        const response = await fetch(`${HN_API_BASE}/topstories.json`);
        if (!response.ok) throw new Error('Error al obtener noticias');
        const storyIds = await response.json();
        
        // Obtener los detalles de las primeras 10 historias
        const stories = await Promise.all(
            storyIds.slice(0, 10).map(async id => {
                const storyResponse = await fetch(`${HN_API_BASE}/item/${id}.json`);
                return storyResponse.json();
            })
        );
        
        return {
            articles: stories.map(story => ({
                title: story.title,
                description: `Por ${story.by} - ${story.score} puntos - ${story.descendants || 0} comentarios`,
                urlToImage: 'https://news.ycombinator.com/y18.gif', // Logo de HN como placeholder
                url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
                publishedAt: new Date(story.time * 1000).toISOString(),
                source: 'Hacker News'
            }))
        };
    } catch (error) {
        console.error('Error fetching news:', error);
        return { articles: [] };
    }
}

export async function searchNews(query) {
    // Para simplificar, retornamos las mismas noticias principales
    return getTopNews();
}