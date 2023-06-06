import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
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

  const getLocalStorageDoneRecipes = (id) => {
    const localStorageDoneRecipes = localStorage.getItem('doneRecipes');
    if (localStorageDoneRecipes) {
      const doneRecipesList = JSON.parse(localStorageDoneRecipes);
      const isDone = doneRecipesList
        .some((recipe) => Number(recipe.id) === Number(id));
      setIsDoneRecipes(isDone);
    }
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
  }), [
    loading, setLoading, data, setData, mealsOrDrinks, setMealsOrDrinks,
    recommendations, setRecommendations, indexCarouselActive, setIndexCarouselActive,
    isDoneRecipes,
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
