import './Favorites.css';
import FavoritesSection from '../FavoritesSection/FavoritesSection';

export default function Favorites({ favoritesItems, onCardLike }) {
  return (
    <div className='favorites'>
      <FavoritesSection
        favoritesItems={favoritesItems}
        onCardLike={onCardLike}
      />
    </div>
  );
}
