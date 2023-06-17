import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipesContext from '../context/Contexts/recipesContext';
import headerContext from '../context/Contexts/headerContext';
import styles from './styles/RecipeCard.module.css';

function RecipeCard() {
  const { mealsRecipes, drinksRecipes } = useContext(recipesContext);
  const { pageUrl, setPageUrl } = useContext(headerContext);

  useEffect(() => {}, [pageUrl]);

  const handleClickImage = (page) => {
    setPageUrl(page);
  };

  return (
    <div className={ styles.cardsContainer }>
      {
        pageUrl === '/meals' && mealsRecipes && mealsRecipes
          .map(({ idMeal, strMealThumb, strMeal }, index) => (
            <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
              <Link
                onClick={ () => handleClickImage(`/meals/${idMeal}`) }
                to={ `/meals/${idMeal}` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  className={ styles.card }
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
        pageUrl === '/drinks' && drinksRecipes && drinksRecipes
          .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
            <div key={ idDrink } data-testid={ `${index}-recipe-card` }>
              <Link
                onClick={ () => handleClickImage(`/drinks/${idMeal}`) }
                to={ `/drinks/${idDrink}` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  className={ styles.card }
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
