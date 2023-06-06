import React, { useContext } from 'react';
import recipesContext from '../context/Contexts/recipesContext';

function CategoriesButtons() {
  const {
    mealsCategoryButtons,
    drinksCategoryButtons,
    filterByCategory,
    fetchRecipes,
    filteredRecipes,
    setFilteredRecipes } = useContext(recipesContext);

  return (
    <div>
      {
        mealsCategoryButtons && mealsCategoryButtons
          .map(({ strCategory }, index) => (
            <button
              key={ index + 1 }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => {
                if (filteredRecipes === strCategory) {
                  fetchRecipes();
                  setFilteredRecipes('');
                } else {
                  filterByCategory(`${strCategory}`);
                }
              } }
            >
              { strCategory }
            </button>
          ))
      }
      {
        drinksCategoryButtons && drinksCategoryButtons
          .map(({ strCategory }, index) => (
            <button
              key={ index + 1 }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => {
                if (filteredRecipes === strCategory) {
                  fetchRecipes();
                  setFilteredRecipes('');
                } else {
                  filterByCategory(`${strCategory}`);
                }
              } }
            >
              { strCategory }
            </button>
          ))
      }
      <button data-testid="All-category-filter" onClick={ fetchRecipes }>All</button>
    </div>
  );
}

export default CategoriesButtons;
