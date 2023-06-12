import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import searchContext from '../context/Contexts/searchContext';
import getFetchMealsOrDrinksAndFilter from '../helpers/getFetchMealsOrDrinksAndFilter';

const alertOfSearchNotFound = () => global
  .alert('Sorry, we haven\'t found any recipes for these filters.');

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
    try {
      if (parameter.length > 1 && radio === 'First letter') {
        global.alert('Your search must have only 1 (one) character');
      }

      const dataJson = await getFetchMealsOrDrinksAndFilter(pathname, radio, parameter);

      if (pathname === '/meals' && dataJson.meals !== null) {
        const data = Object.values(dataJson)[0].slice(0, limitQuantity);
        setMeals(data);
      }
      if (pathname === '/meals' && dataJson.meals === null) alertOfSearchNotFound();

      if (pathname === '/drinks' && dataJson.drinks !== null) {
        const data = Object.values(dataJson)[0].slice(0, limitQuantity);
        setDrinks(data);
      }
      if (pathname === '/drinks' && dataJson.drinks === null) alertOfSearchNotFound();
    } catch (error) {
      // if (error.toString() === 'SyntaxError: Unexpected end of JSON input') {
      //   alertOfSearchNotFound();
      // }
    } finally {
      setBool(true);
    }
  };

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
