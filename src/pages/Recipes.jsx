import React, { useContext, useEffect } from 'react';
import recipesContext from '../context/Contexts/recipesContext';
import Loading from '../components/Loading';
import RecipeCard from '../components/RecipeCard';
import CategoriesButtons from '../components/CategoriesButtons';

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
      <CategoriesButtons />
      <RecipeCard />
    </section>
  );
}

export default Recipes;
