import React, { useContext } from 'react';
import recipesContext from '../context/Contexts/recipesContext';

function CategoriesButtons() {
  const { mealsCategoryButtons, drinksCategoryButtons } = useContext(recipesContext);

  return (
    <div>
      {
        mealsCategoryButtons && mealsCategoryButtons
          .map(({ strCategory }, index) => (
            <button key={ index + 1 } data-testid={ `${strCategory}-category-filter` }>
              { strCategory }
            </button>
          ))
      }
      {
        drinksCategoryButtons && drinksCategoryButtons
          .map(({ strCategory }, index) => (
            <button key={ index + 1 } data-testid={ `${strCategory}-category-filter` }>
              { strCategory }
            </button>
          ))
      }
    </div>
  );
}

export default CategoriesButtons;
