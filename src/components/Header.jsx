import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import userIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
// import TitleHeader from './TitleHeader';
import SearchBar from './SearchBar';
import headerContext from '../context/Contexts/headerContext';

export default function Header() {
  const {
    pageUrl, setPageUrl, isGoBackAtive, setIsGoBackAtive,
  } = useContext(headerContext);
  const [search, setSearch] = useState(false);

  const history = useHistory();
  const page = history.location.pathname;

  useEffect(() => {
    console.log(pageUrl);
  }, [pageUrl]);

  const handleGoBackPage = () => {
    history.goBack();
    if (pageUrl === '/meals' || pageUrl === '/drinks') {
      setIsGoBackAtive(true);
    } else {
      setPageUrl('/meals');
      setIsGoBackAtive(false);
    }
  };

  const handleOnClikPageProfile = () => {
    history.push('/profile');
  };

  if (page !== '/') {
    return (
      <section>
        {
          isGoBackAtive && (
            <button type="button" onClick={ handleGoBackPage }>
              Go Back
            </button>
          )
        }
        {
          page.includes('profile') || page.includes('done-recipes')
          || page.includes('favorite-recipes') ? ''
            : (
              <button
                onClick={ () => (search ? setSearch(false) : setSearch(true)) }
              >
                <img
                  data-testid="search-top-btn"
                  src={ searchIcon }
                  alt="icone de pesquisa"
                />
              </button>)
        }
        <button onClick={ handleOnClikPageProfile }>
          <img data-testid="profile-top-btn" src={ userIcon } alt="icone de usuario" />
        </button>
        {/* <div>
          <TitleHeader />
        </div> */}
        {
          search && (
            <SearchBar />
          )
        }
      </section>
    );
  }
}
