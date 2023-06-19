import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Heart, ShareNetwork } from '@phosphor-icons/react';
import detailsContext from '../context/Contexts/detailsContext';
import Loading from '../components/Loading';
import styles from './styles/RecipeDetails.module.css';
import Button from '../components/Button';
import {
  getDrinkIngredientsList, getDrinkIngredientsQuantityList,
  getMealIngredientsList, getMealIngredientsQuantityList,
} from '../helpers/getIngredientsAndQuantityList';
import {
  handleSaveFavoriteDrink, handleSaveFavoriteMeal,
} from '../helpers/saveFavoriteOnLocalStorage';
import checkIfItsFavoritedOnStorage from '../helpers/checkIfItsFavoritedOnStorage';
import headerContext from '../context/Contexts/headerContext';
import PlayerOnDetails from '../components/PlayerOnDetails';
import BtnInstructionsShow from '../components/BtnInstructionsShow';
import SlideHomeRecommendation from '../components/SlideRecommendations';

function RecipeDetails() {
  const { id } = useParams();
  const {
    setLoading, data, setData, mealsOrDrinks,
    setMealsOrDrinks, setRecommendations, getLocalStorageDoneRecipes, isDoneRecipes,
    isInProgressRecipe, getLocalStorageIsInProgressRecipe, isLinkCopied,
    handleOnClickShareBtn, isInTheFavorite, setIsInTheFavorite,
  } = useContext(detailsContext);
  const { setPageUrl } = useContext(headerContext);
  useEffect(() => { window.scrollTo(0, 0); }, [data]);
  const history = useHistory();
  const page = history.location.pathname;

  const refreshGetData = useCallback(async (API_URL, detailOrRecommendation) => {
    setLoading(true);
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
    setLoading(false);
  }, [setData, setLoading, setRecommendations, page]);

  useEffect(() => {
    if (page.includes('meals')) {
      // Fetch inicial para pegar os detalhes das comidas
      setMealsOrDrinks('meals');
      let API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      refreshGetData(API_URL, 'details');
      // Fetch para pegar as recomendações para as comidas
      API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      refreshGetData(API_URL, 'recommendation');
    }
    if (page.includes('drinks')) {
      // Fetch inicial para pegar os detalhes das bebidas
      setMealsOrDrinks('drinks');
      let API_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      refreshGetData(API_URL, 'details');
      // Fetch para pegar as recomendações para as bebidas
      API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      refreshGetData(API_URL, 'recommendation');
    }
  }, [id, page, refreshGetData, history, setMealsOrDrinks]);

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
    setPageUrl(`/${mealsOrDrinks}/${id}/in-progress`);
    history.push(`/${mealsOrDrinks}/${id}/in-progress`);
  };
  if (!data) return <Loading />;
  const objectPath = data?.[mealsOrDrinks][0];

  return (
    <main className={ styles.mainRecipeDetails }>
      <header>
        <img
          data-testid="recipe-photo"
          className={ styles.imageMealOrDrink }
          src={
            mealsOrDrinks === 'meals' ? objectPath.strMealThumb
              : objectPath.strDrinkThumb
          }
          alt="imagem"
        />
        <span
          data-testid="recipe-category"
          className={ styles.category }
        >
          {
            mealsOrDrinks === 'meals' ? objectPath.strCategory
              : objectPath.strAlcoholic
          }
        </span>
        <PlayerOnDetails mealsOrDrinks={ mealsOrDrinks } objectPath={ objectPath } />
      </header>

      <main className={ styles.mainDetails }>
        <section className={ styles.titleContainer }>
          <h1
            data-testid="recipe-title"
          >
            { mealsOrDrinks === 'meals' ? objectPath.strMeal
              : objectPath.strDrink}
          </h1>

          { isLinkCopied && <section><h4>Link copied!</h4></section> }

          <div className={ styles.iconsActionsContainer }>
            <Button
              dataTestid="share-btn"
              textContent={ <ShareNetwork size={ 24 } /> }
              onClick={ () => handleOnClickShareBtn(window.location.href) }
              className={ styles.shareIcon }
            />
            <Button
              dataTestid="favorite-btn"
              textContent={ isInTheFavorite ? (
                <Heart size={ 24 } weight="fill" />
              ) : (<Heart size={ 24 } weight="regular" />) }
              onClick={ mealsOrDrinks === 'meals' ? (() => {
                handleSaveFavoriteMeal(data, id); setIsInTheFavorite(!isInTheFavorite);
              }) : (() => {
                handleSaveFavoriteDrink(data, id); setIsInTheFavorite(!isInTheFavorite);
              }) }
              className={ isInTheFavorite ? styles.heartIconActive : styles.heartIcon }
            />
          </div>
        </section>
        <div className={ styles.separator } />
        <section>
          <div className={ styles.ingredientsTitleContainer }>
            <h2>Ingredients</h2>
            <h2 className={ styles.ingredientsQtdTitle }>
              { `${ingredientsList.length} item` }
            </h2>
          </div>
          <div className={ styles.ingredientsContainer }>
            <ul className={ styles.ingredientsContent }>
              {
                ingredientsList.map((ingredient, index) => (
                  <li
                    key={ `${ingredient} ${index}` }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    className={ styles.ingredient }
                  >
                    <div className={ styles.ingredientImgContainer }>
                      <img
                        className={ styles.ingredientImg }
                        src={
                          mealsOrDrinks === 'meals' ? (
                            `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`
                          ) : (
                            `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`)
                        }
                        alt={ ingredient }
                      />
                    </div>
                    {ingredient}
                  </li>
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
        </section>
        <div className={ styles.separator } />
        <BtnInstructionsShow objectPath={ objectPath } />
        <div className={ styles.separator } />
      </main>
      <footer className={ styles.footerRecommendation }>
        <h3>Recommendations</h3>
        <SlideHomeRecommendation />
      </footer>
      <Button
        dataTestid="start-recipe-btn"
        className={
          !isDoneRecipes ? (styles.startRecipeBtnActive
          ) : styles.startRecipeBtnInactive
        }
        onClick={ handleOnClickRedirectRecipeProgress }
        textContent={
          isInProgressRecipe ? 'Continue Recipe' : 'Start Recipe'
        }
      />
    </main>
  );
}

export default RecipeDetails;
