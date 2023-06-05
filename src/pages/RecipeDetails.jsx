import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import detailsContext from '../context/detailsContext';

function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  const { setData } = useContext(detailsContext);

  const refreshMeal = useCallback(async (URL) => {
    const response = await fetch(URL);
    const dataJson = await response.json();
    setData(dataJson);
  }, [setData]);

  useEffect(() => {
    if (history.location.pathname.includes('meals')) {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      refreshMeal(URL);
    }
    if (history.location.pathname.includes('drinks')) {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      refreshMeal(URL);
    }
  }, [id, refreshMeal, history]);

  return (
    <div>{ id }</div>
  );
}

export default RecipeDetails;
