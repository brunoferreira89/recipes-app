import React, { useContext } from 'react';
import searchContext from '../context/Contexts/searchContext';

function SearchResultCard() {
  const { meals, drinks } = useContext(searchContext);

  return (
    <div>
      {
        meals && meals
          .map(({ idMeal, strMealThumb, strMeal }, index) => (
            <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt="imagem"
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
        drinks && drinks
          .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
            <div key={ idDrink } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt="imagem"
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

export default SearchResultCard;
