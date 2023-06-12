import { dataSearchDrinksWithFirstLetter, dataSearchDrinksWithIngredient, dataSearchDrinksWithName } from './mocks/searchDrinks';
import { dataSearchMealsWithFirstLetter, dataSearchMealsWithIngredient, dataSearchMealsWithName } from './mocks/searchMeals';

const mockFetchDataSearch = (url) => {
  if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Lentils') {
    return Promise.resolve({
      json: () => Promise.resolve(dataSearchMealsWithIngredient),
    });
  }

  if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Lasagne') {
    return Promise.resolve({
      json: () => Promise.resolve(dataSearchMealsWithName),
    });
  }

  if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=j') {
    return Promise.resolve({
      json: () => Promise.resolve(dataSearchMealsWithFirstLetter),
    });
  }

  if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Xablau') {
    return Promise.resolve({
      json: () => Promise.resolve({ meals: null }),
    });
  }

  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin') {
    return Promise.resolve({
      json: () => Promise.resolve(dataSearchDrinksWithIngredient),
    });
  }

  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=A1') {
    return Promise.resolve({
      json: () => Promise.resolve(dataSearchDrinksWithName),
    });
  }

  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=j') {
    return Promise.resolve({
      json: () => Promise.resolve(dataSearchDrinksWithFirstLetter),
    });
  }
};

export default mockFetchDataSearch;
