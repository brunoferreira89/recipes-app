import React, { useContext, useEffect } from 'react';
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
import headerContext from '../context/Contexts/headerContext';
import styles from './styles/CategoriesButtons.module.css';

function CategoriesButtons() {
  const {
    mealsCategoryButtons,
    drinksCategoryButtons,
    filterByCategory,
    fetchRecipes,
    filteredRecipes,
    setFilteredRecipes } = useContext(recipesContext);
  const { pageUrl } = useContext(headerContext);

  useEffect(() => {}, [pageUrl]);

  console.log(filteredRecipes);

  return (
    <section className={ styles.categoryContainer }>
      <button
        data-testid="All-category-filter"
        className={ styles.categoryContentBtn }
        onClick={ fetchRecipes }
      >
        <div className={ styles.categoryContent }>
          { pageUrl === '/meals' ? (
            <img src={ iconCategoryAllMeals } alt="" />
          ) : <img src={ iconCategoryAllDrinks } alt="" /> }
          <span>All</span>
        </div>
      </button>
      {
        mealsCategoryButtons && mealsCategoryButtons
          .map(({ strCategory }, index) => (
            <button
              key={ index + 1 }
              className={ styles.categoryContentBtn }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => {
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
                    src={ iconCategoryBeef }
                    alt=""
                  />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Breakfast' && (
                <div className={ styles.categoryContent }>
                  <img src={ iconCategoryBreakfast } alt="" />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Chicken' && (
                <div className={ styles.categoryContent }>
                  <img src={ iconCategoryChicken } alt="" />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Dessert' && (
                <div className={ styles.categoryContent }>
                  <img src={ iconCategoryDessert } alt="" />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Goat' && (
                <div className={ styles.categoryContent }>
                  <img src={ iconCategoryGoat } alt="" />
                  <span>{strCategory}</span>
                </div>
              ) }
            </button>
          ))
      }
      {
        drinksCategoryButtons && drinksCategoryButtons
          .map(({ strCategory }, index) => (
            <button
              key={ index + 1 }
              className={ styles.categoryContentBtn }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => {
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
                  <img src={ iconCategoryCocktail } alt="" />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Cocoa' && (
                <div className={ styles.categoryContent }>
                  <img src={ iconCategoryCocoa } alt="" />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Ordinary Drink' && (
                <div className={ styles.categoryContent }>
                  <img src={ iconCategoryOrdinaryDrink } alt="" />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Other / Unknown' && (
                <div className={ styles.categoryContent }>
                  <img src={ iconCategoryOtherUnknow } alt="" />
                  <span>{strCategory}</span>
                </div>
              ) }
              { strCategory === 'Shake' && (
                <div className={ styles.categoryContent }>
                  <img src={ iconCategoryShake } alt="" />
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
