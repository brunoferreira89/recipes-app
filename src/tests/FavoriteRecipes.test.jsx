import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import favoriteRecipesMockData from './helpers/mocks/favoriteRecipesMockData';

const url = '/favorite-recipes';

const zeroNameStr = '0-horizontal-name';
const oneNameStr = '1-horizontal-name';

describe('Testa a página Favorite Recipes', () => {
  beforeEach(() => {
    favoriteRecipesMockData();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Verifica se a existe uma comida na tela de receitas favoritas', () => {
    renderWithRouterAndContext(<App />, [url]);

    const meal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(meal[0].type).toBe('meal');

    const imageEl = screen.getByTestId(zeroNameStr);
    expect(imageEl).toBeInTheDocument();
  });
  test('Verifica se a existe uma bebida na tela de receitas favoritas', () => {
    renderWithRouterAndContext(<App />, [url]);

    const drink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(drink[0].type).toBe('meal');

    const imageEl = screen.getByTestId('0-horizontal-image');
    expect(imageEl).toBeInTheDocument();
  });
  test('Verifica se os 3 botões de filtro são renderizados', () => {
    renderWithRouterAndContext(<App />, [url]);

    const allFilterBtn = screen.getByTestId('filter-by-all-btn');
    const mealsFilterBtn = screen.getByTestId('filter-by-meal-btn');
    const drinksFilterBtn = screen.getByTestId('filter-by-drink-btn');
    expect(allFilterBtn).toBeInTheDocument();
    expect(mealsFilterBtn).toBeInTheDocument();
    expect(drinksFilterBtn).toBeInTheDocument();
  });
  test('Verifica se é possível filtrar por comidas', () => {
    renderWithRouterAndContext(<App />, [url]);

    const mealsFilterBtn = screen.getByTestId('filter-by-meal-btn');

    act(() => {
      userEvent.click(mealsFilterBtn);
    });

    const meal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(meal[0].type).toBe('meal');
    expect(meal[0].type).not.toBe('drink');

    const mealName = screen.getByTestId(zeroNameStr);
    expect(mealName).toHaveTextContent('Corba');
    const drinkName = screen.queryByTestId(oneNameStr);
    expect(drinkName).not.toBeInTheDocument();
  });

  test('Verifica se é possível filtrar por bebidas', () => {
    renderWithRouterAndContext(<App />, [url]);

    const drinksFilterBtn = screen.getByTestId('filter-by-drink-btn');

    act(() => {
      userEvent.click(drinksFilterBtn);
    });

    const drink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(drink[1].type).toBe('drink');
    expect(drink[1].type).not.toBe('meal');

    const drinkName = screen.getByTestId(zeroNameStr);
    expect(drinkName).toHaveTextContent('Kir');
    const mealName = screen.queryByTestId(oneNameStr);
    expect(mealName).not.toBeInTheDocument();
  });
  //   test.only('Verifica se é possível apagar os filtros', () => {
  //     renderWithRouterAndContext(<App />, [url]);

  //     const allFilterBtn = screen.getByTestId('filter-by-all-btn');

  //     act(() => {
  //       userEvent.click(allFilterBtn);
  //     });
  //     const all = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //     console.log(all);
  //     expect(all[0].type).toBe('meal');
  //     expect(all[0].type).not.toBe('drink');
  //     expect(all[1].type).toBe('drink');
  //     expect(all[1].type).not.toBe('meal');

  //     const mealName = screen.getByTestId(zeroNameStr);
  //     expect(mealName).toHaveTextContent('Corba');

  //     const drinkName = screen.getByTestId(oneNameStr);
  //     expect(drinkName).toHaveTextContent('Kir');
  //   });
  test('Verifica se é possível copiar a url para o clipboard', async () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouterAndContext(<App />, [url]);

    const shareBtn1 = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn1);
    const shareBtn2 = await screen.findByTestId('1-horizontal-share-btn');
    userEvent.click(shareBtn2);
  });
  test('Verifica se há redirecionamento aos detalhes da comida', () => {
    const { history } = renderWithRouterAndContext(<App />, [url]);

    const meal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(meal[0].type).toBe('meal');

    const imageEl = screen.getByTestId('0-horizontal-image');
    act(() => {
      userEvent.click(imageEl);
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977');
  });
  test('Verifica se há redirecionamento aos detalhes da bebida', () => {
    const { history } = renderWithRouterAndContext(<App />, [url]);

    const drink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(drink[1].type).toBe('drink');

    const imageEl = screen.getByTestId('1-horizontal-image');
    act(() => {
      userEvent.click(imageEl);
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/17203');
  });
  test('Verifica se a comida é apagada ao clicar no botão de desfavoritar', () => {
    renderWithRouterAndContext(<App />, [url]);

    const drink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(drink[0].type).toBe('meal');
    const mealEl = screen.getByTestId('0-horizontal-name');
    const btnEl = screen.getByTestId('0-horizontal-favorite-btn');
    act(() => {
      userEvent.click(btnEl);
    });
    expect(mealEl).not.toBeInTheDocument();
  });
  test('Verifica se a bebida é apagada ao clicar no botão de desfavoritar', () => {
    renderWithRouterAndContext(<App />, [url]);

    const drink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(drink[1].type).toBe('drink');
    const drinkEl = screen.getByTestId('1-horizontal-name');
    const btnEl = screen.getByTestId('1-horizontal-favorite-btn');
    act(() => {
      userEvent.click(btnEl);
    });
    expect(drinkEl).not.toBeInTheDocument();
  });
});
