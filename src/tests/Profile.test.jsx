import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Testa a página Profile', () => {
  test('Verifica se a tela de profile é renderizada corretamente', () => {
    renderWithRouterAndContext(<App />, ['/profile']);

    const email = { email: 'email@teste.com' };
    const setLocalStorage = (key, data) => {
      window.localStorage.setItem(key, JSON.stringify(data));
    };
    setLocalStorage('user', email);

    expect(localStorage.getItem('user')).toEqual(JSON.stringify(email));

    const emailStrEl = screen.getByTestId('profile-email');
    expect(emailStrEl).toBeInTheDocument();
  });

  test('Verifica se os 3 botões são renderizados', () => {
    renderWithRouterAndContext(<App />, ['/profile']);

    const doneRecipeBtn = screen.getByTestId('profile-done-btn');
    const favoriteRecipeBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(doneRecipeBtn).toBeInTheDocument();
    expect(favoriteRecipeBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  test('Verifica se é possível navegar para a rota "Done Recipes"', () => {
    const { history } = renderWithRouterAndContext(<App />, ['/profile']);

    const doneRecipeBtn = screen.getByTestId('profile-done-btn');

    act(() => {
      userEvent.click(doneRecipeBtn);
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  test('Verifica se é possível navegar para a rota "Favorite Recipes"', () => {
    const { history } = renderWithRouterAndContext(<App />, ['/profile']);

    const favoriteRecipeBtn = screen.getByTestId('profile-favorite-btn');

    act(() => {
      userEvent.click(favoriteRecipeBtn);
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  test('Verifica se é possível dar logout', () => {
    const { history } = renderWithRouterAndContext(<App />, ['/profile']);

    const logoutBtn = screen.getByTestId('profile-logout-btn');

    act(() => {
      userEvent.click(logoutBtn);
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
