const getFetchMealsOrDrinksAndFilter = async (pathname, radio, parameter) => {
  let API_URL = '';
  let typeFilter = '';
  if (radio === 'Ingredient') typeFilter = 'i';
  if (radio === 'Name') typeFilter = 's';
  if (radio === 'First letter') typeFilter = 'f';

  if (pathname === '/meals' && radio === 'Ingredient') {
    API_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?${typeFilter}=${parameter}`;
  }
  if (pathname === '/meals' && radio !== 'Ingredient') {
    API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?${typeFilter}=${parameter}`;
  }

  if (pathname === '/drinks' && radio === 'Ingredient') {
    API_URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${typeFilter}=${parameter}`;
  }
  if (pathname === '/drinks' && radio !== 'Ingredient') {
    API_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${typeFilter}=${parameter}`;
  }

  const response = await fetch(API_URL);
  const dataJson = await response.json();
  return dataJson;
};

export default getFetchMealsOrDrinksAndFilter;
