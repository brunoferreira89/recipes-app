import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import userIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
// import TitleHeader from './TitleHeader';
import SearchBar from './SearchBar';
import headerContext from '../context/Contexts/headerContext';

export default function Header() {
  const { pageUrl, setPageUrl } = useContext(headerContext);
  const [search, setSearch] = useState(false);

  const history = useHistory();
  const page = history.location.pathname;

  useEffect(() => {}, [pageUrl]);

  const handleGoBackPage = () => {
    const regexGetBarOnUrlPage = /\/+/g;
    const barsOnUrlPage = pageUrl.match(regexGetBarOnUrlPage);
    const numOfBarsOnUrlPage = barsOnUrlPage.length;

    if (pageUrl === '/mealOrDrinkDoneDetails') setPageUrl('/done-recipes');
    if (pageUrl === '/mealOrDrinkFavoriteDetails') setPageUrl('/favorite-recipes');

    if (numOfBarsOnUrlPage === 2 || pageUrl === '/profile') setPageUrl('/meals');
    if (numOfBarsOnUrlPage > 2) {
      const newPage = pageUrl.replace('/in-progress', '');
      setPageUrl(newPage);
    }

    history.goBack();
  };

  const handleOnClikPageProfile = () => {
    setPageUrl('/profile');
    history.push('/profile');
  };

  if (page !== '/') {
    return (
      <section>
        {
          (pageUrl !== '/meals' && pageUrl !== '/drinks'
            && pageUrl !== '/done-recipes' && pageUrl !== '/favorite-recipes')
            && (
              <button type="button" onClick={ handleGoBackPage }>
                Go Back
              </button>)
        }
        {
          (pageUrl === '/meals' || pageUrl === '/drinks') && (
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
