import { useMemo, useState } from 'react';

import './Main.css';
import SearchBar from '../SearchBar/SearchBar';
import ItemCard from '../ItemCard/ItemCard';
import { searchAnime } from '../../utils/animeApi';
import Preloader from '../Preloader/Preloader';

const PAGE_SIZE = 3;

export default function Main({ favoritesItems = [], onCardLike, onCardClick }) {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const visibleResults = useMemo(
    () => results.slice(0, visibleCount),
    [results, visibleCount],
  );

  const canShowMore = visibleCount < results.length;

  const handleSearchSubmit = async () => {
    const query = searchInput.trim();
    if (!query) return;

    setIsLoading(true);

    setVisibleCount(PAGE_SIZE);

    try {
      const data = await searchAnime({ q: query, limit: 24, page: 1 });
      const items = data?.data || [];

      setResults(items);

      if (items.length === 0) {
        throw new Error('Nothing found');
      }
    } catch (e) {
      setResults([]);
      console.error(
        'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((c) => c + PAGE_SIZE);
      setIsLoadingMore(false);
    }, 1000);
  };

  return (
    <main className='main'>
      <header className='main__header'>
        <h1 className='main__title'>Search for an anime</h1>
        <p className='main__subtext'>Just type in an anime below</p>
      </header>

      <SearchBar
        value={searchInput}
        onChange={setSearchInput}
        onSubmit={handleSearchSubmit}
        isLoading={isLoading}
      />

      {isLoading && visibleResults.length === 0 && <Preloader />}

      {(!isLoading || visibleResults.length > 0) && (
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

          {results.length > 3 && !isLoadingMore && (
            <button
              className='more-btn'
              type='button'
              onClick={handleLoadMore}
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
