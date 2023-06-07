import React, { useCallback, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import recipesContext from '../context/Contexts/recipesContext';

function RecipeInProgress() {
  const { id } = useParams();
  const {
    loading,
    setLoading,
    recipeInProgress,
    setRecipeInProgress } = useContext(recipesContext);

  const history = useHistory();
  const { pathname } = history.location;

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
      const data = Object.values(dataJson)[0];
      setRecipeInProgress(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setAPIURL, setLoading, setRecipeInProgress]);

  const ingredientsNames = Object
    .keys(recipeInProgress[0] || []).filter((key) => key.includes('strIngredient'));

  const ingredientsList = ingredientsNames
    .map((ingredient) => recipeInProgress[0][ingredient] || [])
    .filter((ingredientName) => ingredientName.length > 0);

  // const ingredientsQuantities = Object
  //   .keys(recipeInProgress[0] || []).filter((key) => key.includes('strMeasure'));

  // const ingredientsQuantitiesList = ingredientsQuantities
  //   .map((ingredient) => recipeInProgress[0][ingredient])
  //   .filter((ingredientQtt) => ingredientQtt.length > 0);

  useEffect(() => {
    fetchById();
  }, [fetchById]);

  if (loading) return <Loading />;

  const objectPath = recipeInProgress[0];

  return (
    <main>
      {
        pathname.includes('meals') && (
          <div>
            <img
              data-testid="recipe-photo"
              src={ objectPath.strMealThumb }
              alt="img"
            />
            <h3 data-testid="recipe-title">{ objectPath.strMeal }</h3>
            <span data-testid="recipe-category">{ objectPath.strCategory }</span>
            <h4>Lista de ingredientes</h4>
            <ul>
              {
                ingredientsList.map((ingredient, index) => (
                  <li key={ index }>{ingredient}</li>
                ))
              }
            </ul>
            <p data-testid="instructions">{ objectPath.strInstructions }</p>
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
            src={ objectPath.strDrinkThumb }
            alt="img"
          />
          <h3 data-testid="recipe-title">{ objectPath.strDrink }</h3>
          <span data-testid="recipe-category">{ objectPath.strAlcoholic }</span>
          <h4>Lista de ingredientes</h4>
          <ul>
            {
              ingredientsList.map((ingredient, index) => (
                <li key={ index }>{ingredient}</li>
              ))
            }
          </ul>
          <p data-testid="instructions">{ objectPath.strInstructions }</p>
          <button data-testid="share-btn">Compartilhar</button>
          <button data-testid="favorite-btn">Favoritar</button>
          <button data-testid="finish-recipe-btn">Finalizar</button>
        </div>
      )
      }
    </main>
  );
}

export default RecipeInProgress;
