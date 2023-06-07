import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import mealsMockData from './helpers/mocks/mealsMockData';
import mealsCategoriesMockData from './helpers/mocks/mealsCategoriesMockData';
import drinksMockData from './helpers/mocks/drinksMockData';
import drinksCategoriesMockData from './helpers/mocks/drinksCategoriesMockData';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

const imgDataTestId = '0-card-img';

describe('Testa a página principal de receitas de comidas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsMockData),
    });
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsCategoriesMockData),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se a tela principal de meals é renderizada corretamente', async () => {
    const { history } = renderWithRouterAndContext(<App />, ['/meals']);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });

  test('Verifica se a API é chamada ao carregar a página', async () => {
    renderWithRouterAndContext(<App />, ['/meals']);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  });

  test('Verifica se existem botões de filtro e se é possível clicálos', async () => {
    renderWithRouterAndContext(<App />, ['/meals']);

    const loading = screen.getByText('Loading', { exact: false });
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const beefFilterBtn = await screen.findByTestId('Beef-category-filter');
    expect(beefFilterBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(beefFilterBtn);
      screen.getByTestId(imgDataTestId);
    });
    act(() => {
      userEvent.click(beefFilterBtn);
      screen.getByTestId(imgDataTestId);
    });
  });
});

describe('Testa a página principal de receitas de bebidas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksMockData),
    });
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksCategoriesMockData),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se a tela principal de drinks é renderizada corretamente', async () => {
    const { history } = renderWithRouterAndContext(<App />, ['/drinks']);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  test('Verifica se a API é chamada ao carregar a página', async () => {
    renderWithRouterAndContext(<App />, ['/drinks']);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  });

  test('Verifica se existem botões de filtro e se é possível clicálos', async () => {
    renderWithRouterAndContext(<App />, ['/drinks']);

    const loading = screen.getByText('Loading', { exact: false });
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const shakeFilterBtn = await screen.findByTestId('Shake-category-filter');
    expect(shakeFilterBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(shakeFilterBtn);
      screen.getByTestId(imgDataTestId);
    });
    act(() => {
      userEvent.click(shakeFilterBtn);
      screen.getByTestId(imgDataTestId);
    });
  });
});
