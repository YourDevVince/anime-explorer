import { useEffect } from 'react';
import './ItemModal.css';
import closeIcon from '../../assets/close.svg';

function ItemModal({ isOpen, item, onClose, onToggleFavorite, isFavorited }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen || !item) return null;

  const title = item.title_english || item.title || 'Untitled';
  const imageUrl =
    item.img ||
    item.images?.jpg?.image_url ||
    item.images?.webp?.image_url ||
    '';
  const synopsis = item.synopsis || 'No synopsis available.';

  return (
    <div
      className={`modal ${isOpen ? 'modal_opened' : ''}`}
      onMouseDown={handleOverlayMouseDown}
    >
      <div className='modal__content modal__content_type_image'>
        <button
          type='button'
          className='modal__close'
          onClick={onClose}
          aria-label='Close'
        >
          <img src={closeIcon} alt='a close icon' />
        </button>

        <div className='modal__image-wrap'>
          {imageUrl ? (
            <img src={imageUrl} alt={title} className='modal__image' />
          ) : (
            <div className='modal__image-placeholder'>No image available</div>
          )}
        </div>

        <div className='modal__footer'>
          <div className='modal__text'>
            <h2 className='modal__caption'>{title}</h2>
            <p className='modal__synopsis'>{synopsis}</p>
          </div>

          <button
            type='button'
            className={`modal__favorite ${isFavorited ? 'modal__favorite_active' : ''}`}
            onClick={() => onToggleFavorite(item)}
          >
            {isFavorited ? 'Unfavorite' : 'Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
