import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { BookOpenText, CaretCircleLeft, CaretCircleRight } from '@phosphor-icons/react';
import styles from './styles/SlideHomeRecommendation.module.css';
import detailsContext from '../context/Contexts/detailsContext';

function SlideHomeRecommendation() {
  const { mealsOrDrinks, recommendations } = useContext(detailsContext);
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState(0);
  const { setData } = useContext(detailsContext);

  const content = useRef();

  const history = useHistory();

  useEffect(() => {
    if (recommendations.length > 0) {
      const { width } = content.current.getBoundingClientRect();
      setPosition(-(width * active));
    }
  }, [recommendations, active]);

  const slidePrev = () => {
    if (active > 0) setActive((state) => state - 1);
  };

  const slideNext = () => {
    if (active < recommendations.length - 1) setActive((state) => state + 1);
  };

  const handleClickGoToMealOrDrink = (id) => {
    setData(null);
    if (mealsOrDrinks === 'drinks') history.push(`/meals/${id}`);
    if (mealsOrDrinks === 'meals') history.push(`/drinks/${id}`);
  };

  console.log(recommendations);

  if (recommendations.length > 0) {
    return (
      <section className={ styles.container }>
        <div
          ref={ content }
          className={ styles.content }
          style={ { transform: `translateX(${position}px)` } }
        >
          {
            recommendations.map((recipe) => (
              <div
                key={ mealsOrDrinks === 'drinks' ? recipe.idMeal : recipe.idDrink }
                className={ styles.item }
              >
                {
                  mealsOrDrinks === 'drinks' && (
                    <div className={ styles.tagsContainer }>
                      <span className={ styles.tagsContentMeal }>
                        { recipe.strCategory }
                      </span>
                    </div>
                  )
                }
                {
                  mealsOrDrinks === 'meals' && (
                    <div className={ styles.tagsContainer }>
                      <span
                        className={ styles.tagsContentDrinksCategory }
                      >
                        { recipe.strCategory }
                      </span>
                      <span
                        className={ styles.tagsContentDrinksAlcohol }
                      >
                        { recipe.strAlcoholic }
                      </span>
                    </div>
                  )
                }
                <img
                  className={ styles.itemImg }
                  src={
                    mealsOrDrinks === 'drinks' ? (recipe.strMealThumb)
                      : (recipe.strDrinkThumb)
                  }
                  alt=""
                />
                <button
                  className={ styles.btnSeeMore }
                  onClick={
                    mealsOrDrinks === 'drinks' ? (
                      () => handleClickGoToMealOrDrink(recipe.idMeal)
                    ) : () => handleClickGoToMealOrDrink(recipe.idDrink)
                  }
                >
                  See More
                  <BookOpenText size={ 24 } />
                </button>
                <strong className={ styles.itemTitle }>
                  { mealsOrDrinks === 'drinks' ? recipe.strMeal : recipe.strDrink }
                </strong>
              </div>
            ))
          }
        </div>
        <nav className={ styles.nav }>
          <button
            onClick={ slidePrev }
            className={ styles.navBtn }
          >
            <CaretCircleLeft size={ 40 } />
          </button>
          <button
            onClick={ slideNext }
            className={ styles.navBtn }
          >
            <CaretCircleRight size={ 40 } />
          </button>
        </nav>
      </section>
    );
  }
}

export default SlideHomeRecommendation;
