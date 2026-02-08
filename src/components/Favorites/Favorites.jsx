import './Favorites.css';
import FavoritesSection from '../FavoritesSection/FavoritesSection';

export default function Favorites({ favoritesItems, onCardLike, onCardClick }) {
  return (
    <div className='favorites'>
      <FavoritesSection
        favoritesItems={favoritesItems}
        onCardLike={onCardLike}
        onCardClick={onCardClick}
      />
    </div>
  );
}
