import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FavoritesSection.css';
import ItemCard from '../ItemCard/ItemCard';

const PAGE_SIZE = 3;

export default function FavoritesSection({ favoritesItems = [], onCardLike }) {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleFavorites = useMemo(
    () => favoritesItems.slice(0, visibleCount),
    [favoritesItems, visibleCount],
  );

  const canShowMore = visibleCount < favoritesItems.length;

  return (
    <main className='favorites-section'>
      <div className='favorites-section__header'>
        <button
          type='button'
          className='favorites-section__back-btn'
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h2 className='favorites-section__title'>Favorites</h2>
        <p className='favorites-section__count'>
          {favoritesItems.length} saved
        </p>
      </div>

      {favoritesItems.length === 0 ? (
        <p className='favorites-section__empty'>
          No favorites yet. Go like some anime!
        </p>
      ) : (
        <>
          <ul className='favorites-section__list'>
            {visibleFavorites.map((anime) => (
              <ItemCard
                key={anime.mal_id ?? anime.id ?? anime.title}
                item={anime}
                onCardLike={onCardLike}
                isFavorite
              />
            ))}
          </ul>

          <button
            type='button'
            className='favorites-section__more-btn'
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            disabled={!canShowMore}
          >
            {canShowMore ? 'More' : 'No more'}
          </button>
        </>
      )}
    </main>
  );
}
