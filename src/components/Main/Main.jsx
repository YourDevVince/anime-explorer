import { useMemo, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ItemCard from '../ItemCard/ItemCard';
import { searchAnime } from '../../utils/animeApi';

const PAGE_SIZE = 3;

export default function Main({ favoritesItems = [], onCardLike, onCardClick }) {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const visibleResults = useMemo(
    () => results.slice(0, visibleCount),
    [results, visibleCount],
  );

  const canShowMore = visibleCount < results.length;

  const handleSearchSubmit = async () => {
    const q = searchInput.trim();
    if (!q) return;

    setIsLoading(true);
    setError('');
    setVisibleCount(PAGE_SIZE);

    try {
      const data = await searchAnime({ q, limit: 24, page: 1 });
      const items = data?.data || [];

      setResults(items);

      if (items.length === 0) {
        setError('Nothing found');
      }
    } catch (e) {
      setResults([]);
      setError(
        'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='main'>
      <SearchBar
        value={searchInput}
        onChange={setSearchInput}
        onSubmit={handleSearchSubmit}
        isLoading={isLoading}
      />

      {isLoading && <div className='preloader'>Searching for anime...</div>}
      {/* ill remove this later  */}
      {!isLoading && error && <p className='main__message'>{error}</p>}

      {!isLoading && !error && (
        <>
          <ul className='cards__list'>
            {visibleResults.map((anime) => (
              <ItemCard
                key={anime.mal_id}
                item={anime}
                favoritesItems={favoritesItems}
                onCardLike={onCardLike}
                onCardClick={onCardClick}
              />
            ))}
          </ul>

          {results.length > 3 && (
            <button
              type='button'
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              disabled={!canShowMore}
            >
              {canShowMore ? 'More' : 'No more'}
            </button>
          )}
        </>
      )}
    </main>
  );
}
