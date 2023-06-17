import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { MagnifyingGlass } from '@phosphor-icons/react';
import searchContext from '../context/Contexts/searchContext';
import getFetchMealsOrDrinksAndFilter from '../helpers/getFetchMealsOrDrinksAndFilter';
import styles from './styles/SearchBar.module.css';
import headerContext from '../context/Contexts/headerContext';

// const alertOfSearchNotFound = () => global
//   .alert('Sorry, we haven\'t found any recipes for these filters.');

function SearchBar({ setSearch: setSearchBar }) {
  const history = useHistory();
  const {
    search, setSearch, radio, setRadio, meals, setMeals, drinks,
    setDrinks, setIsSearch, setIsNotResult, setIsNotFirstLetter,
  } = useContext(searchContext);
  const { pageUrl } = useContext(headerContext);

  const limitQuantity = 12;
  const fetchRecipes = async (parameter) => {
    try {
      if (parameter.length > 1 && radio === 'First letter') {
        // global.alert('Your search must have only 1 (one) character');
        setMeals([]);
        setDrinks([]);
        setIsNotResult(false);
        setIsNotFirstLetter(true);
      }

      const dataJson = await getFetchMealsOrDrinksAndFilter(pageUrl, radio, parameter);

      if (pageUrl === '/meals' && dataJson.meals !== null) {
        const data = Object.values(dataJson)[0].slice(0, limitQuantity);
        setDrinks([]);
        setIsNotResult(false);
        setIsNotFirstLetter(false);
        setMeals(data);
      }

      if (pageUrl === '/drinks' && dataJson.drinks !== null) {
        const data = Object.values(dataJson)[0].slice(0, limitQuantity);
        setMeals([]);
        setIsNotResult(false);
        setIsNotFirstLetter(false);
        setDrinks(data);
      }

      if ((pageUrl === '/meals' && dataJson.meals === null)
        || (pageUrl === '/drinks' && dataJson.drinks === null)) {
        setMeals([]);
        setDrinks([]);
        setIsNotFirstLetter(false);
        setIsNotResult(true);
      }
    } catch (error) {
      // if (error.toString() === 'SyntaxError: Unexpected end of JSON input') {
      //   alertOfSearchNotFound();
      // }
    } finally {
      setIsSearch(true);
    }
  };

  if (meals.length === 1) {
    history.push(`/meals/${meals[0].idMeal}`);
  }
  if (drinks.length === 1) {
    history.push(`/drinks/${drinks[0].idDrink}`);
  }

  return (
    <div className={ styles.searchBarContainer }>
      <section className={ styles.inputAndBtnSearchContainer }>
        <input
          data-testid="search-input"
          className={ styles.inputSearch }
          placeholder={ `Search ${pageUrl === '/meals' ? 'meal' : 'drink'}` }
          type="text"
          value={ search }
          onChange={ ({ target }) => setSearch(target.value) }
        />
        <button
          className={ styles.searchBtn }
          onClick={ () => {
            setSearchBar(false);
            fetchRecipes(search);
            setSearch('');
            setRadio('');
          } }
          data-testid="exec-search-btn"
        >
          Search
          <MagnifyingGlass size={ 20 } />
        </button>
      </section>
      <section className={ styles.radioBtnSearchContainer }>
        <label htmlFor="ingredients">
          Ingredient
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            className={ styles.radioBtn }
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
            className={ styles.radioBtn }
            name="radio"
            id="name"
            value="Name"
            checked={ radio === 'Name' }
            onChange={ ({ target }) => setRadio(target.value) }
          />
        </label>
        <label htmlFor="first-letter">
          First letter
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            className={ styles.radioBtn }
            name="radio"
            id="first-letter"
            value="First letter"
            checked={ radio === 'First letter' }
            onChange={ ({ target }) => setRadio(target.value) }
          />
        </label>
      </section>
    </div>
  );
}

SearchBar.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default SearchBar;
