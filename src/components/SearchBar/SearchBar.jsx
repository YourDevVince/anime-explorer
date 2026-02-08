import './SearchBar.css';

export default function SearchBar({ value, onChange, onSubmit, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Main decides what to do with the current value
  };

  return (
    <form onSubmit={handleSubmit} className='search'>
      <input
        className='search__input'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Search anime...'
        name='search'
        autoComplete='off'
      />
      <button className='search__btn' type='submit' disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
