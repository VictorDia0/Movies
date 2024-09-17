import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Carregar a lista total de filmes/séries
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Selecionar filme/série em destaque
      let originals = list.filter(i => i.slug === 'originals');
      if (originals.length > 0 && originals[0].items.results.length > 0) {
        let randomChosen = Math.floor(Math.random() * originals[0].items.results.length);
        let chosen = originals[0].items.results[randomChosen];

        // Obter informações detalhadas do filme/série em destaque
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
        setFeaturedData(chosenInfo); // Armazenar as informações detalhadas no estado
      }
    }


    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 100) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className='page'>
      <Header black={blackHeader} />
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        <p>Feito com por Victor Dias</p>
        <p>Dados pegos do The Movie Database</p>
      </footer>
      {movieList.length <= 0 &&
        <div className='loading'>
          <img src='https://blog.motionisland.com/wp-content/uploads/2022/03/Loading_1.gif' alt='carregando' />
        </div>
      }
    </div>
  )
}

export default App;
