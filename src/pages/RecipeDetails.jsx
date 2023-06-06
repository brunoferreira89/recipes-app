import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import detailsContext from '../context/detailsContext';
import Loading from '../components/Loading';

function RecipeDetails() {
  const { id } = useParams();
  const {
    loading, setLoading, data, setData, mealsOrDrinks, setMealsOrDrinks,
  } = useContext(detailsContext);

  const history = useHistory();
  const page = history.location.pathname;

  const refreshGetData = useCallback(async (API_URL) => {
    try {
      const response = await fetch(API_URL);
      const dataJson = await response.json();
      setData(dataJson);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setData, setLoading]);

  useEffect(() => {
    if (page.includes('meals')) {
      const API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      refreshGetData(API_URL);
      setMealsOrDrinks('meals');
    }
    if (page.includes('drinks')) {
      const API_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      refreshGetData(API_URL);
      setMealsOrDrinks('drinks');
    }
  }, [id, page, refreshGetData, history, setMealsOrDrinks]);

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
        mealsOrDrinks === 'meals' ? (
          <iframe
            data-testid="video"
            width="560"
            height="315"
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
        ) : ''
      }
    </main>
  );
}

export default RecipeDetails;
