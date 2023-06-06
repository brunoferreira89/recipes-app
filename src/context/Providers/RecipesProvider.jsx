import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import recipesContext from '../Contexts/recipesContext';

function RecipesProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [drinksRecipes, setDrinksRecipes] = useState([]);

  const value = useMemo(() => ({
    loading,
    setLoading,
    mealsRecipes,
    setMealsRecipes,
    drinksRecipes,
    setDrinksRecipes }), [loading, mealsRecipes, drinksRecipes]);

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
