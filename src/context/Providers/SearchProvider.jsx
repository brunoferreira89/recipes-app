import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import searchContext from '../Contexts/searchContext';

function SearchProvider({ children }) {
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isNotResult, setIsNotResult] = useState(false);
  const [isNotFirstLetter, setIsNotFirstLetter] = useState(false);

  const value = useMemo(() => ({
    search,
    setSearch,
    radio,
    setRadio,
    meals,
    setMeals,
    drinks,
    setDrinks,
    isSearch,
    setIsSearch,
    isNotResult,
    setIsNotResult,
    isNotFirstLetter,
    setIsNotFirstLetter,
  }), [search, radio, meals, drinks, isSearch, isNotResult, isNotFirstLetter]);
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
