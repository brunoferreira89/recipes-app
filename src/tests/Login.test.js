import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import UserProvider from '../context/Providers/UserProvider';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const emailInputStr = 'email-input';
const passwordInputStr = 'password-input';
const loginBtnStr = 'login-submit-btn';

describe('1 - Testa a página Login', () => {
  test('Verifica se a tela de login é renderizada corretamente', () => {
    renderWithRouter(
      <UserProvider>
        <App />
      </UserProvider>,
    );

    const emailInput = screen.getByTestId(emailInputStr);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId(passwordInputStr);
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByTestId(loginBtnStr);
    expect(loginButton).toBeInTheDocument();
  });

  test('Verifica se é possível digitar nos inputs de email e senha', () => {
    renderWithRouter(
      <UserProvider>
        <App />
      </UserProvider>,
    );

    const emailInput = screen.getByTestId(emailInputStr);
    const passwordInput = screen.getByTestId(passwordInputStr);
    const loginButton = screen.getByTestId(loginBtnStr);

    expect(loginButton).toBeDisabled();

    const email = 'email@teste.com';
    act(() => {
      userEvent.type(emailInput, email);
      userEvent.type(passwordInput, '1234567');
    });

    expect(loginButton).not.toBeDisabled();
  });

  test('Verifica se a rota "meals" é renderizada após o login', () => {
    const { history } = renderWithRouter(
      <UserProvider>
        <App />
      </UserProvider>,
    );

    const emailInput = screen.getByTestId(emailInputStr);
    const passwordInput = screen.getByTestId(passwordInputStr);
    const loginButton = screen.getByTestId(loginBtnStr);

    userEvent.type(emailInput, 'email@teste.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
