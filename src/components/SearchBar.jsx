import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FilterDrinks from '../services/filterDrinks';
import searchContext from '../context/Contexts/searchContext';

function SearchBar() {
  const history = useHistory();
  const {
    search,
    setSearch,
    radio,
    setRadio,
    meals,
    setMeals,
    drinks,
    setDrinks,
    setBool,
  } = useContext(searchContext);
  const { pathname } = history.location;
  const limitQuantity = 12;
  const fetchRecipes = async (parameter) => {
    const fl = 'First letter';
    try {
      if (pathname === '/meals' && radio === 'Ingredient') {
        const API_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${parameter}`;
        const response = await fetch(API_URL);
        const dataJson = await response.json();
        const data = Object.values(dataJson)[0].slice(0, limitQuantity);
        setMeals(data);
      }
      if (pathname === '/meals' && radio === 'Name') {
        const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${parameter}`;
        const response = await fetch(API_URL);
        const dataJson = await response.json();
        const data = Object.values(dataJson)[0].slice(0, limitQuantity);
        setMeals(data);
      }
      if (pathname === '/meals' && radio === fl && parameter.length <= 1) {
        const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${parameter}`;
        const response = await fetch(API_URL);
        const dataJson = await response.json();
        const data = Object.values(dataJson)[0].slice(0, limitQuantity);
        setMeals(data);
      } if (parameter.length > 1 && radio === fl) {
        global.alert('Your search must have only 1 (one) character');
      }
      FilterDrinks(parameter, radio, setDrinks, pathname);
    } catch (error) {
      console.log(error);
    } finally {
      setBool(true);
    }
  };

  // useEffect(() => {
  //   fetchRecipes();
  // }, [fetchRecipes]);
  if (meals.length === 1) {
    history.push(`/meals/${meals[0].idMeal}`);
  }
  if (drinks.length === 1) {
    history.push(`/drinks/${drinks[0].idDrink}`);
  }

  return (
    <div>
      <input
        data-testid="search-input"
        placeholder="Search"
        type="text"
        value={ search }
        onChange={ ({ target }) => setSearch(target.value) }
      />
      <div>
        <label htmlFor="ingredients">
          Ingredient
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="radio"
            id="ingredients"
            value="Ingredient"
            checked={ radio === 'Ingredient' }
            onChange={ ({ target }) => setRadio(target.value) }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            data-testid="name-search-radio"
            type="radio"
            name="radio"
            id="name"
            value="Name"
            checked={ radio === 'Name' }
            onChange={ ({ target }) => setRadio(target.value) }
          />
        </label>
        <label>
          First letter
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="radio"
            id="first-letter"
            value="First letter"
            checked={ radio === 'First letter' }
            onChange={ ({ target }) => setRadio(target.value) }
          />
        </label>
      </div>
      <button
        onClick={ () => fetchRecipes(search) }
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
