import React, { useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import searchContext from '../context/Contexts/searchContext';
import styles from './styles/SearchResultCard.module.css';
import headerContext from '../context/Contexts/headerContext';

const textIsNotResult = 'Sorry, we haven\'t found any recipes for these filters.';
const textIsNotFirstLetter = 'Your search must have only 1 (one) character';

function SearchResultCard() {
  const { meals, drinks, isNotResult, isNotFirstLetter } = useContext(searchContext);
  const { setPageUrl } = useContext(headerContext);

  const handleClickImage = (page) => {
    setPageUrl(page);
  };

  return (
    <section className={ styles.wrapResultsCardsContainer }>
      {
        meals && meals
          .map(({ idMeal, strMealThumb, strMeal }, index) => (
            <Link
              className={ styles.cardContent }
              key={ idMeal }
              data-testid={ `${index}-recipe-card` }
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
        drinks && drinks
          .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
            <Link
              className={ styles.cardContent }
              key={ idDrink }
              data-testid={ `${index}-recipe-card` }
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
      {
        isNotResult && (
          <h2 className={ styles.msgErrorOnSearch }>{ textIsNotResult }</h2>
        )
      }
      {
        isNotFirstLetter && (
          <h2 className={ styles.msgErrorOnSearch }>{ textIsNotFirstLetter }</h2>
        )
      }
    </section>
  );
}

export default SearchResultCard;
