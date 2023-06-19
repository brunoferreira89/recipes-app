import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles/IngredientsAndQtdList.module.css';

function IngredientsAndQtdList({
  id, isItMeal, mealOrDrinkInProgress, isChecked,
  handleCheckbox, handleCheckboxClass, ingredientsList, ingredientsQuantityList,
}) {
  return (
    <div className={ styles.ingredientsContainer }>
      <ul className={ styles.ingredientsContent }>
        {
          ingredientsList.map((ingredient, index) => (
            <label
              key={ `${ingredient} ${index}` }
              data-testid={ `${index}-ingredient-step` }
              className={ handleCheckboxClass(ingredient) }
            >
              <div className={ styles.ingredientImgContainer }>
                <img
                  className={ styles.ingredientImg }
                  src={
                    mealOrDrinkInProgress === 'meals' ? (
                      `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`
                    ) : (
                      `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`)
                  }
                  alt={ ingredient }
                />
              </div>

              <input
                data-testid="ingredient-step"
                type="checkbox"
                className={ styles.ingredientCheckbox }
                value={ ingredient }
                onChange={ handleCheckbox }
                checked={ isItMeal ? (
                  isChecked.meals[id].some((item) => ingredient === item)
                ) : (
                  isChecked.drinks[id].some((item) => ingredient === item)
                ) }
              />

              {ingredient}

            </label>
          ))
        }
      </ul>

      <ul className={ styles.qtdIngredientsContent }>
        {
          ingredientsQuantityList.map((ingredientQtd, index) => (
            <li
              key={ `${ingredientQtd} ${index}` }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredientQtd}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

IngredientsAndQtdList.propTypes = {
  handleCheckbox: PropTypes.func,
  handleCheckboxClass: PropTypes.func,
  id: PropTypes.string,
  ingredientsList: PropTypes.shape({
    map: PropTypes.func,
  }),
  ingredientsQuantityList: PropTypes.shape({
    map: PropTypes.func,
  }),
  isChecked: PropTypes.object,
  isItMeal: PropTypes.bool,
  mealOrDrinkInProgress: PropTypes.string,
}.isRequired;

export default IngredientsAndQtdList;
