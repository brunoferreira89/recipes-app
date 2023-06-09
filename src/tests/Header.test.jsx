import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Testa a página principal de receitas de comidas', () => {
  test('Verifica se o header é renderizado na rota /meals', () => {
    const { history } = renderWithRouterAndContext(<App />, ['/meals']);

    const userIcon = screen.getByRole('button', { name: /icone de usuario/i });
    act(() => userEvent.click(userIcon));

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
  test(
    'Verifica se a barra de pesquisa fica visivel ao clicar no icone de pesquisa',
    () => {
      renderWithRouterAndContext(<App />, ['/meals']);

      const searchIcon = screen.getByRole('button', { name: /icone de pesquisa/i });
      act(() => userEvent.click(searchIcon));
      const textbox = screen.getByRole('textbox');
      expect(textbox).toBeInTheDocument();
      act(() => userEvent.click(searchIcon));
      expect(textbox).not.toBeInTheDocument();
    },
  );
});
