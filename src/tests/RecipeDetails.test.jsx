import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import mockFetch from './helpers/mockFetchData';
import dataDetailMealObj from './helpers/mocks/detailMealMockData';
// import dataDetailDrinkObj from './helpers/mocks/detailDrinkMockData';
import dataRecommDrinksObj from './helpers/mocks/recommDrinksMockData';
// import dataRecommMealsObj from './helpers/mocks/recommMealsMockData';

const teaspoonText = '1/2 teaspoon';
const dataDetailMeal = dataDetailMealObj.meals[0];
// const dataDetailDrink = dataDetailDrinkObj.drinks[0];
const dataRecommDrinks = dataRecommDrinksObj.drinks;
// const dataRecommMeals = dataRecommMealsObj.drinks;

describe('Verifica a tela de detalhes das receitas e bebidas', () => {
  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));
  afterEach(() => jest.clearAllMocks());

  it('Testa a renderização das comidas', async () => {
    const ingredientsList = [
      'penne rigate', 'olive oil', 'garlic', 'chopped tomatoes',
      'red chile flakes', 'italian seasoning', 'basil', 'Parmigiano-Reggiano',
    ];
    const ingredientsQuantityList = [
      '1 pound', '1/4 cup', '3 cloves', '1 tin', teaspoonText,
      teaspoonText, '6 leaves', 'spinkling',
    ];

    renderWithRouterAndContext(<App />, ['/meals/52771']);

    const timeWait = 3000;

    await waitFor(() => expect(screen.queryByText('Loading...'))
      .not.toBeInTheDocument(), timeWait);

    const imageMeal = screen.getByTestId('recipe-photo');
    const titleMeal = screen.getByTestId('recipe-title');
    const categoryMeal = screen.getByTestId('recipe-category');
    const ingredientesText = screen.getByText(/ingredientes/i);

    expect(imageMeal.getAttribute('src')).toBe(dataDetailMeal.strMealThumb);
    expect(titleMeal.innerHTML).toBe(dataDetailMeal.strMeal);
    expect(categoryMeal.innerHTML).toBe(dataDetailMeal.strCategory);
    expect(ingredientesText).toBeInTheDocument();

    ingredientsList.forEach((ingredient) => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });

    ingredientsQuantityList.forEach((ingredient) => {
      if (ingredient !== teaspoonText) {
        expect(screen.getByText(ingredient)).toBeInTheDocument();
      } else {
        expect(screen.getAllByText(ingredient).length).toBe(2);
      }
    });

    const textInstruction = screen.getByText(/bring a large pot of water to a boil\. add kosher salt to the boiling water, then add the pasta\. cook according to the package instructions, about 9 minutes\. in a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer\. add the garlic and cook, stirring, until fragrant, 1 to 2 minutes\. add the chopped tomatoes, red chile flakes, italian seasoning and salt and pepper to taste\. bring to a boil and cook for 5 minutes\. remove from the heat and add the chopped basil\. drain the pasta and add it to the sauce\. garnish with parmigiano-reggiano flakes and more basil and serve warm\./i);

    expect(textInstruction).toBeInTheDocument();
    expect(screen.getByTitle(/youtube video player/i)).toBeInTheDocument();

    const recommendationsText = screen.getByText(/recommendations/i);
    expect(recommendationsText).toBeInTheDocument();

    const arrowLeft = screen.getByTestId('arrow-left');
    const arrowRight = screen.getByTestId('arrow-right');

    expect(arrowLeft).toBeInTheDocument();
    expect(arrowRight).toBeInTheDocument();

    dataRecommDrinks.forEach((recommendation, index) => {
      const imgRecommendation = screen.getByTestId(`${index}-recommendation-img`);
      const titleRecommendation = screen.getByTestId(`${index}-recommendation-title`);

      expect(imgRecommendation.getAttribute('src')).toBe(recommendation.strDrinkThumb);
      expect(titleRecommendation.innerHTML).toBe(recommendation.strDrink);
    });

    const btnStartRecipe = screen.getByRole('button', { name: /start recipe/i });
    expect(btnStartRecipe).toBeInTheDocument();
  });
});
