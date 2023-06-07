import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import userIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import TitleHeader from './TitleHeader';
import SearchBar from './SearchBar';
import headerContext from '../context/Contexts/headerContext';

export default function Header() {
  const { setPageUrl } = useContext(headerContext);
  const history = useHistory();
  const [search, setSearch] = useState(false);

  const page = history.location.pathname;

  const handleOnClikPageProfile = () => {
    history.push('/profile');
    setPageUrl('/profile');
  };

  if ((page !== '/') && (
    (page === '/meals') || (page === '/drinks') || (page === '/profile')
    || (page === '/done-recipes') || (page === '/favorite-recipes')
  )) {
    return (
      <section>
        {
          page.includes('profile') || page.includes('done-recipes')
            || page.includes('favorite-recipes') ? '' : (
              <button onClick={ () => (search ? setSearch(false) : setSearch(true)) }>
                <img
                  data-testid="search-top-btn"
                  src={ searchIcon }
                  alt="icone de pesquisa"
                />
              </button>
            )
        }
        <button onClick={ handleOnClikPageProfile }>
          <img data-testid="profile-top-btn" src={ userIcon } alt="icone de usuario" />
        </button>
        <div>
          <TitleHeader />
        </div>
        {
          search && (
            <SearchBar />
          )
        }
      </section>
    );
  }
}
