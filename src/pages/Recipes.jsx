import React, { useContext, useEffect } from 'react';
import recipesContext from '../context/Contexts/recipesContext';
import Loading from '../components/Loading';
import RecipeCard from '../components/RecipeCard';
import CategoriesButtons from '../components/CategoriesButtons';
import searchContext from '../context/Contexts/searchContext';
import SearchResultCard from '../components/SearchResultCard';
import Footer from '../components/Footer';

function Recipes() {
  const { bool } = useContext(searchContext);
  const {
    loading, fetchRecipes, fetchButtonsCategories } = useContext(recipesContext);

  useEffect(() => {
    fetchRecipes();
    fetchButtonsCategories();
  }, [fetchRecipes, fetchButtonsCategories]);

  if (loading) return <Loading />;

  return (
    <section>
      {
        bool ? <SearchResultCard /> : (
          <>
            <CategoriesButtons />
            <RecipeCard />
            <Footer />
          </>
        )
      }

    </section>
  );
}

export default Recipes;
