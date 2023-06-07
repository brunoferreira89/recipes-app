import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import detailsContext from '../Contexts/detailsContext';

function DetailsProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [mealsOrDrinks, setMealsOrDrinks] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [indexCarouselActive, setIndexCarouselActive] = useState({
    initial: 0,
    final: 1,
  });
  const [isDoneRecipes, setIsDoneRecipes] = useState(false);
  const [isInProgressRecipe, setIsInProgressRecipe] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const getLocalStorageDoneRecipes = (id) => {
    const localStorageDoneRecipes = localStorage.getItem('doneRecipes');
    if (localStorageDoneRecipes) {
      const doneRecipesList = JSON.parse(localStorageDoneRecipes);
      const isDone = doneRecipesList
        .some((recipe) => Number(recipe.id) === Number(id));
      setIsDoneRecipes(isDone);
    }
  };

  const getLocalStorageIsInProgressRecipe = (isMealsOrDrinks, id) => {
    const localStorageIsInProgressRecipe = localStorage.getItem('inProgressRecipes');
    if (localStorageIsInProgressRecipe && isMealsOrDrinks) {
      const isInProgressRecipes = JSON.parse(localStorageIsInProgressRecipe);
      const keysOfMealsOrDrinks = Object.keys(isInProgressRecipes[isMealsOrDrinks]);
      const isInProgress = keysOfMealsOrDrinks.some((key) => key === id);
      setIsInProgressRecipe(isInProgress);
    }
  };

  const handleOnCLickShareBtn = (page) => {
    setIsLinkCopied(true);
    clipboardCopy(page);
    const intervalTime = 3000;
    setTimeout(() => { setIsLinkCopied(false); }, intervalTime);
  };

  const value = useMemo(() => ({
    loading,
    setLoading,
    data,
    setData,
    mealsOrDrinks,
    setMealsOrDrinks,
    recommendations,
    setRecommendations,
    indexCarouselActive,
    setIndexCarouselActive,
    isDoneRecipes,
    getLocalStorageDoneRecipes,
    isInProgressRecipe,
    getLocalStorageIsInProgressRecipe,
    isLinkCopied,
    handleOnCLickShareBtn,
  }), [
    loading, setLoading, data, setData, mealsOrDrinks, setMealsOrDrinks,
    recommendations, setRecommendations, indexCarouselActive, setIndexCarouselActive,
    isDoneRecipes, isInProgressRecipe, isLinkCopied,
  ]);

  return (
    <detailsContext.Provider value={ value }>
      {children}
    </detailsContext.Provider>
  );
}

DetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsProvider;
