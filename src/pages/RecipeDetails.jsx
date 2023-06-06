import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import detailsContext from '../context/Contexts/detailsContext';
import Loading from '../components/Loading';
import styles from './RecipeDetails.module.css';
import Recommendations from '../components/Recommendations';

function RecipeDetails() {
  const { id } = useParams();
  const {
    loading, setLoading, data, setData, mealsOrDrinks, setMealsOrDrinks,
    setRecommendations,
  } = useContext(detailsContext);

  const history = useHistory();
  const page = history.location.pathname;

  const refreshGetData = useCallback(async (API_URL, detailOrRecommendation) => {
    try {
      const response = await fetch(API_URL);
      const dataJson = await response.json();
      if (detailOrRecommendation === 'details') {
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setData, setLoading, setRecommendations, page]);

  useEffect(() => {
    if (page.includes('meals')) {
      // Fetch inicial para pegar os detalhes das comidas
      const API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      refreshGetData(API_URL, 'details');
      setMealsOrDrinks('meals');
    }
    if (page.includes('drinks')) {
      // Fetch inicial para pegar os detalhes das bebidas
      const API_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      refreshGetData(API_URL, 'details');
      setMealsOrDrinks('drinks');
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

  let ingredientsList = [];
  let ingredientsQuantityList = [];

  if (data && mealsOrDrinks === 'meals') {
    const ingredientsKey = Object.keys(data.meals[0])
      .filter((key) => key.includes('strIngredient'));

    ingredientsList = ingredientsKey.map((ingredient) => data.meals[0][ingredient])
      .filter((element) => {
        if (typeof element === 'string') {
          return element.length > 0;
        }
        return element !== null;
      });

    const ingredientsQuantityKey = Object.keys(data.meals[0])
      .filter((key) => key.includes('strMeasure'));

    ingredientsQuantityList = ingredientsQuantityKey
      .map((ingredient) => data.meals[0][ingredient])
      .filter((element) => {
        if (typeof element === 'string') {
          return element.length > 0;
        }
        return element !== null;
      });
  }

  if (data && mealsOrDrinks === 'drinks') {
    const ingredientsKey = Object.keys(data.drinks[0])
      .filter((key) => key.includes('strIngredient'));

    ingredientsList = ingredientsKey.map((ingredient) => data.drinks[0][ingredient])
      .filter((element) => {
        if (typeof element === 'string') {
          return element.length > 0;
        }
        return element !== null;
      });

    const ingredientsQuantityKey = Object.keys(data.drinks[0])
      .filter((key) => key.includes('strMeasure'));

    ingredientsQuantityList = ingredientsQuantityKey
      .map((ingredient) => data.drinks[0][ingredient])
      .filter((element) => {
        if (typeof element === 'string') {
          return element.length > 0;
        }
        return element !== null;
      });
  }

  if (loading) return <Loading />;

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
          <h2>Ingredientes</h2>
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
          <h2>Quantidades</h2>
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
      {
        mealsOrDrinks === 'meals' && (
          <iframe
            data-testid="video"
            className={ styles.iframe }
            src={
              `https://www.youtube.com/embed/${objectPath.strYoutube
                .replace('https://www.youtube.com/watch?v=', '')}`
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write;
                  encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )
      }

      <Recommendations />

      <button
        data-testid="start-recipe-btn"
        className={ styles.startRecipeBtn }
      >
        Start Recipe
      </button>
    </main>
  );
}

export default RecipeDetails;
