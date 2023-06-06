import React, { useContext } from 'react';
import { CaretCircleLeft, CaretCircleRight } from '@phosphor-icons/react';
import detailsContext from '../context/Contexts/detailsContext';
import styles from './Recommendations.module.css';

function Recommendations() {
  const {
    mealsOrDrinks, recommendations, indexCarouselActive, setIndexCarouselActive,
  } = useContext(detailsContext);

  const handleClickPrevCarousel = () => {
    if (indexCarouselActive.initial > 0) {
      setIndexCarouselActive((state) => ({
        ...state,
        initial: state.initial - 1,
        final: state.final - 1,
      }));
    }
  };

  const handleClickNextCarousel = () => {
    if (indexCarouselActive.final < recommendations.length - 1) {
      setIndexCarouselActive((state) => ({
        ...state,
        initial: state.initial + 1,
        final: state.final + 1,
      }));
    }
  };

  return (
    <section>
      <h2>Recommendations</h2>
      <div className={ styles.carousel }>
        <CaretCircleLeft
          size={ 64 }
          className={ styles.arrowLeft }
          onClick={ handleClickPrevCarousel }
        />
        {
          recommendations.map((recom, index) => (
            <div
              key={ mealsOrDrinks === 'meals' ? recom.idDrink : recom.idMeal }
              data-testid={ `${index}-recommendation-card` }
              className={
                index === indexCarouselActive.initial
                  || index === indexCarouselActive.final ? (
                    styles.cardActive
                  ) : styles.cardDeactive
              }
            >
              <img
                className={ styles.imgRecommendations }
                src={
                  mealsOrDrinks === 'meals' ? recom.strDrinkThumb : recom.strMealThumb
                }
                alt=""
              />
              <h3 data-testid={ `${index}-recommendation-title` }>
                {
                  mealsOrDrinks === 'meals' ? recom.strDrink : recom.strMeal
                }
              </h3>
            </div>
          ))
        }
        <CaretCircleRight
          size={ 64 }
          className={ styles.arrowRight }
          onClick={ handleClickNextCarousel }
        />
      </div>
    </section>
  );
}

export default Recommendations;
