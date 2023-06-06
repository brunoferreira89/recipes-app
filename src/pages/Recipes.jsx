import React, { useContext, useEffect } from 'react';
import recipesContext from '../context/Contexts/recipesContext';
import Loading from '../components/Loading';
import RecipeCard from '../components/RecipeCard';
import CategoriesButtons from '../components/CategoriesButtons';
import Header from '../components/Header';

function Recipes() {
  const {
    loading, fetchRecipes, fetchButtonsCategories } = useContext(recipesContext);

  useEffect(() => {
    fetchRecipes();
    fetchButtonsCategories();
  }, [fetchRecipes, fetchButtonsCategories]);

  if (loading) return <Loading />;

  return (
    <section>
      <Header />
      <CategoriesButtons />      
      <RecipeCard />
    </section>
  );
}

export default Recipes;
