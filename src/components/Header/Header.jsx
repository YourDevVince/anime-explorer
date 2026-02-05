import './Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
        <NavLink to='/' className='header__logo-link'>
          <h1 className='header__logo'>Anime Explorer</h1>
        </NavLink>

        <nav className='header__nav-container' aria-label='Primary'>
          <NavLink to='/favorites' className='header__nav-link'>
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
