import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ArrowCircleLeft, ListMagnifyingGlass, UserCircle } from '@phosphor-icons/react';
// import TitleHeader from './TitleHeader';
import SearchBar from './SearchBar';
import headerContext from '../context/Contexts/headerContext';
import styles from './styles/Header.module.css';
import logo from '../images/logo.svg';
import searchContext from '../context/Contexts/searchContext';

const doneRecipesText = '/done-recipes';
const favoriteRecipesText = '/favorite-recipes';

export default function Header() {
  const { pageUrl, setPageUrl } = useContext(headerContext);
  const { setIsSearch } = useContext(searchContext);
  const [search, setSearch] = useState(false);

  const history = useHistory();
  const page = history.location.pathname;

  useEffect(() => {}, [pageUrl]);

  const handleGoBackPage = () => {
    const regexGetBarOnUrlPage = /\/+/g;
    const barsOnUrlPage = pageUrl.match(regexGetBarOnUrlPage);
    const numOfBarsOnUrlPage = barsOnUrlPage.length;

    if (pageUrl === '/mealOrDrinkDoneDetails') setPageUrl(doneRecipesText);
    if (pageUrl === '/mealOrDrinkFavoriteDetails') setPageUrl(favoriteRecipesText);

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
      <>
        <header className={ styles.header }>
          {
            (pageUrl === '/profile' || pageUrl === doneRecipesText
              || pageUrl === favoriteRecipesText)
                && (<div className={ styles.contentNoGoBack } />)
          }
          {
            (pageUrl !== '/meals' && pageUrl !== '/drinks' && pageUrl !== '/profile'
            && pageUrl !== doneRecipesText && pageUrl !== favoriteRecipesText)
            && (
              <button
                type="button"
                className={ styles.btnHeader }
                onClick={ handleGoBackPage }
              >
                <ArrowCircleLeft
                  size={ 38 }
                />
              </button>)
          }
          {
            (pageUrl === '/meals' || pageUrl === '/drinks') && (
              <button
                className={ search ? styles.searchActive : styles.btnHeader }
                onClick={ () => (search ? setSearch(false) : setSearch(true)) }
              >
                <ListMagnifyingGlass
                  data-testid="search-top-btn"
                  size={ 38 }
                  weight={ search ? 'fill' : 'regular' }
                />
              </button>)
          }
          <Link
            onClick={ () => setIsSearch(false) }
            to="/meals"
          >
            <img
              className={ styles.logo }
              src={ logo }
              alt="Desenho de campainha alaranjada com um coração vermelho"
            />
          </Link>

          <button
            className={ styles.btnHeader }
            onClick={ handleOnClikPageProfile }
          >
            <UserCircle
              data-testid="profile-top-btn"
              size={ 38 }
            />
          </button>
          {/* <div>
          <TitleHeader />
        </div> */}
        </header>
        {
          search && (
            <SearchBar setSearch={ setSearch } />
          )
        }
      </>
    );
  }
}
