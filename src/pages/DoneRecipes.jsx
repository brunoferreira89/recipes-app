import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import detailsContext from '../context/Contexts/detailsContext';

function DoneRecipes() {
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [whatDone, setWhatDone] = useState('all');
  const [doneMeals, setDoneMeals] = useState([]);
  const [doneDrinks, setDoneDrinks] = useState([]);

  const { isLinkCopied, handleOnClickShareBtn } = useContext(detailsContext);

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

  return (
    <main>
      <section>
        <button
          onClick={ () => handleFilter('all') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          onClick={ () => handleFilter('meals') }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          onClick={ () => handleFilter('drinks') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      <section>
        {
          filteredRecipes
            .map((
              {
                id, image, category, name, nationality,
                doneDate, tags, type, alcoholicOrNot },
              index,
            ) => (
              <div key={ id }>
                <Link
                  to={ type === 'meal' ? (`/meals/${id}`) : (`/drinks/${id}`) }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ image }
                    style={ { width: '20vw' } }
                    alt=""
                  />
                  <h1 data-testid={ `${index}-horizontal-name` }>{ name }</h1>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { type === 'meal' ? (
                    `${nationality} - ${category}`
                  ) : (
                    `${alcoholicOrNot}`
                  ) }
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
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
                { isLinkCopied && <section><h4>Link copied!</h4></section> }
                <input
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="image"
                  src={ shareIcon }
                  onClick={ () => handleOnClickShareBtn(
                    type === 'meal' ? (`${mealsURL}${id}`) : (`${drinksURL}${id}`),
                  ) }
                  alt=""
                />
              </div>
            ))
        }
      </section>
    </main>
  );
}

export default DoneRecipes;
