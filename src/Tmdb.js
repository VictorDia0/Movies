const API_KEY = "4b50fc7ecd277b865e4d9fe51bb5722d";
const API_BASE = "https://api.themoviedb.org/3";

const basicFetch = async (endpoint) => {
    try {
        const req = await fetch(`${API_BASE}${endpoint}`);
        if (!req.ok) {
            throw new Error(`Failed to fetch ${endpoint}: ${req.statusText}`);
        }
        const json = await req.json();
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais da Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentário',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },
    getMovieInfo: async (id, type) => {
        let info = {};

        if (id) {
            switch (type) {
                case 'movie':
                    info = basicFetch(`/movie/${id}?language=pt-BR&api_key=${API_KEY}`);

                    break;
                case 'tv':
                    info = basicFetch(`/tv/${id}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                default:
                    break;
            }
        }

        return info;
    }
}
