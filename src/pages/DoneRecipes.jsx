import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FastFood, FastFoodOutline } from 'react-ionicons';
import { Brandy, CookingPot, ShareNetwork } from '@phosphor-icons/react';
import detailsContext from '../context/Contexts/detailsContext';
import headerContext from '../context/Contexts/headerContext';
import styles from './styles/DoneRecipes.module.css';

function DoneRecipes() {
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [whatDone, setWhatDone] = useState('all');
  const [doneMeals, setDoneMeals] = useState([]);
  const [doneDrinks, setDoneDrinks] = useState([]);

  const { isLinkCopied, handleOnClickShareBtn } = useContext(detailsContext);
  const { setPageUrl } = useContext(headerContext);

  const getDoneRecipeFromStorage = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipesList(doneRecipes);
  };
  useEffect(() => {
    getDoneRecipeFromStorage();
  }, []);

  const handleFilter = (filterType) => {
    setWhatDone(filterType);

    const filterDoneMeals = doneRecipesList.filter((recipe) => recipe.type === 'meal');
    setDoneMeals(filterDoneMeals);

    const filterDoneDrinks = doneRecipesList.filter((recipe) => recipe.type === 'drink');
    setDoneDrinks(filterDoneDrinks);
  };

  const handleClickImage = () => {
    setPageUrl('/mealOrDrinkDoneDetails');
  };

  let filteredRecipes = [];

  if (whatDone === 'all') {
    filteredRecipes = doneRecipesList;
  } else if (whatDone === 'meals') {
    filteredRecipes = doneMeals;
  } else if (whatDone === 'drinks') {
    filteredRecipes = doneDrinks;
  }

  const mealsURL = 'http://localhost:3000/meals/';
  const drinksURL = 'http://localhost:3000/drinks/';

  if (filteredRecipes.length === 0) {
    return (
      <h2 className={ styles.noDoneRecipesContainer }>
        The done recipes is empty
      </h2>
    );
  }

  return (
    <section className={ styles.doneContainer }>
      <header className={ styles.doneHeader }>
        <h2 className={ styles.doneTitle }>Done Recipes</h2>
        <nav className={ styles.doneNav }>
          <button
            onClick={ () => handleFilter('all') }
            data-testid="filter-by-all-btn"
            className={ styles.doneNavBtn }
          >
            {
              whatDone === 'all' ? (
                <FastFood color="#FFC815" height="32px" width="32px" />
              ) : (
                <FastFoodOutline color="#1E0548" height="32px" width="32px" />
              )
            }
            <span className={ styles.doneNavSpan }>
              All
            </span>
          </button>
          <button
            onClick={ () => handleFilter('meals') }
            data-testid="filter-by-meal-btn"
            className={ styles.doneNavBtn }
          >
            <CookingPot
              size={ 32 }
              weight={ whatDone === 'meals' ? 'fill' : 'regular' }
              className={
                whatDone === 'meals' && styles.doneNavBtnIconActive
              }
            />
            <span
              className={ styles.doneNavSpan }
            >
              Meals
            </span>
          </button>
          <button
            onClick={ () => handleFilter('drinks') }
            data-testid="filter-by-drink-btn"
            className={ styles.doneNavBtn }
          >
            <Brandy
              size={ 32 }
              weight={ whatDone === 'drinks' ? 'fill' : 'regular' }
              className={
                whatDone === 'drinks' && styles.doneNavBtnIconActive
              }
            />
            <span className={ styles.doneNavSpan }>
              Drinks
            </span>
          </button>
        </nav>
      </header>
      <main className={ styles.doneCards }>
        {
          filteredRecipes
            .map((
              {
                id, image, category, name, nationality,
                doneDate, tags, type, alcoholicOrNot },
              index,
            ) => (
              <div
                key={ id }
                className={ styles.doneCardsContainer }
              >
                <Link
                  className={ styles.doneCardsContent }
                  onClick={ handleClickImage }
                  to={ type === 'meal' ? (`/meals/${id}`) : (`/drinks/${id}`) }
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
                    <span
                      data-testid={ `${index}-horizontal-done-date` }
                      className={ styles.cardTimeData }
                    >
                      {
                        `${String(new Date(doneDate).getHours())
                          .padStart(2, '0')}:${String(new Date(doneDate).getMinutes())
                          .padStart(2, '0')}h - ${String(new Date(doneDate).getDate())
                          .padStart(2, '0')}/${String(new Date(doneDate).getMonth() + 1)
                          .padStart(2, '0')}/${new Date(doneDate)
                          .getFullYear()}`
                      }
                    </span>
                  </span>
                </Link>
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                  className={ styles.cardTag }
                >
                  { type === 'meal' ? (
                    `${nationality} - ${category}`
                  ) : (
                    `${alcoholicOrNot}`
                  ) }
                </span>
                {
                  type === 'meal'
                  && tags.slice(0, 2).map((tagName) => (
                    <p
                      key={ `${tagName}-${index}` }
                      data-testid={ `${index}-${tagName}-horizontal-tag` }
                    >
                      { tagName}
                    </p>
                  ))
                }
                { isLinkCopied && (
                  <section className={ styles.linkCopied }><h4>Link copied!</h4></section>
                ) }
                <div className={ styles.cardActions }>
                  <div className={ styles.cardActionsBorder }>
                    <button
                      type="button"
                      data-testid={ `${index}-horizontal-share-btn` }
                      onClick={ () => handleOnClickShareBtn(
                        type === 'meal' ? (`${mealsURL}${id}`) : (`${drinksURL}${id}`),
                      ) }
                    >
                      <ShareNetwork size={ 24 } />
                    </button>
                  </div>
                </div>

              </div>
            ))
        }
      </main>
    </section>
  );
}

export default DoneRecipes;
