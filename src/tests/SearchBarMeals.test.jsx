import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import mockFetchDataSearch from './helpers/mockFetchDataSearch';
import {
  dataSearchMealsWithFirstLetter,
  dataSearchMealsWithIngredient,
} from './helpers/mocks/searchMeals';

const urlMealsPath = '/meals';
const loadingText = 'Loading...';
const timeWait = 3000;
const searchInputText = 'search-input';
const searchTopBtnText = 'search-top-btn';
const execSearchBtnText = 'exec-search-btn';

describe('Testa o componente de pesquisa quando em comidas', () => {
  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetchDataSearch));
  afterEach(() => jest.clearAllMocks());

  it('Realiza os testes quando pesquisado os ingredientes das comidas', async () => {
    renderWithRouterAndContext(<App />, [urlMealsPath]);

    const mealsLabelText = screen.getByTestId('page-title');
    expect(mealsLabelText).toBeInTheDocument();

    const searchIcon = screen.getByTestId(searchTopBtnText);
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputText);
    const placeHolderInput = screen.queryByPlaceholderText('Search');
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const ingredientSearchLabel = screen.getByText(/ingredient/i);
    const btnSearch = screen.getByTestId(execSearchBtnText);

    expect(searchInput).toBeInTheDocument();
    expect(placeHolderInput).toBeInTheDocument();
    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(ingredientSearchLabel).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();

    userEvent.type(searchInput, 'Lentils');
    userEvent.click(ingredientSearchRadio);
    userEvent.click(btnSearch);

    await waitFor(() => expect(screen.queryByText(loadingText))
      .not.toBeInTheDocument(), timeWait);

    const dataIngredients = dataSearchMealsWithIngredient.meals;

    dataIngredients.forEach((meal, index) => {
      const cardImg = screen.getByTestId(`${index}-card-img`);
      const cardName = screen.getByTestId(`${index}-card-name`);
      expect(cardImg.getAttribute('src')).toBe(meal.strMealThumb);
      expect(cardName).toBeInTheDocument(meal.strMeal);
    });
  });

  it('Realiza os testes quando pesquisado o nome da comida', async () => {
    renderWithRouterAndContext(<App />, [urlMealsPath]);

    const searchIcon = screen.getByTestId(searchTopBtnText);
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputText);
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const nameSearchLabel = screen.getByText(/name/i);
    const btnSearch = screen.getByTestId(execSearchBtnText);

    expect(searchInput).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(nameSearchLabel).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();

    userEvent.type(searchInput, 'Lasagne');
    userEvent.click(nameSearchRadio);
    userEvent.click(btnSearch);

    await waitFor(() => expect(screen.queryByText(loadingText))
      .not.toBeInTheDocument(), timeWait);

    const recipeTitle = screen.getByTestId('0-card-name');

    expect(recipeTitle.innerHTML).toBe('Lasagne');
  });

  it('Realiza os testes quando pesquisado a letra da comida', async () => {
    renderWithRouterAndContext(<App />, [urlMealsPath]);

    const searchIcon = screen.getByTestId(searchTopBtnText);
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputText);
    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const firstLetterSearchLabel = screen.getByText(/first letter/i);
    const btnSearch = screen.getByTestId(execSearchBtnText);

    expect(searchInput).toBeInTheDocument();
    expect(firstLetterSearchRadio).toBeInTheDocument();
    expect(firstLetterSearchLabel).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();

    userEvent.type(searchInput, 'j');
    userEvent.click(firstLetterSearchRadio);
    userEvent.click(btnSearch);

    await waitFor(() => expect(screen.queryByText(loadingText))
      .not.toBeInTheDocument(), timeWait);

    const dataFirstLetter = dataSearchMealsWithFirstLetter.meals;

    dataFirstLetter.forEach((meal, index) => {
      const cardImg = screen.getByTestId(`${index}-card-img`);
      const cardName = screen.getByTestId(`${index}-card-name`);
      expect(cardImg.getAttribute('src')).toBe(meal.strMealThumb);
      expect(cardName).toBeInTheDocument(meal.strMeal);
    });
  });

  const alertSpy = jest.spyOn(global, 'alert');
  const alertText = 'Sorry, we haven\'t found any recipes for these filters.';

  it(
    'Realiza os testes quando pesquisado um ingrediente de comida que não existe',
    async () => {
      renderWithRouterAndContext(<App />, [urlMealsPath]);

      const mealsLabelText = screen.getByTestId('page-title');
      expect(mealsLabelText).toBeInTheDocument();

      const searchIcon = screen.getByTestId(searchTopBtnText);
      expect(searchIcon).toBeInTheDocument();

      userEvent.click(searchIcon);

      const searchInput = screen.getByTestId(searchInputText);
      const placeHolderInput = screen.queryByPlaceholderText('Search');
      const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
      const btnSearch = screen.getByTestId(execSearchBtnText);

      expect(searchInput).toBeInTheDocument();
      expect(placeHolderInput).toBeInTheDocument();
      expect(ingredientSearchRadio).toBeInTheDocument();
      expect(btnSearch).toBeInTheDocument();

      userEvent.type(searchInput, 'Xablau');
      userEvent.click(ingredientSearchRadio);
      userEvent.click(btnSearch);

      await waitFor(() => expect(screen.queryByText(loadingText))
        .not.toBeInTheDocument(), timeWait);

      expect(alertSpy).toHaveBeenCalledTimes(1);
      expect(alertSpy).toHaveBeenCalledWith(alertText);
      alertSpy.mockRestore();
    },
  );
});
