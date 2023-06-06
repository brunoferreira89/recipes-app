import React, { useContext } from 'react';
import recipesContext from '../context/Contexts/recipesContext';

function RecipeCard() {
  const { mealsRecipes, drinksRecipes } = useContext(recipesContext);

  return (
    <div>
      {
        mealsRecipes && mealsRecipes
          .map(({ idMeal, strMealThumb, strMeal }, index) => (
            <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ strMeal }
              />
              <h3
                data-testid={ `${index}-card-name` }
              >
                { strMeal }
              </h3>
            </div>
          ))
      }
      {
        drinksRecipes && drinksRecipes
          .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
            <div key={ idDrink } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt={ strDrink }
              />
              <h3
                data-testid={ `${index}-card-name` }
              >
                { strDrink }
              </h3>
            </div>
          ))
      }
    </div>
  );
}

export default RecipeCard;
