import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Heart, ShareNetwork } from '@phosphor-icons/react';
import detailsContext from '../context/Contexts/detailsContext';
import Loading from '../components/Loading';
import Button from '../components/Button';
import { handleSaveFavoriteMeal,
  handleSaveFavoriteDrink } from '../helpers/saveFavoriteOnLocalStorage';
import { getDrinkIngredientsList,
  getDrinkIngredientsQuantityList,
  getMealIngredientsList,
  getMealIngredientsQuantityList } from '../helpers/getIngredientsAndQuantityList';
import checkIfItsFavoritedOnStorage from '../helpers/checkIfItsFavoritedOnStorage';
import { handleSaveDoneRecipe } from '../helpers/saveDoneRecipesOnLocalStorage';
import getAndPutInProgRecipes from '../helpers/getAndPutInProgressRecipesOnLocalStorage';
import styles from './styles/RecipeInProgress.module.css';
import headerContext from '../context/Contexts/headerContext';
import IngredientsAndQtdList from '../components/IngredientsAndQtdList';
import BtnInstructionsShow from '../components/BtnInstructionsShow';

function RecipeInProgress() {
  const { id } = useParams();

  const { setLoading, isLinkCopied,
    handleOnClickShareBtn, isInTheFavorite,
    setIsInTheFavorite, mealOrDrinkInProgress,
    setMealOrDrinkInProgress } = useContext(detailsContext);

  const { setPageUrl } = useContext(headerContext);
  const [isChecked, setIsChecked] = useState({
    drinks: { [id]: [] }, meals: { [id]: [] },
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
    const response = await fetch(setAPIURL());
    const dataJson = await response.json() || {};
    setRecipeInProgress(dataJson);
    setLoading(false);
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
      return meals[id].includes(ingredient) ? (
        styles.checkedCheckbox
      ) : styles.uncheckedCheckbox;
    } if (pathname.includes('drinks')) {
      return drinks[id].includes(ingredient) ? (
        styles.checkedCheckbox
      ) : styles.uncheckedCheckbox;
    }
  };

  let ingredientsList = [];
  let ingredientsQuantityList = [];
  if (recipeInProgress && mealOrDrinkInProgress === 'meals') {
    ingredientsList = getMealIngredientsList(recipeInProgress);
    ingredientsQuantityList = getMealIngredientsQuantityList(recipeInProgress);
  } else if (recipeInProgress && mealOrDrinkInProgress === 'drinks') {
    ingredientsList = getDrinkIngredientsList(recipeInProgress);
    ingredientsQuantityList = getDrinkIngredientsQuantityList(recipeInProgress);
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
    handleSaveDoneRecipe(doneRecipe, id);
    setPageUrl('/done-recipes');
    history.push('/done-recipes');
  };

  return (
    <main className={ styles.mainRecipeProgress }>
      <header>
        <img
          className={ styles.imageMealOrDrink }
          data-testid="recipe-photo"
          src={
            isItMeal ? objectPath.strMealThumb
              : objectPath.strDrinkThumb
          }
          alt=""
        />
        <span
          data-testid="recipe-category"
          className={ styles.category }
        >
          { isItMeal ? objectPath.strCategory
            : objectPath.strAlcoholic }
        </span>
      </header>
      <main className={ styles.mainDetails }>
        <section className={ styles.titleContainer }>
          <h1
            data-testid="recipe-title"
          >
            { isItMeal ? objectPath.strMeal
              : objectPath.strDrink}
          </h1>
          { isLinkCopied && <section><h4>Link copied!</h4></section> }
          <div className={ styles.iconsActionsContainer }>
            <Button
              dataTestid="share-btn"
              textContent={ <ShareNetwork size={ 24 } /> }
              onClick={ () => handleOnClickShareBtn(
                isItMeal ? mealsURL
                  : drinksURL,
              ) }
              className={ styles.shareIcon }
            />
            <Button
              dataTestid="favorite-btn"
              textContent={ isInTheFavorite ? (
                <Heart size={ 24 } weight="fill" />
              ) : (<Heart size={ 24 } weight="regular" />) }
              onClick={ isItMeal ? (() => {
                handleSaveFavoriteMeal(recipeInProgress, id);
                setIsInTheFavorite(!isInTheFavorite);
              }) : (() => {
                handleSaveFavoriteDrink(recipeInProgress, id);
                setIsInTheFavorite(!isInTheFavorite);
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
          <IngredientsAndQtdList
            id={ id }
            isItMeal={ isItMeal }
            mealOrDrinkInProgress={ mealOrDrinkInProgress }
            isChecked={ isChecked }
            handleCheckbox={ handleCheckbox }
            handleCheckboxClass={ handleCheckboxClass }
            ingredientsList={ ingredientsList }
            ingredientsQuantityList={ ingredientsQuantityList }
          />
        </section>
        <div className={ styles.separator } />
        <BtnInstructionsShow objectPath={ objectPath } />
        <div className={ styles.separator } />
      </main>
      <button
        data-testid="finish-recipe-btn"
        className={
          isChecked[mealOrDrinkInProgress][id].length === ingredientsList.length
            ? (styles.finishRecipeBtnActive
            ) : styles.finishRecipeBtnInactive
        }
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
