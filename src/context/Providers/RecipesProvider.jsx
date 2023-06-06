import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../Contexts/recipesContext';

function RecipesProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  const [mealsCategoryButtons, setMealsCategoryButtons] = useState([]);
  const [drinksCategoryButtons, setDrinksCategoryButtons] = useState([]);

  const history = useHistory();
  const { pathname } = history.location;

  const fetchRecipes = useCallback(async () => {
    const limitQuantity = 12;
    try {
      if (pathname === '/meals') {
        const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(API_URL);
        const dataJson = await response.json();
        const data = Object.values(dataJson)[0].slice(0, limitQuantity);
        setMealsRecipes(data);
      }
      if (pathname === '/drinks') {
        const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(API_URL);
        const dataJson = await response.json();
        const data = Object.values(dataJson)[0].slice(0, limitQuantity);
        setDrinksRecipes(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [pathname, setLoading, setMealsRecipes, setDrinksRecipes]);

  const fetchButtonsCategories = useCallback(async () => {
    const limitQuantity = 5;
    try {
      if (pathname === '/meals') {
        const API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        const response = await fetch(API_URL);
        const { meals } = await response.json();
        const data = meals.slice(0, limitQuantity);
        setMealsCategoryButtons(data);
      }
      if (pathname === '/drinks') {
        const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const response = await fetch(API_URL);
        const { drinks } = await response.json();
        const data = drinks.slice(0, limitQuantity);
        setDrinksCategoryButtons(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [pathname, setLoading, setDrinksCategoryButtons, setMealsCategoryButtons]);

  const value = useMemo(() => ({
    loading,
    setLoading,
    mealsRecipes,
    setMealsRecipes,
    drinksRecipes,
    setDrinksRecipes,
    mealsCategoryButtons,
    setMealsCategoryButtons,
    drinksCategoryButtons,
    setDrinksCategoryButtons,
    fetchRecipes,
    fetchButtonsCategories }), [
    loading, mealsRecipes,
    drinksRecipes, mealsCategoryButtons,
    drinksCategoryButtons, fetchRecipes,
    fetchButtonsCategories]);

  return (
    <recipesContext.Provider value={ value }>
      { children }
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesProvider;
