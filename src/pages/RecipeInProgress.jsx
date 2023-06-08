import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import recipesContext from '../context/Contexts/recipesContext';
import Loading from '../components/Loading';
import Button from '../components/Button';
import './styles/RecipeInProgress.css';

function RecipeInProgress() {
  const { id } = useParams();
  const {
    loading,
    setLoading,
    recipeInProgress,
    setRecipeInProgress } = useContext(recipesContext);

  const [isChecked, setIsChecked] = useState({
    drinks: { [id]: [] },
    meals: { [id]: [] },
  });

  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    const inProgressRecipesOnStorage = localStorage.getItem('inProgressRecipes');
    if (pathname.includes('/meals')) {
      let copyLocalStorage = {};
      if (!inProgressRecipesOnStorage) {
        copyLocalStorage = { drinks: {}, meals: { [id]: [] } };
        localStorage.setItem('inProgressRecipes', JSON.stringify(copyLocalStorage));
      }
      if (inProgressRecipesOnStorage) {
        const responseLocalStorage = JSON.parse(inProgressRecipesOnStorage);
        copyLocalStorage = { ...responseLocalStorage };
      }
      const isAlreadyHaveOnLocalStorage = Object.keys(copyLocalStorage.meals)
        .some((key) => Number(key) === Number(id));
      if (!isAlreadyHaveOnLocalStorage) {
        copyLocalStorage.meals[id] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(copyLocalStorage));
      }
    }

    if (pathname.includes('/drinks')) {
      let copyLocalStorage = {};
      if (!inProgressRecipesOnStorage) {
        copyLocalStorage = { drinks: { [id]: [] }, meals: {} };
        localStorage.setItem('inProgressRecipes', JSON.stringify(copyLocalStorage));
      }
      if (inProgressRecipesOnStorage) {
        const responseLocalStorage = JSON.parse(inProgressRecipesOnStorage);
        copyLocalStorage = { ...responseLocalStorage };
      }
      const isAlreadyHaveOnLocalStorage = Object.keys(copyLocalStorage.drinks)
        .some((key) => Number(key) === Number(id));
      if (!isAlreadyHaveOnLocalStorage) {
        copyLocalStorage.drinks[id] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(copyLocalStorage));
      }
    }
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
      const dataJson = await response.json();
      const data = Object.values(dataJson)[0] || [];
      setRecipeInProgress(data);
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

  const ingredientsNames = Object
    .keys(recipeInProgress[0] || []).filter((key) => key.includes('strIngredient'));

  const ingredientsList = ingredientsNames
    .map((ingredient) => recipeInProgress[0][ingredient] || [])
    .filter((ingredientName) => ingredientName.length > 0);

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

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strDrinkThumb,
    strDrink,
    strAlcoholic } = recipeInProgress[0];

  return (
    <main>
      {
        pathname.includes('meals') && (
          <div>
            <img
              data-testid="recipe-photo"
              src={ strMealThumb }
              alt="img"
            />
            <h3 data-testid="recipe-title">{ strMeal }</h3>
            <span data-testid="recipe-category">{ strCategory }</span>
            <h4>Lista de ingredientes</h4>
            <ul>
              {
                ingredientsList.map((ingredient, index) => (
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
            <p data-testid="instructions">{ strInstructions }</p>
            <button data-testid="share-btn">Compartilhar</button>
            <button data-testid="favorite-btn">Favoritar</button>
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
            src={ strDrinkThumb }
            alt="img"
          />
          <h3 data-testid="recipe-title">{ strDrink }</h3>
          <span data-testid="recipe-category">{ strAlcoholic }</span>
          <h4>Lista de ingredientes</h4>
          <ul>
            {
              ingredientsList.map((ingredient, index) => (
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
          <p data-testid="instructions">{ strInstructions }</p>
          <Button
            dataTestid="share-btn"
            textContent="Share"
          />
          <Button
            dataTestid="favorite-btn"
            textContent="Favorite"
          />
          <button data-testid="finish-recipe-btn">Finalizar</button>
        </div>
      )
      }
    </main>
  );
}

export default RecipeInProgress;
