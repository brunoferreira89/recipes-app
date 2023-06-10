import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import detailsContext from '../context/Contexts/detailsContext';
import Loading from '../components/Loading';
import styles from './RecipeDetails.module.css';
import Recommendations from '../components/Recommendations';
import Button from '../components/Button';
import IframeYoutube from '../components/IframeYoutube';
import {
  getDrinkIngredientsList, getDrinkIngredientsQuantityList,
  getMealIngredientsList, getMealIngredientsQuantityList,
} from '../helpers/getIngredientsAndQuantityList';
import {
  handleSaveFavoriteDrink, handleSaveFavoriteMeal,
} from '../helpers/saveFavoriteOnLocalStorage';
import checkIfItsFavoritedOnStorage from '../helpers/checkIfItsFavoritedOnStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails() {
  const { id } = useParams();
  const {
    setLoading, data, setData, mealsOrDrinks,
    setMealsOrDrinks, setRecommendations, getLocalStorageDoneRecipes, isDoneRecipes,
    isInProgressRecipe, getLocalStorageIsInProgressRecipe, isLinkCopied,
    handleOnClickShareBtn, isInTheFavorite, setIsInTheFavorite,
  } = useContext(detailsContext);

  const history = useHistory();
  const page = history.location.pathname;

  const refreshGetData = useCallback(async (API_URL, detailOrRecommendation) => {
    try {
      const response = await fetch(API_URL);
      const dataJson = await response.json();
      if (detailOrRecommendation === 'details') {
        // if (!dataJson[mealsOrDrinks]) { throw new Error('Problems requesting the API'); }
        setData(dataJson);
      }
      // Fetch para pegar as recomendações
      if (detailOrRecommendation === 'recommendation') {
        const indexNumberThree = 3;
        const indexNumberFour = 4;
        const indexNumberFive = 5;
        const index = [0, 1, 2, indexNumberThree, indexNumberFour, indexNumberFive];
        const sixRecommendations = [];
        if (page.includes('meals')) {
          index.forEach((i) => sixRecommendations.push(dataJson.drinks[i]));
        }
        if (page.includes('drinks')) {
          index.forEach((i) => sixRecommendations.push(dataJson.meals[i]));
        }
        setRecommendations(sixRecommendations);
      }
    } catch (error) {
      // console.log(error.toString());
    } finally {
      setLoading(false);
    }
  }, [setData, setLoading, setRecommendations, page]);

  useEffect(() => {
    if (page.includes('meals')) {
      // Fetch inicial para pegar os detalhes das comidas
      setMealsOrDrinks('meals');
      const API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      refreshGetData(API_URL, 'details');
    }
    if (page.includes('drinks')) {
      // Fetch inicial para pegar os detalhes das bebidas
      setMealsOrDrinks('drinks');
      const API_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      refreshGetData(API_URL, 'details');
    }
  }, [id, page, refreshGetData, history, setMealsOrDrinks]);

  useEffect(() => {
    if (page.includes('meals')) {
      // Fetch para pegar as recomendações para as comidas
      const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      refreshGetData(API_URL, 'recommendation');
    }
    if (page.includes('drinks')) {
      // Fetch para pegar as recomendações para as bebidas
      const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      refreshGetData(API_URL, 'recommendation');
    }
  }, [page, refreshGetData]);

  useEffect(() => { getLocalStorageDoneRecipes(id); }, [getLocalStorageDoneRecipes, id]);
  useEffect(() => {
    if (mealsOrDrinks && id) getLocalStorageIsInProgressRecipe(mealsOrDrinks, id);
  }, [
    getLocalStorageIsInProgressRecipe, mealsOrDrinks, id,
  ]);
  useEffect(() => {
    setIsInTheFavorite(checkIfItsFavoritedOnStorage(id));
  }, [setIsInTheFavorite, id]);

  let ingredientsList = [];
  let ingredientsQuantityList = [];

  if (data && mealsOrDrinks === 'meals') {
    ingredientsList = getMealIngredientsList(data);
    ingredientsQuantityList = getMealIngredientsQuantityList(data);
  }

  if (data && mealsOrDrinks === 'drinks') {
    ingredientsList = getDrinkIngredientsList(data);
    ingredientsQuantityList = getDrinkIngredientsQuantityList(data);
  }

  const handleOnClickRedirectRecipeProgress = () => {
    history.push(`/${mealsOrDrinks}/${id}/in-progress`);
  };

  if (!data) return <Loading />;
  const objectPath = data[mealsOrDrinks][0];
  return (
    <main>
      <img
        data-testid="recipe-photo"
        className={ styles.imageMealOrDrink }
        src={
          mealsOrDrinks === 'meals' ? objectPath.strMealThumb
            : data[mealsOrDrinks][0].strDrinkThumb
        }
        alt="imagem"
      />

      <h1
        data-testid="recipe-title"
      >
        {
          mealsOrDrinks === 'meals' ? objectPath.strMeal
            : objectPath.strDrink
        }
      </h1>

      <p
        data-testid="recipe-category"
      >
        {
          mealsOrDrinks === 'meals' ? objectPath.strCategory
            : objectPath.strAlcoholic
        }
      </p>

      <section>
        <div>
          <h2>Ingredients</h2>
          <ul>
            {
              ingredientsList.map((ingredient, index) => (
                <li
                  key={ `${ingredient} ${index}` }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </li>
              ))
            }
          </ul>
        </div>

        <div>
          <h2>Quantities</h2>
          <ul>
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
      </section>

      <p
        data-testid="instructions"
      >
        { objectPath.strInstructions }
      </p>

      <IframeYoutube
        mealsOrDrinks={ mealsOrDrinks }
        className={ styles.iframe }
        objectPath={ objectPath }
      />

      <Recommendations />

      { isLinkCopied && <section><h4>Link copied!</h4></section> }

      <Button
        dataTestid="share-btn"
        textContent="Share"
        onClick={ () => handleOnClickShareBtn(window.location.href) }
      />
      <input
        data-testid="favorite-btn"
        type="image"
        src={
          isInTheFavorite ? (blackHeartIcon) : (whiteHeartIcon)
        }
        onClick={
          mealsOrDrinks === 'meals' ? (() => {
            handleSaveFavoriteMeal(data, id); setIsInTheFavorite(!isInTheFavorite);
          }) : (() => {
            handleSaveFavoriteDrink(data, id); setIsInTheFavorite(!isInTheFavorite);
          })
        }
        alt=""
      />

      <Button
        dataTestid="start-recipe-btn"
        className={
          !isDoneRecipes ? (styles.startRecipeBtnActive
          ) : styles.startRecipeBtnInactive
        }
        onClick={ handleOnClickRedirectRecipeProgress }
        textContent={ isInProgressRecipe ? 'Continue Recipe' : 'Start Recipe' }
      />
    </main>
  );
}

export default RecipeDetails;
