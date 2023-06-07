import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import recipesContext from '../context/Contexts/recipesContext';

function RecipeCard() {
  const { mealsRecipes, drinksRecipes } = useContext(recipesContext);

  return (
    <div>
      {
        mealsRecipes && mealsRecipes
          .map(({ idMeal, strMealThumb, strMeal }, index) => (
            <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
              <Link to={ `/meals/${idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt={ strMeal }
                />
              </Link>
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
              <Link to={ `/drinks/${idDrink}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strDrinkThumb }
                  alt={ strDrink }
                />
              </Link>
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
