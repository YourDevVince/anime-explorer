import { Routes, Route } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import './App.css';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Favorites from './components/Favorites/Favorites';
import Footer from './components/Footer/Footer';
import ItemModal from './components/ItemModal/ItemModal';

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

  // modal state
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  const isFavorited = useMemo(() => {
    if (!selectedItem) return false;
    const key = selectedItem.mal_id ?? selectedItem.id;
    return favorites.some((fav) => (fav.mal_id ?? fav.id) === key);
  }, [favorites, selectedItem]);

  return (
    <div className='app'>
      <div className='app__content'>
        <Header />

        <Routes>
          <Route
            path='/'
            element={
              <Main
                favoritesItems={favorites}
                onCardLike={toggleFavorite}
                onCardClick={openModal}
              />
            }
          />
          <Route
            path='/favorites'
            element={
              <Favorites
                favoritesItems={favorites}
                onCardLike={toggleFavorite}
                onCardClick={openModal}
              />
            }
          />
        </Routes>

        <Footer />
      </div>

      <ItemModal
        isOpen={Boolean(selectedItem)}
        item={selectedItem}
        onClose={closeModal}
        onToggleFavorite={toggleFavorite}
        isFavorited={isFavorited}
      />
    </div>
  );
}

export default App;
