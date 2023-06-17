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
            <Link
              key={ idMeal }
              data-testid={ `${index}-recipe-card` }
              className={ styles.cardContent }
              onClick={ () => handleClickImage(`/meals/${idMeal}`) }
              to={ `/meals/${idMeal}` }
            >
              <div
                data-testid={ `${index}-card-img` }
                className={ styles.cardImage }
                style={ {
                  backgroundImage: `linear-gradient(to top,
                      rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) 25%,
                      transparent 55%), url(${strMealThumb})`,
                } }
              />
              <h3
                data-testid={ `${index}-card-name` }
                className={ styles.cardTitle }
              >
                { strMeal }
              </h3>
            </Link>
          ))
      }
      {
        pageUrl === '/drinks' && drinksRecipes && drinksRecipes
          .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
            <Link
              key={ idDrink }
              data-testid={ `${index}-recipe-card` }
              className={ styles.cardContent }
              onClick={ () => handleClickImage(`/drinks/${idDrink}`) }
              to={ `/drinks/${idDrink}` }
            >
              <div
                data-testid={ `${index}-card-img` }
                className={ styles.cardImage }
                style={ {
                  backgroundImage: `linear-gradient(to top,
                      rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) 25%,
                      transparent 55%), url(${strDrinkThumb})`,
                } }
              />
              <h3
                data-testid={ `${index}-card-name` }
                className={ styles.cardTitle }
              >
                { strDrink }
              </h3>
            </Link>
          ))
      }
    </div>
  );
}

export default RecipeCard;
