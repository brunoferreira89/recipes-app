import React, { useContext, useEffect, useState } from 'react';
import headerContext from '../context/Contexts/headerContext';
import styles from './styles/CategoriesButtons.module.css';

import recipesContext from '../context/Contexts/recipesContext';
import iconCategoryAllMeals from '../images/icons/AllMeals.svg';
import iconCategoryAllDrinks from '../images/icons/AllDrinks.svg';
import iconCategoryBeef from '../images/icons/beef.svg';
import iconCategoryGoat from '../images/icons/goat.svg';
import iconCategoryChicken from '../images/icons/chicken.svg';
import iconCategoryBreakfast from '../images/icons/breakfast.svg';
import iconCategoryDessert from '../images/icons/dessert.svg';
import iconCategoryCocktail from '../images/icons/cocktail.svg';
import iconCategoryCocoa from '../images/icons/cocoa.svg';
import iconCategoryOrdinaryDrink from '../images/icons/ordinaryDrink.svg';
import iconCategoryOtherUnknow from '../images/icons/other.svg';
import iconCategoryShake from '../images/icons/shake.svg';

import iconCategoryAllMealsActive from '../images/icons/AllMealsActive.svg';
import iconCategoryAllDrinksActive from '../images/icons/AllDrinksActive.svg';
import iconCategoryBeefActive from '../images/icons/beefActive.svg';
import iconCategoryGoatActive from '../images/icons/goatActive.svg';
import iconCategoryChickenActive from '../images/icons/chickenActive.svg';
import iconCategoryBreakfastActive from '../images/icons/breakfastActive.svg';
import iconCategoryDessertActive from '../images/icons/dessertActive.svg';
import iconCategoryCocktailActive from '../images/icons/cocktailActive.svg';
import iconCategoryCocoaActive from '../images/icons/cocoaActive.svg';
import iconCategoryOrdinaryDrinkActive from '../images/icons/ordinaryDrinkActive.svg';
import iconCategoryOtherUnknowActive from '../images/icons/otherActive.svg';
import iconCategoryShakeActive from '../images/icons/shakeActive.svg';

function CategoriesButtons() {
  const {
    mealsCategoryButtons, drinksCategoryButtons, filterByCategory,
    fetchRecipes, filteredRecipes, setFilteredRecipes, pageMealOrDrink,
  } = useContext(recipesContext);
  const { pageUrl } = useContext(headerContext);

  const [categoryActive, setCategoryActive] = useState('All');

  useEffect(() => {}, [pageUrl]);
  useEffect(() => {}, [pageMealOrDrink]);

  return (
    <section className={ styles.categoryContainer }>
      <button
        data-testid="All-category-filter"
        className={ styles.categoryContentBtn }
        onClick={ () => {
          setCategoryActive('All');
          fetchRecipes();
        } }
      >
        <div className={ styles.categoryContent }>
          { pageUrl === '/meals' && pageMealOrDrink !== '/drinks' ? (
            <img
              src={
                categoryActive === 'All'
                  ? iconCategoryAllMealsActive
                  : iconCategoryAllMeals
              }
              alt=""
            />
          ) : <img
            src={
              categoryActive === 'All' ? iconCategoryAllDrinksActive
                : iconCategoryAllDrinks
            }
            alt=""
          /> }
          <span>All</span>
        </div>
      </button>
      {
        pageMealOrDrink !== '/drinks' && mealsCategoryButtons && mealsCategoryButtons
          .map(({ strCategory }, index) => (
            <button
              key={ index + 1 }
              className={ styles.categoryContentBtn }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => {
                setCategoryActive(strCategory);
                if (filteredRecipes === strCategory) {
                  fetchRecipes();
                  setFilteredRecipes('');
                } else {
                  filterByCategory(`${strCategory}`);
                }
              } }
            >
              { strCategory === 'Beef' && (
                <div className={ styles.categoryContent }>
                  <img
                    src={
                      categoryActive === 'Beef' ? iconCategoryBeefActive
                        : iconCategoryBeef
                    }
                    alt=""
                  />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Breakfast' && (
                <div className={ styles.categoryContent }>
                  <img
                    src={
                      categoryActive === 'Breakfast' ? iconCategoryBreakfastActive
                        : iconCategoryBreakfast
                    }
                    alt=""
                  />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Chicken' && (
                <div className={ styles.categoryContent }>
                  <img
                    src={
                      categoryActive === 'Chicken' ? iconCategoryChickenActive
                        : iconCategoryChicken
                    }
                    alt=""
                  />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Dessert' && (
                <div className={ styles.categoryContent }>
                  <img
                    src={
                      categoryActive === 'Dessert' ? iconCategoryDessertActive
                        : iconCategoryDessert
                    }
                    alt=""
                  />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Goat' && (
                <div className={ styles.categoryContent }>
                  <img
                    src={
                      categoryActive === 'Goat' ? iconCategoryGoatActive
                        : iconCategoryGoat
                    }
                    alt=""
                  />
                  <span>{strCategory}</span>
                </div>
              ) }
            </button>
          ))
      }
      {
        pageMealOrDrink === '/drinks' && drinksCategoryButtons && drinksCategoryButtons
          .map(({ strCategory }, index) => (
            <button
              key={ index + 1 }
              className={ styles.categoryContentBtn }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => {
                setCategoryActive(strCategory);
                if (filteredRecipes === strCategory) {
                  fetchRecipes();
                  setFilteredRecipes('');
                } else {
                  filterByCategory(`${strCategory}`);
                }
              } }
            >
              { strCategory === 'Cocktail' && (
                <div className={ styles.categoryContent }>
                  <img
                    src={
                      categoryActive === 'Cocktail' ? iconCategoryCocktailActive
                        : iconCategoryCocktail
                    }
                    alt=""
                  />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Cocoa' && (
                <div className={ styles.categoryContent }>
                  <img
                    src={
                      categoryActive === 'Cocoa' ? iconCategoryCocoaActive
                        : iconCategoryCocoa
                    }
                    alt=""
                  />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Ordinary Drink' && (
                <div className={ styles.categoryContent }>
                  <img
                    src={
                      categoryActive === 'Ordinary Drink'
                        ? iconCategoryOrdinaryDrinkActive
                        : iconCategoryOrdinaryDrink
                    }
                    alt=""
                  />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Other / Unknown' && (
                <div className={ styles.categoryContent }>
                  <img
                    src={
                      categoryActive === 'Other / Unknown'
                        ? iconCategoryOtherUnknowActive
                        : iconCategoryOtherUnknow
                    }
                    alt=""
                  />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Shake' && (
                <div className={ styles.categoryContent }>
                  <img
                    src={
                      categoryActive === 'Shake' ? iconCategoryShakeActive
                        : iconCategoryShake
                    }
                    alt=""
                  />
                  <span>{strCategory}</span>
                </div>
              ) }
            </button>
          ))
      }
    </section>
  );
}

export default CategoriesButtons;
