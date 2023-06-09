import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import detailMealMockData from './helpers/mocks/detailMealMockData';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const shareBtnStr = 'share-btn';
const favoriteBtnStr = 'favorite-btn';
const finishBtnStr = 'finish-recipe-btn';

describe('1 - Testa a página de Receita em Progresso (Meal)', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(detailMealMockData),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const url = '/meals/52771/in-progress';

  test('Verifica se a tela de Progresso é renderizada corretamente', async () => {
    const { history } = renderWithRouterAndContext(<App />, [url]);
    const { pathname } = history.location;
    expect(pathname).toBe(url);
  });

  test('Verifica se a API é chamada ao carregar a página', async () => {
    renderWithRouterAndContext(<App />, [url]);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
  });

  test('Verifica se os elementos da receita são renderizados corretamente', async () => {
    renderWithRouterAndContext(<App />, [url]);

    const mealImg = await screen.findByTestId('recipe-photo');
    expect(mealImg).toBeInTheDocument();
    const mealTitle = await screen.findByTestId('recipe-title');
    expect(mealTitle).toBeInTheDocument();
    const mealCategory = await screen.findByTestId('recipe-category');
    expect(mealCategory).toBeInTheDocument();

    const ingredientsList = ['penne rigate', 'olive oil', 'garlic', 'chopped tomatoes',
      'red chile flakes', 'italian seasoning', 'basil', 'Parmigiano-Reggiano'];

    ingredientsList.forEach((ingredient) => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });

    const description = await screen.findByTestId('instructions');
    expect(description).toBeInTheDocument();
  });

  test('Verifica se os botões Share, Favorite e Finish são renderizados', async () => {
    renderWithRouterAndContext(<App />, [url]);

    const shareBtn = await screen.findByTestId(shareBtnStr);
    const favoriteBtn = await screen.findByTestId(favoriteBtnStr);
    const finishRecipeBtn = await screen.findByTestId(finishBtnStr);
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toBeInTheDocument();
  });

  test('Verifica se é possível copiar a url para o clipboard', async () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouterAndContext(<App />, [url]);

    const timeWait = 3000;

    const shareBtn = await screen.findByTestId(shareBtnStr);
    userEvent.click(shareBtn);
    const alertTextLinkCopied = screen.getByText('Link copied!');
    expect(alertTextLinkCopied).toBeVisible();
    waitFor(() => expect(alertTextLinkCopied).not.toBeVisible(), timeWait);
  });

  test('Verifica se é possível marcar/desmarcar uma receita como concluída', async () => {
    renderWithRouterAndContext(<App />, [url]);

    const ingredientCheckbox = await screen.findByRole('checkbox', { name: /penne rigate/i });
    expect(ingredientCheckbox).toBeInTheDocument();
    expect(ingredientCheckbox).not.toBeChecked();

    act(() => {
      userEvent.click(ingredientCheckbox);
      expect(ingredientCheckbox).toBeChecked();
    });

    const ingredient = await screen.findByTestId('0-ingredient-step');
    expect(ingredient).toBeInTheDocument();
    expect(ingredient).toHaveClass('checked-checkbox');

    act(() => {
      userEvent.click(ingredientCheckbox);
      expect(ingredientCheckbox).not.toBeChecked();
    });

    expect(ingredient).toHaveClass('unchecked-checkbox');
  });

  test('Verifica se é possível marcar/desmarcar uma receita como favorita', async () => {
    renderWithRouterAndContext(<App />, [url]);

    const favoriteBtn = await screen.findByTestId(favoriteBtnStr);
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);

    act(() => {
      userEvent.click(favoriteBtn);
    });
    expect(favoriteBtn).toHaveAttribute('src', blackHeartIcon);
  });

  test('Verifica se é renderizada "/done-recipes" ao clicar em Finish', async () => {
    const { history } = renderWithRouterAndContext(<App />, [url]);

    const ingredientCheckbox1 = await screen.findByRole('checkbox', { name: /penne rigate/i });
    const ingredientCheckbox2 = await screen.findByRole('checkbox', { name: /olive oil/i });
    const ingredientCheckbox3 = await screen.findByRole('checkbox', { name: /garlic/i });
    const ingredientCheckbox4 = await screen.findByRole('checkbox', { name: /chopped tomatoes/i });
    const ingredientCheckbox5 = await screen.findByRole('checkbox', { name: /red chile flakes/i });
    const ingredientCheckbox6 = await screen.findByRole('checkbox', { name: /italian seasoning/i });
    const ingredientCheckbox7 = await screen.findByRole('checkbox', { name: /basil/i });
    const ingredientCheckbox8 = await screen.findByRole('checkbox', { name: /parmigiano-reggiano/i });

    const finishRecipeBtn = await screen.findByTestId(finishBtnStr);
    expect(finishRecipeBtn).toBeDisabled();

    act(() => {
      userEvent.click(ingredientCheckbox1);
      userEvent.click(ingredientCheckbox2);
      userEvent.click(ingredientCheckbox3);
      userEvent.click(ingredientCheckbox4);
      userEvent.click(ingredientCheckbox5);
      userEvent.click(ingredientCheckbox6);
      userEvent.click(ingredientCheckbox7);
      userEvent.click(ingredientCheckbox8);
    });

    expect(finishRecipeBtn).not.toBeDisabled();

    act(() => {
      userEvent.click(finishRecipeBtn);
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
});
