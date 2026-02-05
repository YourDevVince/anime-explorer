import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Favorites from './components/Favorites/Favorites';
import Footer from './components/Footer/Footer';

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (anime) => {
    const key = anime.mal_id ?? anime.id;

    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some(
        (fav) => (fav.mal_id ?? fav.id) === key,
      );

      if (exists) {
        return prevFavorites.filter((fav) => (fav.mal_id ?? fav.id) !== key);
      }

      return [anime, ...prevFavorites];
    });
  };

  return (
    <div className='app'>
      <div className='app__content'>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <Main favoritesItems={favorites} onCardLike={toggleFavorite} />
            }
          />
          <Route
            path='/favorites'
            element={
              <Favorites
                favoritesItems={favorites}
                onCardLike={toggleFavorite}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
