import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import detailsContext from '../context/Contexts/detailsContext';
import Loading from '../components/Loading';
import Button from '../components/Button';
import { handleSaveFavoriteMeal,
  handleSaveFavoriteDrink } from '../helpers/saveFavoriteOnLocalStorage';
import getAndPutInProgRecipes from '../helpers/getAndPutInProgressRecipesOnLocalStorage';
import './styles/RecipeInProgress.css';

function RecipeInProgress() {
  const { id } = useParams();

  const { loading, setLoading, recipeInProgress,
    setRecipeInProgress, isLinkCopied,
    handleOnClickShareBtn } = useContext(detailsContext);

  const [isChecked, setIsChecked] = useState({
    drinks: { [id]: [] },
    meals: { [id]: [] },
  });

  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    const inProgressRecipesOnStorage = localStorage.getItem('inProgressRecipes');
    getAndPutInProgRecipes(id, pathname, inProgressRecipesOnStorage);
  }, [id, pathname]);

  const setAPIURL = useCallback(() => {
    if (pathname.includes('/meals')) {
      return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    if (pathname.includes('/drinks')) {
      return `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
  }, [pathname, id]);

  const fetchById = useCallback(async () => {
    try {
      const response = await fetch(setAPIURL());
      const dataJson = await response.json() || {};
      setRecipeInProgress(dataJson);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setAPIURL, setLoading, setRecipeInProgress]);

  const handleCheckbox = ({ target }) => {
    const { checked, value } = target;
    const { meals, drinks } = isChecked;
    let updatedList = { ...isChecked };

    if (checked && pathname.includes('meals')) {
      updatedList = { ...isChecked, meals: { ...meals, [id]: [...meals[id], value] } };
    } else if (!checked && pathname.includes('meals')) {
      updatedList.meals[id].splice(meals[id].indexOf(value), 1);
    }

    if (checked && pathname.includes('drinks')) {
      updatedList = { ...isChecked, drinks: { ...drinks, [id]: [...drinks[id], value] } };
    } else if (!checked && pathname.includes('drinks')) {
      updatedList.drinks[id].splice(drinks[id].indexOf(value), 1);
    }
    setIsChecked(updatedList);
    localStorage.setItem('inProgressRecipes', JSON.stringify({ ...updatedList }));
  };

  const getCheckedFromStore = useCallback(() => {
    const checkboxes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: { [id]: [] },
      meals: { [id]: [] },
    };
    setIsChecked(checkboxes);
  }, [id]);

  const handleCheckboxClass = (ingredient) => {
    const { meals, drinks } = isChecked;
    if (pathname.includes('meals')) {
      return meals[id].includes(ingredient) ? 'checked-checkbox' : 'unchecked-checkbox';
    } if (pathname.includes('drinks')) {
      return drinks[id].includes(ingredient) ? 'checked-checkbox' : 'unchecked-checkbox';
    }
  };

  useEffect(() => {
    fetchById();
    getCheckedFromStore();
  }, [fetchById, getCheckedFromStore]);

  if (loading) return <Loading />;

  const getMealsIngredientsList = () => {
    const mealsIngredientsNames = Object
      .keys(recipeInProgress.meals[0]).filter((key) => key.includes('strIngredient'));

    const mealsIngredientsList = mealsIngredientsNames
      .map((ingredient) => recipeInProgress.meals[0][ingredient] || [])
      .filter((ingredientName) => ingredientName.length > 0);
    return mealsIngredientsList;
  };

  const getDrinksIngredientsList = () => {
    const drinksIngredientsNames = Object
      .keys(recipeInProgress.drinks[0]).filter((key) => key.includes('strMeasure'));

    const drinksIngredientsList = drinksIngredientsNames
      .map((ingredient) => recipeInProgress.drinks[0][ingredient] || [])
      .filter((ingredientName) => ingredientName.length > 0);
    return drinksIngredientsList;
  };

  const mealsURL = `http://localhost:3000/meals/${id}`;
  const drinksURL = `http://localhost:3000/drinks/${id}`;

  return (
    <main>
      {
        pathname.includes('meals') && (
          <div>
            <img
              data-testid="recipe-photo"
              src={ recipeInProgress.meals[0].strMealThumb }
              alt="img"
            />
            <h3 data-testid="recipe-title">{ recipeInProgress.meals[0].strMeal }</h3>
            <span
              data-testid="recipe-category"
            >
              { recipeInProgress.meals[0].strCategory }
            </span>
            <h4>Lista de ingredientes</h4>
            <ul>
              {
                getMealsIngredientsList().map((ingredient, index) => (
                  <label
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                    className={ handleCheckboxClass(ingredient) }
                  >
                    <input
                      data-testid="ingredient-step"
                      type="checkbox"
                      value={ ingredient }
                      onChange={ handleCheckbox }
                      checked={ isChecked.meals[id]
                        .some((item) => ingredient === item) }
                    />
                    {ingredient}
                  </label>
                ))
              }
            </ul>
            <p
              data-testid="instructions"
            >
              { recipeInProgress.meals[0].strInstructions }
            </p>
            { isLinkCopied && <section><h4>Link copied!</h4></section> }
            <Button
              dataTestid="share-btn"
              textContent="Share"
              onClick={ () => handleOnClickShareBtn(mealsURL) }
            />
            <Button
              dataTestid="favorite-btn"
              textContent="Favorite"
              onClick={ () => handleSaveFavoriteMeal(recipeInProgress) }
            />
            <button data-testid="finish-recipe-btn">Finalizar</button>
          </div>
        )
      }
      {
        pathname.includes('drinks')
      && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ recipeInProgress.drinks[0].strDrinkThumb }
            alt="img"
          />
          <h3 data-testid="recipe-title">{ recipeInProgress.drinks[0].strDrink }</h3>
          <span
            data-testid="recipe-category"
          >
            { recipeInProgress.drinks[0].strAlcoholic }
          </span>
          <h4>Lista de ingredientes</h4>
          <ul>
            {
              getDrinksIngredientsList().map((ingredient, index) => (
                <label
                  key={ index }
                  data-testid={ `${index}-ingredient-step` }
                  className={ handleCheckboxClass(ingredient) }
                >
                  <input
                    data-testid="ingredient-step"
                    type="checkbox"
                    value={ ingredient }
                    onChange={ handleCheckbox }
                    checked={ isChecked.drinks[id]
                      .some((item) => ingredient === item) }
                  />
                  {ingredient}
                </label>
              ))
            }
          </ul>
          <p data-testid="instructions">{ recipeInProgress.drinks[0].strInstructions }</p>
          { isLinkCopied && <section><h4>Link copied!</h4></section> }
          <Button
            dataTestid="share-btn"
            textContent="Share"
            onClick={ () => handleOnClickShareBtn(drinksURL) }
          />
          <Button
            dataTestid="favorite-btn"
            textContent="Favorite"
            onClick={ () => handleSaveFavoriteDrink(recipeInProgress) }
          />
          <button data-testid="finish-recipe-btn">Finalizar</button>
        </div>
      )
      }
    </main>
  );
}

export default RecipeInProgress;
