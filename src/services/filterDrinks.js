async function FilterDrinks(parameter, radio, setDrinks, pathname) {
  const limitQuantity = 12;
  if (pathname === '/drinks' && radio === 'Ingredient') {
    const API_URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${parameter}`;
    const response = await fetch(API_URL);
    const dataJson = await response.json();
    const data = Object.values(dataJson)[0].slice(0, limitQuantity);
    setDrinks(data);
  }
  if (pathname === '/drinks' && radio === 'Name') {
    const API_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${parameter}`;
    const response = await fetch(API_URL);
    const dataJson = await response.json();
    const data = Object.values(dataJson)[0].slice(0, limitQuantity);
    setDrinks(data);
  }
  if (pathname === '/drinks' && radio === 'First letter') {
    const API_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${parameter}`;
    const response = await fetch(API_URL);
    const dataJson = await response.json();
    const data = Object.values(dataJson)[0].slice(0, limitQuantity);
    setDrinks(data);
  } if (parameter.length > 1 && radio === 'First letter') {
    global.alert('Your search must have only 1 (one) character');
  }
}

export default FilterDrinks;
