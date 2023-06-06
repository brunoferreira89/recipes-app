import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import detailsContext from './detailsContext';

function DetailsProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [mealsOrDrinks, setMealsOrDrinks] = useState('');
  const [infoRender, setInfoRender] = useState(null);

  const value = useMemo(() => ({
    loading,
    setLoading,
    data,
    setData,
    mealsOrDrinks,
    setMealsOrDrinks,
    infoRender,
    setInfoRender,
  }), [
    loading, setLoading, data, setData, mealsOrDrinks, setMealsOrDrinks,
    infoRender, setInfoRender,
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
