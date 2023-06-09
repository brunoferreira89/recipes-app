import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import mealsMockData from './helpers/mocks/mealsMockData';
// import mealsCategoriesMockData from './helpers/mocks/mealsCategoriesMockData';
// import drinksMockData from './helpers/mocks/drinksMockData';
// import drinksCategoriesMockData from './helpers/mocks/drinksCategoriesMockData';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

// const imgDataTestId = '0-card-img';

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

  test('Verifica se há interações com os inputs', () => {
    renderWithRouterAndContext(<App />, ['/meals']);

    const searchIcon = screen.getByRole('button', { name: /icone de pesquisa/i });

    act(() => userEvent.click(searchIcon));

    const searchInput = screen.getByRole('textbox');
    const ingredientRadio = screen.getByRole('radio', { name: /ingredient/i });
    const nameRadio = screen.getByRole('radio', { name: /name/i });
    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });

    act(() => userEvent.click(ingredientRadio));
    expect(ingredientRadio.value).toBe('Ingredient');

    act(() => userEvent.click(nameRadio));
    expect(nameRadio.value).toBe('Name');

    act(() => userEvent.click(firstLetterRadio));
    expect(firstLetterRadio.value).toBe('First letter');

    act(() => userEvent.type(searchInput, 'chicken'));
    expect(searchInput.value).toBe('chicken');
  });
  test.only(
    'Verifica se a barra de pesquisa fica visivel ao clicar no icone de pesquisa',
    async () => {
      renderWithRouterAndContext(<App />, ['/meals']);

      const searchIcon = screen.getByRole('button', { name: /icone de pesquisa/i });
      act(() => userEvent.click(searchIcon));

      const inputSearch = screen.getByRole('textbox');
      const ingredientRadio = screen.getByRole('radio', { name: /ingredient/i });
      const button = screen.getByRole('button', { name: /search/i });

      act(() => userEvent.type(inputSearch, 'lentils'));
      act(() => userEvent.click(ingredientRadio));
      act(() => userEvent.click(button));
      const magic = 3000;
      waitFor(() => {
        screen.getByRole('heading', { name: /tahini lentils/i });
      }, magic);
    },
  );
});
