import React from 'react';
import "./FeaturedMovie.css";

const FeaturedMovie = ({ item }) => {
    console.log(item);

    let firstDate = new Date(item.first_air_date);

    let genres = [];

    const truncateOverview = (overview, wordLimit) => {
        const words = overview.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return overview;
    }

    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    return (
        <section
            className='featured'
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
            }}
        >
            <div className='featured--horizontal'>
                <div className='featured--vertical'>
                    <div className='featured--name'>
                        {item.original_name}
                    </div>
                    <div className='featured--info'>
                        <div className='featured--points'>
                            {item.vote_average.toFixed(2)} pontos
                        </div>
                        <div className='featured--year'>
                            {firstDate.getFullYear()}
                        </div>
                        <div className='featured--seasons'>
                            {item.number_of_seasons ? `${item.number_of_seasons} temporada${item.number_of_seasons !== 1 ? 's' : ''}` : ''}
                        </div>
                    </div>
                    <div className='featured--description'>
                        {truncateOverview(item.overview, 20)}
                    </div>
                    <div className='featured--buttons'>
                        <a href={`/watch/${item.id}`} className='featured--watchbutton'>► Assistir</a>
                        <a href={`/list/add/${item.id}`} className='featured--mylistbutton'>+ Minha Lista</a>
                    </div>
                    <div className='featured--genres'>
                        <strong>Gêneros:</strong> {genres.join(', ')}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturedMovie;
