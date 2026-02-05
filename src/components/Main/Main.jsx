import { useMemo, useState } from 'react';
import './Main.css';
import { defaultAnimeItems } from '../../utils/constants';
import ItemCard from '../ItemCard/ItemCard';

function Main({ favoritesItems = [], onCardLike }) {
  const [searchInput, setSearchInput] = useState('');

  const filteredAnimeItems = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    if (!q) return defaultAnimeItems;

    return defaultAnimeItems.filter((i) =>
      i.title_english?.toLowerCase().includes(q),
    );
  }, [searchInput]);

  return (
    <main className='main'>
      <div>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder='Search anime...'
        />
      </div>

      <section className='cards'>
        <p className='cards__text'>Found: {filteredAnimeItems.length}</p>
        <ul className='cards__list'>
          {filteredAnimeItems.map((i) => (
            <ItemCard
              key={i.mal_id ?? i.title_english}
              item={i}
              favoritesItems={favoritesItems}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
