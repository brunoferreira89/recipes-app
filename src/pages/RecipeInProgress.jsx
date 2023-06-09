import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import detailsContext from '../context/Contexts/detailsContext';
import Loading from '../components/Loading';
import Button from '../components/Button';
import { handleSaveFavoriteMeal,
  handleSaveFavoriteDrink } from '../helpers/saveFavoriteOnLocalStorage';
import { getDrinkIngredientsList,
  getMealIngredientsList } from '../helpers/getIngredientsAndQuantityList';
import getAndPutInProgRecipes from '../helpers/getAndPutInProgressRecipesOnLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './styles/RecipeInProgress.css';
import checkIfItsFavoritedOnStorage from '../helpers/checkIfItsFavoritedOnStorage';
// import { saveDoneRecipeOnLocalStorage } from '../helpers/saveDoneRecipesOnLocalStorage';

function RecipeInProgress() {
  const { id } = useParams();

  const { setLoading, isLinkCopied,
    handleOnClickShareBtn, isInTheFavorite,
    setIsInTheFavorite, mealOrDrinkInProgress,
    setMealOrDrinkInProgress } = useContext(detailsContext);

  const [isChecked, setIsChecked] = useState({
    drinks: { [id]: [] },
    meals: { [id]: [] },
  });

  const [recipeInProgress, setRecipeInProgress] = useState(null);

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

  useEffect(() => {
    if (pathname.includes('meals')) {
      setMealOrDrinkInProgress('meals');
    }
    if (pathname.includes('drinks')) {
      setMealOrDrinkInProgress('drinks');
    }
    fetchById();
  }, [pathname, id, fetchById, setMealOrDrinkInProgress]);

  const getCheckedFromStore = useCallback(() => {
    const checkboxes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: { [id]: [] },
      meals: { [id]: [] },
    };
    setIsChecked(checkboxes);
  }, [id]);

  useEffect(() => { getCheckedFromStore(); }, [getCheckedFromStore]);

  useEffect(() => {
    setIsInTheFavorite(checkIfItsFavoritedOnStorage(id));
  }, [setIsInTheFavorite, id]);

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

  const handleCheckboxClass = (ingredient) => {
    const { meals, drinks } = isChecked;
    if (pathname.includes('meals')) {
      return meals[id].includes(ingredient) ? 'checked-checkbox' : 'unchecked-checkbox';
    } if (pathname.includes('drinks')) {
      return drinks[id].includes(ingredient) ? 'checked-checkbox' : 'unchecked-checkbox';
    }
  };

  let ingredientsList = [];

  if (recipeInProgress && mealOrDrinkInProgress === 'meals') {
    ingredientsList = getMealIngredientsList(recipeInProgress);
  } else if (recipeInProgress && mealOrDrinkInProgress === 'drinks') {
    ingredientsList = getDrinkIngredientsList(recipeInProgress);
  }

  const mealsURL = `http://localhost:3000/meals/${id}`;
  const drinksURL = `http://localhost:3000/drinks/${id}`;

  if (!recipeInProgress) return <Loading />;

  const objectPath = recipeInProgress[mealOrDrinkInProgress][0];

  const isItMeal = mealOrDrinkInProgress === 'meals';

  const handleOnClickRedirectToDoneRecipes = () => {
    const date = new Date();
    const doneRecipe = {
      id: isItMeal ? objectPath.idMeal : objectPath.idDrink,
      nationality: objectPath.strArea || '',
      name: isItMeal ? objectPath.strMeal : objectPath.strDrink,
      category: objectPath.strCategory || '',
      image: isItMeal ? objectPath.strMealThumb : objectPath.strDrinkThumb,
      tags: objectPath.strTags ? objectPath.strTags.split(',') : [],
      alcoholicOrNot: objectPath.strAlcoholic || '',
      type: isItMeal ? 'meal' : 'drink',
      doneDate: date.toISOString(),
    };
    // saveDoneRecipeOnLocalStorage(doneRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
    history.push('/done-recipes');
    console.log(doneRecipe);
  };

  return (
    <main>
      <img
        data-testid="recipe-photo"
        src={
          isItMeal ? objectPath.strMealThumb
            : objectPath.strDrinkThumb
        }
        alt="img"
      />
      <h1
        data-testid="recipe-title"
      >
        {
          isItMeal ? objectPath.strMeal
            : objectPath.strDrink
        }
      </h1>
      <p
        data-testid="recipe-category"
      >
        { isItMeal ? objectPath.strCategory
          : objectPath.strAlcoholic }
      </p>
      <section>
        <div>
          <h4>Lista de ingredientes</h4>
          <ul>
            {
              ingredientsList.map((ingredient, index) => (
                <label
                  key={ `${ingredient} ${index}` }
                  data-testid={ `${index}-ingredient-step` }
                  className={ handleCheckboxClass(ingredient) }
                >
                  <input
                    data-testid="ingredient-step"
                    type="checkbox"
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
        </div>
      </section>

      <p
        data-testid="instructions"
      >
        { objectPath.strInstructions }
      </p>
      { isLinkCopied && <section><h4>Link copied!</h4></section> }
      <Button
        dataTestid="share-btn"
        textContent="Share"
        onClick={ () => handleOnClickShareBtn(
          isItMeal ? mealsURL
            : drinksURL,
        ) }
      />
      <input
        data-testid="favorite-btn"
        type="image"
        src={
          isInTheFavorite ? (blackHeartIcon) : (whiteHeartIcon)
        }
        onClick={
          isItMeal ? (() => {
            handleSaveFavoriteMeal(recipeInProgress, id);
            setIsInTheFavorite(!isInTheFavorite);
          }) : (() => {
            handleSaveFavoriteDrink(recipeInProgress, id);
            setIsInTheFavorite(!isInTheFavorite);
          })
        }
        alt=""
      />
      <button
        data-testid="finish-recipe-btn"
        disabled={
          isChecked[mealOrDrinkInProgress][id].length !== ingredientsList.length
        }
        onClick={ handleOnClickRedirectToDoneRecipes }
      >
        Finish Recipe

      </button>
    </main>
  );
}
export default RecipeInProgress;
