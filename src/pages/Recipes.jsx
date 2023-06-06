import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/Contexts/recipesContext';
import Loading from '../components/Loading';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';

function Recipes() {
  const {
    loading,
    setLoading,
    setMealsRecipes,
    setDrinksRecipes } = useContext(recipesContext);

  const history = useHistory();
  const { pathname } = history.location;
  const limitQuantity = 12;

  const fetchRecipes = useCallback(async () => {
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

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  if (loading) return <Loading />;

  return (
    <section>
      <Header />
      <RecipeCard />
    </section>
  );
}

export default Recipes;
