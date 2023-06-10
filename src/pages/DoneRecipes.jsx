import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [whatDone, setWhatDone] = useState('all');
  const [doneMeals, setDoneMeals] = useState([]);
  const [doneDrinks, setDoneDrinks] = useState([]);

  const getDoneRecipeFromStorage = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipesList(doneRecipes);
  };
  useEffect(() => {
    getDoneRecipeFromStorage();
  }, []);

  const handleFilter = (filterType) => {
    setWhatDone(filterType);

    const filterDoneMeals = doneRecipesList
      .filter((recipe) => recipe.type === 'meal');
    setDoneMeals(filterDoneMeals);

    const filterDoneDrinks = doneRecipesList
      .filter((recipe) => recipe.type === 'drink');
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

  return (
    <div>
      <div>
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
      </div>
      {
        filteredRecipes.map((
          { id, image, type, name: recipeName,
            doneDate, tags /* , category, nationality, alcoholicOrNot */ },
          index,
        ) => (
          <div key={ index }>
            <Link to={ `/${type}s/${id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ recipeName }
              />
              <h3 data-testid={ `${index}-horizontal-name` }>{ recipeName }</h3>
            </Link>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {/* { ({ type } === 'meal') ? `${nationality} - ${category}` : { alcoholicOrNot }} */}
            </h3>
            <h3 data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</h3>
            <button data-testid={ `${index}-horizontal-share-btn` }>
              <img src={ shareIcon } alt="compartilhar" />
            </button>
            <h3 data-testid={ `${index}-${tags}-horizontal-tag` }>{ tags }</h3>
          </div>
        ))
      }
    </div>
  );
}

export default DoneRecipes;
