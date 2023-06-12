import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import mockFetchDataSearch from './helpers/mockFetchDataSearch';
import {
  dataSearchDrinksWithFirstLetter, dataSearchDrinksWithIngredient,
} from './helpers/mocks/searchDrinks';

const urlDrinksPath = '/drinks';
const loadingText = 'Loading...';
const timeWait = 3000;
const searchInputText = 'search-input';
const searchTopBtnText = 'search-top-btn';
const execSearchBtnText = 'exec-search-btn';

describe('Testa o componente de pesquisa quando em bebidas', () => {
  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetchDataSearch));
  afterEach(() => jest.clearAllMocks());

  it('Realiza os testes quando pesquisado os ingredientes das bebidas', async () => {
    renderWithRouterAndContext(<App />, [urlDrinksPath]);

    const drinksLabelText = screen.getByTestId('page-title');
    expect(drinksLabelText).toBeInTheDocument();

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

    userEvent.type(searchInput, 'Gin');
    userEvent.click(ingredientSearchRadio);
    userEvent.click(btnSearch);

    await waitFor(() => expect(screen.queryByText(loadingText))
      .not.toBeInTheDocument(), timeWait);

    const dataIngredients = dataSearchDrinksWithIngredient.drinks;

    dataIngredients.forEach((drink, index) => {
      const cardImg = screen.getByTestId(`${index}-card-img`);
      const cardName = screen.getByTestId(`${index}-card-name`);
      expect(cardImg.getAttribute('src')).toBe(drink.strDrinkThumb);
      expect(cardName).toBeInTheDocument(drink.strDrink);
    });
  });

  it('Realiza os testes quando pesquisado o nome da bebida', async () => {
    renderWithRouterAndContext(<App />, [urlDrinksPath]);

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

    userEvent.type(searchInput, 'A1');
    userEvent.click(nameSearchRadio);
    userEvent.click(btnSearch);

    await waitFor(() => expect(screen.queryByText(loadingText))
      .not.toBeInTheDocument(), timeWait);

    const recipeTitle = screen.getByTestId('0-card-name');

    expect(recipeTitle.innerHTML).toBe('A1');
  });

  it('Realiza os testes quando pesquisado a letra da bebida', async () => {
    renderWithRouterAndContext(<App />, [urlDrinksPath]);

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

    const dataFirstLetter = dataSearchDrinksWithFirstLetter.drinks;

    dataFirstLetter.forEach((drink, index) => {
      const cardImg = screen.getByTestId(`${index}-card-img`);
      const cardName = screen.getByTestId(`${index}-card-name`);
      expect(cardImg.getAttribute('src')).toBe(drink.strDrinkThumb);
      expect(cardName).toBeInTheDocument(drink.strDrink);
    });
  });

  // const alertSpy = jest.spyOn(global, 'alert');
  // const alertText = 'Sorry, we haven\'t found any recipes for these filters.';

  // it(
  //   'Realiza os testes quando pesquisado um ingrediente de comida que não existe',
  //   async () => {
  //     renderWithRouterAndContext(<App />, [urlDrinksPath]);

  //     const drinksLabelText = screen.getByTestId('page-title');
  //     expect(drinksLabelText).toBeInTheDocument();

  //     const searchIcon = screen.getByTestId(searchTopBtnText);
  //     expect(searchIcon).toBeInTheDocument();

  //     userEvent.click(searchIcon);

  //     const searchInput = screen.getByTestId(searchInputText);
  //     const placeHolderInput = screen.queryByPlaceholderText('Search');
  //     const nameSearchRadio = screen.getByTestId('name-search-radio');
  //     const btnSearch = screen.getByTestId(execSearchBtnText);

  //     expect(searchInput).toBeInTheDocument();
  //     expect(placeHolderInput).toBeInTheDocument();
  //     expect(nameSearchRadio).toBeInTheDocument();
  //     expect(btnSearch).toBeInTheDocument();

  //     userEvent.type(searchInput, 'Xablau');
  //     userEvent.click(nameSearchRadio);
  //     userEvent.click(btnSearch);

  //     await waitFor(() => expect(alertSpy).toHaveBeenCalledTimes(1), timeWait);

  //     expect(alertSpy).toHaveBeenCalledWith(alertText);
  //     alertSpy.mockRestore();
  //   },
  // );
});
