import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { BookOpenText, CaretCircleLeft, CaretCircleRight } from '@phosphor-icons/react';
import {
  dataRecoDrinks, dataRecoMeals,
} from '../helpers/mock/dataHomeSlideRecommendation';
import styles from './styles/SlideHomeRecommendation.module.css';
import headerContext from '../context/Contexts/headerContext';

function SlideHomeRecommendation() {
  const [isMealOrDrink, setIsMealOrDrink] = useState('');
  const { pageUrl } = useContext(headerContext);
  const [data, setData] = useState([]);
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState(0);
  const content = useRef();

  const history = useHistory();
  // const page = history.location.pathname;

  useEffect(() => {
    if (pageUrl === '/meals') {
      setIsMealOrDrink('meals');
    }
    if (pageUrl === '/drinks') {
      setIsMealOrDrink('drinks');
    }
  }, [pageUrl]);

  useEffect(() => {
    if (isMealOrDrink === 'meals') setData(dataRecoMeals);
    if (isMealOrDrink === 'drinks') setData(dataRecoDrinks);
  }, [isMealOrDrink]);

  useEffect(() => {
    if (data.length > 0) {
      const { width } = content.current.getBoundingClientRect();
      setPosition(-(width * active));
    }
  }, [data, active]);

  const slidePrev = () => {
    if (active > 0) setActive((state) => state - 1);
  };

  const slideNext = () => {
    if (active < data.length - 1) setActive((state) => state + 1);
  };

  const handleClickGoToMealOrDrink = (id) => {
    if (isMealOrDrink === 'meals') history.push(`/meals/${id}`);
    if (isMealOrDrink === 'drinks') history.push(`/drinks/${id}`);
  };

  if (data.length > 0) {
    return (
      <section className={ styles.container }>
        <div
          ref={ content }
          className={ styles.content }
          style={ { transform: `translateX(${position}px)` } }
        >
          {
            data.map((recipe) => (
              <div
                key={ isMealOrDrink === 'meals' ? recipe.idMeal : recipe.idDrink }
                className={ styles.item }
              >
                {
                  isMealOrDrink === 'meals' && (
                    <div className={ styles.tagsContainerMeal }>
                      <span className={ styles.tagsContentMeal }>
                        { recipe.strCategory }
                      </span>
                    </div>
                  )
                }
                {
                  isMealOrDrink === 'drinks' && (
                    <div className={ styles.tagsContainerDrinks }>
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
                    isMealOrDrink === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb
                  }
                  alt=""
                />
                <button
                  className={ styles.btnSeeMore }
                  onClick={
                    isMealOrDrink === 'meals' ? (
                      () => handleClickGoToMealOrDrink(recipe.idMeal)
                    ) : () => handleClickGoToMealOrDrink(recipe.idDrink)
                  }
                >
                  See More
                  <BookOpenText size={ 24 } />
                </button>
                <strong className={ styles.itemTitle }>
                  { isMealOrDrink === 'meals' ? recipe.strMeal : recipe.strDrink }
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
