import dataDetailMeal from './detailMealMockData';
import dataDetailDrink from './detailDrinkMockData';
import dataRecommMeals from './recommMealsMockData';
import dataRecommDrinks from './recommDrinksMockData';

const mockFetch = (url) => {
  if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') {
    return Promise.resolve({
      json: () => Promise.resolve(dataDetailMeal),
    });
  }

  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') {
    return Promise.resolve({
      json: () => Promise.resolve(dataDetailDrink),
    });
  }

  if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
    return Promise.resolve({
      json: () => Promise.resolve(dataRecommMeals),
    });
  }

  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
    return Promise.resolve({
      json: () => Promise.resolve(dataRecommDrinks),
    });
  }
};

export default mockFetch;
