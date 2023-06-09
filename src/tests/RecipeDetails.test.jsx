import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import mockFetch from './helpers/mockFetchData';
import dataDetailMealObj from './helpers/mocks/detailMealMockData';
import dataDetailDrinkObj from './helpers/mocks/detailDrinkMockData';
import dataRecommDrinksObj from './helpers/mocks/recommDrinksMockData';
import dataRecommMealsObj from './helpers/mocks/recommMealsMockData';

const timeWait = 3000;
const urlMealDetailPath = '/meals/52771';
const teaspoonText = '1/2 teaspoon';
const loadingText = 'Loading...';
const whiteHeartIconPath = 'whiteHeartIcon.svg';
const dataDetailMeal = dataDetailMealObj.meals[0];
const dataDetailDrink = dataDetailDrinkObj.drinks[0];
const dataRecommDrinks = dataRecommDrinksObj.drinks;
const dataRecommMeals = dataRecommMealsObj.meals;

describe('Verifica a tela de detalhes das receitas e bebidas', () => {
  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));
  afterEach(() => jest.clearAllMocks());

  it('Testa a renderização das comidas', async () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    const ingredientsList = [
      'penne rigate', 'olive oil', 'garlic', 'chopped tomatoes',
      'red chile flakes', 'italian seasoning', 'basil', 'Parmigiano-Reggiano',
    ];
    const ingredientsQuantityList = [
      '1 pound', '1/4 cup', '3 cloves', '1 tin', teaspoonText,
      teaspoonText, '6 leaves', 'spinkling',
    ];

    const { history } = renderWithRouterAndContext(<App />, [urlMealDetailPath]);

    await waitFor(() => expect(screen.queryByText(loadingText))
      .not.toBeInTheDocument(), timeWait);

    const imageMeal = screen.getByTestId('recipe-photo');
    const titleMeal = screen.getByTestId('recipe-title');
    const categoryMeal = screen.getByTestId('recipe-category');
    const ingredientsText = screen.getByText(/ingredients/i);
    const quantitiesText = screen.getByText(/quantities/i);

    expect(imageMeal.getAttribute('src')).toBe(dataDetailMeal.strMealThumb);
    expect(titleMeal.innerHTML).toBe(dataDetailMeal.strMeal);
    expect(categoryMeal.innerHTML).toBe(dataDetailMeal.strCategory);
    expect(ingredientsText).toBeInTheDocument();
    expect(quantitiesText).toBeInTheDocument();

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
    const youTubeVideo = screen.getByTestId('video');
    expect(youTubeVideo.getAttribute('src')).toBe('https://www.youtube.com/embed/1IszT_guI08');

    const recommendationsText = screen.getByText(/recommendations/i);
    expect(recommendationsText).toBeInTheDocument();

    const btnShare = screen.getByRole('button', { name: /share/i });
    userEvent.click(btnShare);
    const alertTextLinkCopied = screen.getByText('Link copied!');
    expect(alertTextLinkCopied).toBeVisible();
    waitFor(() => expect(alertTextLinkCopied).not.toBeVisible(), timeWait);

    const btnFavorite = screen.getByTestId('favorite-btn');
    expect(
      btnFavorite.getAttribute('src').includes(whiteHeartIconPath),
    ).toBe(true);
    userEvent.click(btnFavorite);
    expect(
      btnFavorite.getAttribute('src').includes(whiteHeartIconPath),
    ).toBe(false);
    expect(
      btnFavorite.getAttribute('src').includes('blackHeartIcon.svg'),
    ).toBe(true);

    const btnStartRecipe = screen.getByRole('button', { name: /start recipe/i });
    expect(btnStartRecipe).toBeInTheDocument();

    userEvent.click(btnStartRecipe);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals/52771/in-progress');
    act(() => { history.push(urlMealDetailPath); });

    await waitFor(() => expect(screen.queryByText(loadingText))
      .not.toBeInTheDocument(), timeWait);

    const btnContinueRecipe = screen.getByRole('button', { name: /continue recipe/i });
    expect(btnContinueRecipe).toBeInTheDocument();

    userEvent.click(btnContinueRecipe);

    await waitFor(() => expect(screen.queryByText(loadingText))
      .not.toBeInTheDocument(), timeWait);

    ingredientsList.forEach((ingredient) => {
      const checkBoxIngredient = screen.getByText(ingredient);
      userEvent.click(checkBoxIngredient);
    });

    const btnFinishRecipe = screen.getByRole('button', { name: /finish recipe/i });
    userEvent.click(btnFinishRecipe);

    act(() => { history.push(urlMealDetailPath); });

    await waitFor(() => expect(screen.queryByText(loadingText))
      .not.toBeInTheDocument(), timeWait);
    expect(btnStartRecipe).not.toBeInTheDocument();
    expect(btnContinueRecipe).not.toBeInTheDocument();
  });

  it('Testa as recomendações das comidas', async () => {
    renderWithRouterAndContext(<App />, [urlMealDetailPath]);
    await waitFor(() => expect(screen.queryByText(loadingText))
      .not.toBeInTheDocument(), timeWait);
    const arrowLeft = screen.getByTestId('arrow-left');
    const arrowRight = screen.getByTestId('arrow-right');
    expect(arrowLeft).toBeInTheDocument();
    expect(arrowRight).toBeInTheDocument();
    dataRecommDrinks.forEach((recommendation, index) => {
      const imgRecommendation = screen.getByTestId(`${index}-recommendation-img`);
      const titleRecommendation = screen.getByTestId(`${index}-recommendation-title`);

      expect(imgRecommendation.getAttribute('src')).toBe(recommendation.strDrinkThumb);
      expect(titleRecommendation.innerHTML).toBe(recommendation.strDrink);

      if (index <= 1) {
        const cardOfDrink = screen.getByTestId(`${index}-recommendation-card`);
        expect(cardOfDrink.getAttribute('class')).toBe('cardActive');
      } else {
        const cardOfDrink = screen.getByTestId(`${index}-recommendation-card`);
        expect(cardOfDrink.getAttribute('class')).toBe('cardDeactive');
      }
    });

    userEvent.click(arrowRight);
    dataRecommDrinks.forEach((recommendation, index) => {
      if (index === 1 && index === 2) {
        const cardOfDrink = screen.getByTestId(`${index}-recommendation-card`);
        expect(cardOfDrink.getAttribute('class')).toBe('cardActive');
      }
      if (index === 0 || index > 2) {
        const cardOfDrink = screen.getByTestId(`${index}-recommendation-card`);
        expect(cardOfDrink.getAttribute('class')).toBe('cardDeactive');
      }
    });

    userEvent.click(arrowLeft);
    dataRecommDrinks.forEach((recommendation, index) => {
      if (index <= 1) {
        const cardOfDrink = screen.getByTestId(`${index}-recommendation-card`);
        expect(cardOfDrink.getAttribute('class')).toBe('cardActive');
      } else {
        const cardOfDrink = screen.getByTestId(`${index}-recommendation-card`);
        expect(cardOfDrink.getAttribute('class')).toBe('cardDeactive');
      }
    });
  });

  it('Testa a renderização das bebidas', async () => {
    const ingredientsList = ['Galliano', 'Ginger ale', 'Ice'];
    const ingredientsQuantityList = ['2 1/2 shots'];

    renderWithRouterAndContext(<App />, ['/drinks/15997']);

    await waitFor(() => expect(screen.queryByText(loadingText))
      .not.toBeInTheDocument(), timeWait);

    const imageDrink = screen.getByTestId('recipe-photo');
    const titleDrink = screen.getByTestId('recipe-title');
    const categoryDrink = screen.getByTestId('recipe-category');
    const ingredientsText = screen.getByText(/ingredients/i);
    const quantitiesText = screen.getByText(/quantities/i);

    expect(imageDrink.getAttribute('src')).toBe(dataDetailDrink.strDrinkThumb);
    expect(titleDrink.innerHTML).toBe(dataDetailDrink.strDrink);
    expect(categoryDrink.innerHTML).toBe(dataDetailDrink.strAlcoholic);
    expect(ingredientsText).toBeInTheDocument();
    expect(quantitiesText).toBeInTheDocument();

    ingredientsList.forEach((ingredient) => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });
    ingredientsQuantityList.forEach((ingredient) => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });

    const textInstruction = screen.getByText(/pour the galliano liqueur over ice\. fill the remainder of the glass with ginger ale and thats all there is to it\. you now have a your very own gg\./i);
    expect(textInstruction).toBeInTheDocument();

    const recommendationsText = screen.getByText(/recommendations/i);
    expect(recommendationsText).toBeInTheDocument();

    const arrowLeft = screen.getByTestId('arrow-left');
    const arrowRight = screen.getByTestId('arrow-right');
    expect(arrowRight).toBeInTheDocument();
    expect(arrowLeft).toBeInTheDocument();
    userEvent.click(arrowLeft);
    userEvent.click(arrowRight);

    dataRecommMeals.forEach((recommendation, index) => {
      const imgRecommendation = screen.getByTestId(`${index}-recommendation-img`);
      const titleRecommendation = screen.getByTestId(`${index}-recommendation-title`);

      expect(imgRecommendation.getAttribute('src')).toBe(recommendation.strMealThumb);
      expect(titleRecommendation.innerHTML).toBe(recommendation.strMeal);
    });

    const btnFavorite = screen.getByTestId('favorite-btn');
    expect(
      btnFavorite.getAttribute('src').includes(whiteHeartIconPath),
    ).toBe(true);
    userEvent.click(btnFavorite);
    expect(
      btnFavorite.getAttribute('src').includes(whiteHeartIconPath),
    ).toBe(false);
    expect(
      btnFavorite.getAttribute('src').includes('blackHeartIcon.svg'),
    ).toBe(true);
  });

  // it('Testa ao acessar uma receita que não existe', async () => {
  //   const spyConsoleLog = jest.spyOn(console, 'log');
  //   renderWithRouterAndContext(<App />, ['/meals/999999']);
  //   await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  //   expect(spyConsoleLog).toHaveBeenCalledWith('Error: Problems requesting the API');
  // });
});
