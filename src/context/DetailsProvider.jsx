import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import detailsContext from './detailsContext';

function DetailsProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [mealsOrDrinks, setMealsOrDrinks] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [indexCarouselActive, setIndexCarouselActive] = useState({
    initial: 0,
    final: 1,
  });

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
  }), [
    loading, setLoading, data, setData, mealsOrDrinks, setMealsOrDrinks,
    recommendations, setRecommendations, indexCarouselActive, setIndexCarouselActive,
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
