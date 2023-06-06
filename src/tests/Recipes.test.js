import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import mealsMockData from './helpers/mocks/mealsMockData';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Testa a página principal de receitas de comidas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsMockData),
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

  test('Verifica se existem botões de filtro', async () => {
    renderWithRouterAndContext(<App />, ['/meals']);

    const Loading = screen.getByText('Loading', { exact: false });
    await waitForElementToBeRemoved(Loading);

    const beefFilterBtn = await screen.findByTestId('Beef-category-filter');
    expect(beefFilterBtn).toBeInTheDocument();
  });
});
