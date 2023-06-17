import React, { useContext, useEffect } from 'react';
import recipesContext from '../context/Contexts/recipesContext';
import Loading from '../components/Loading';
import RecipeCard from '../components/RecipeCard';
import CategoriesButtons from '../components/CategoriesButtons';
import searchContext from '../context/Contexts/searchContext';
import SearchResultCard from '../components/SearchResultCard';
import SlideHomeRecommendation from '../components/SlideHomeRecommendation';
import styles from './styles/Recipes.module.css';
import headerContext from '../context/Contexts/headerContext';

function Recipes() {
  const { pageUrl } = useContext(headerContext);
  const { bool } = useContext(searchContext);
  const {
    loading, fetchRecipes, fetchButtonsCategories } = useContext(recipesContext);

  useEffect(() => {}, [pageUrl]);

  useEffect(() => {
    fetchRecipes();
    fetchButtonsCategories();
  }, [fetchRecipes, fetchButtonsCategories]);

  if (loading) return <Loading />;

  return (
    <section className={ styles.wrapPrincipalContainer }>
      {
        bool ? <SearchResultCard /> : (
          <>
            <h1 className={ styles.principalTitle }>
              { pageUrl === '/meals' ? 'Meals' : 'Drinks'}
            </h1>
            <SlideHomeRecommendation />
            <CategoriesButtons />
            <RecipeCard />
          </>
        )
      }

    </section>
  );
}

export default Recipes;
