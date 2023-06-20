import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FastFood, FastFoodOutline } from 'react-ionicons';
import { Brandy, CookingPot, Heart, ShareNetwork } from '@phosphor-icons/react';
import styles from './styles/FavoriteRecipes.module.css';
import useFilterButtons from '../helpers/useFilterButtons';
import headerContext from '../context/Contexts/headerContext';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const { setPageUrl } = useContext(headerContext);

  const {
    isLinkCopied,
    handleOnClickShareBtn,
  } = useFilterButtons();

  useEffect(() => {
    const getFavoriteOnStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavoriteOnStorage) setFavorites(getFavoriteOnStorage);
  }, []);

  const handleOnClickDesfavorBtn = (recipe) => {
    const updateStorage = [...favorites];
    updateStorage.splice(recipe, 1);
    setFavorites(updateStorage);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updateStorage));
  };

  const handleClickImage = () => {
    setPageUrl('/mealOrDrinkFavoriteDetails');
  };

  if (favorites.length === 0) {
    return (
      <h2 className={ styles.noFavoritesContainer }>
        The favorites list is empty
      </h2>
    );
  }

  return (
    <section className={ styles.favoritesContainer }>
      <header className={ styles.favoritesHeader }>
        <h2 className={ styles.favoritesTitle }>Favorite Recipes</h2>
        <nav className={ styles.favoritesNav }>
          <button
            onClick={ () => {
              setCurrentFilter('all');
              setFavorites(filter);
            } }
            data-testid="filter-by-all-btn"
            className={ styles.favoritesNavBtn }
          >
            {
              currentFilter === 'all' ? (
                <FastFood color="#FFC815" height="32px" width="32px" />
              ) : (
                <FastFoodOutline color="#1E0548" height="32px" width="32px" />
              )
            }
            <span className={ styles.favoritesNavSpan }>
              All
            </span>
          </button>
          <button
            onClick={ () => {
              setCurrentFilter('meals');
              const filterMeal = favorites.filter((favorite) => favorite.type === 'meal');
              setFavorites(filterMeal);
              setFilter([...favorites, filterMeal]);
            } }
            data-testid="filter-by-meal-btn"
            className={ styles.favoritesNavBtn }
          >
            <CookingPot
              size={ 32 }
              weight={ currentFilter === 'meals' ? 'fill' : 'regular' }
              className={
                currentFilter === 'meals' && styles.favoritesNavBtnIconActive
              }
            />
            <span
              className={ styles.favoritesNavSpan }
            >
              Meals
            </span>
          </button>
          <button
            onClick={ () => {
              setCurrentFilter('drinks');
              const filterDrink = favorites
                .filter((favorite) => favorite.type === 'drink');
              setFavorites(filterDrink);
              setFilter([...favorites, filterDrink]);
            } }
            data-testid="filter-by-drink-btn"
            className={ styles.favoritesNavBtn }
          >
            <Brandy
              size={ 32 }
              weight={ currentFilter === 'drinks' ? 'fill' : 'regular' }
              className={
                currentFilter === 'drinks' && styles.favoritesNavBtnIconActive
              }
            />
            <span className={ styles.favoritesNavSpan }>
              Drinks
            </span>
          </button>
        </nav>
      </header>
      <section className={ styles.favoritesCards }>
        {
          favorites && favorites.map(({ id, name, image,
            category, nationality, type,
            alcoholicOrNot,
          }, index) => (
            type === 'drink' ? (
              <div
                key={ id }
                className={ styles.favoritesCardsContainer }
              >
                <Link
                  className={ styles.favoritesCardsContent }
                  onClick={ handleClickImage }
                  to={ `/drinks/${id}` }
                >
                  <div
                    data-testid={ `${index}-horizontal-image` }
                    className={ styles.cardImage }
                    style={ {
                      backgroundImage: `url(${image})`,
                    } }
                  />
                  <span
                    data-testid={ `${index}-horizontal-name` }
                    className={ styles.cardTitle }
                  >
                    {name}
                  </span>
                </Link>
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                  className={ styles.cardTag }
                >
                  {alcoholicOrNot}
                </span>
                { isLinkCopied && (
                  <section className={ styles.linkCopied }><h4>Link copied!</h4></section>
                ) }
                <div className={ styles.cardActions }>
                  <div className={ styles.cardActionsBorder }>
                    <button
                      type="button"
                      data-testid={ `${index}-horizontal-share-btn` }
                      onClick={ () => handleOnClickShareBtn(`http://localhost:3000/drinks/${id}`) }
                    >
                      <ShareNetwork size={ 24 } />
                    </button>
                  </div>
                  <div className={ styles.cardActionsBorder }>
                    <button
                      type="button"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      onClick={ () => handleOnClickDesfavorBtn(index) }
                    >
                      <Heart
                        size={ 24 }
                        weight="fill"
                        className={ styles.heartIcon }
                      />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={ id }
                className={ styles.favoritesCardsContainer }
              >
                <Link
                  className={ styles.favoritesCardsContent }
                  onClick={ handleClickImage }
                  to={ `/meals/${id}` }
                >
                  <div
                    data-testid={ `${index}-horizontal-image` }
                    className={ styles.cardImage }
                    style={ {
                      backgroundImage: `url(${image})`,
                    } }
                  />
                  <span
                    data-testid={ `${index}-horizontal-name` }
                    className={ styles.cardTitle }
                  >
                    {name}
                  </span>
                </Link>
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                  className={ styles.cardTag }
                >
                  {`${nationality} - ${category}`}
                </span>
                { isLinkCopied && (
                  <section className={ styles.linkCopied }><h4>Link copied!</h4></section>
                ) }
                <div className={ styles.cardActions }>
                  <div className={ styles.cardActionsBorder }>
                    <button
                      type="button"
                      data-testid={ `${index}-horizontal-share-btn` }
                      onClick={ () => handleOnClickShareBtn(`http://localhost:3000/meals/${id}`) }
                    >
                      <ShareNetwork size={ 24 } />
                    </button>
                  </div>
                  <div className={ styles.cardActionsBorder }>
                    <button
                      type="button"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      onClick={ () => handleOnClickDesfavorBtn(index) }
                    >
                      <Heart
                        size={ 24 }
                        weight="fill"
                        className={ styles.heartIcon }
                      />
                    </button>
                  </div>
                </div>
              </div>
            )
          ))
        }
      </section>
    </section>
  );
}

export default FavoriteRecipes;
