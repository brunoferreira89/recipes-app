import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import searchContext from '../Contexts/searchContext';

function SearchProvider({ children }) {
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState();
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [bool, setBool] = useState(false);

  const value = useMemo(() => ({
    search,
    setSearch,
    radio,
    setRadio,
    meals,
    setMeals,
    drinks,
    setDrinks,
    bool,
    setBool,
  }), [search, radio, meals, drinks, bool]);
  return (
    <searchContext.Provider value={ value }>
      {children}
    </searchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchProvider;
