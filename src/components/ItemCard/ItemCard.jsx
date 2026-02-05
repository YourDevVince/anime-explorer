import './ItemCard.css';

function ItemCard({ item, onCardLike, favoritesItems = [] }) {
  const itemKey = item.mal_id ?? item.id;

  const isLiked = favoritesItems.some(
    (fav) => (fav.mal_id ?? fav.id) === itemKey,
  );

  return (
    <li className='card'>
      <img
        src={item.images?.webp?.image_url || item.images?.jpg?.image_url}
        alt={item.title_english || item.title}
        className='card__image'
      />
      <div className='card__header'>
        <p className='card__name'>{item.title_english || item.title}</p>

        <button
          type='button'
          className={`card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`}
          onClick={() => onCardLike && onCardLike(item)}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
        />
      </div>
    </li>
  );
}

export default ItemCard;
