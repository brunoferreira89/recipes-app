import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Testa o componente Footer', () => {
  test('Verifica se os botões de Drinks e Meals são renderizados', async () => {
    renderWithRouterAndContext(<App />, ['/meals']);

    const drinksBtn = await screen.findByTestId('drinks-bottom-btn');
    const mealsBtn = await screen.findByTestId('meals-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });

  test('Verifica se a rota "/drinks" é renderizada após o clique no botão', async () => {
    const { history } = renderWithRouterAndContext(<App />, ['/meals']);

    const drinksBtn = await screen.findByTestId('drinks-bottom-btn');

    act(() => {
      userEvent.click(drinksBtn);
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  test('Verifica se a rota "/meals" é renderizada após o clique no botão', async () => {
    const { history } = renderWithRouterAndContext(<App />, ['/drinks']);

    const mealsBtn = await screen.findByTestId('meals-bottom-btn');

    act(() => {
      userEvent.click(mealsBtn);
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
