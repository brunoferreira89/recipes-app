import React, { useContext } from 'react';
import userContext from '../context/userContext';

function Login() {
  const { user, setUser, isValidEmail, isValidPassword } = useContext(userContext);
  const { email, password } = user;

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleOnClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <form>
      <label htmlFor="email">
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          id="email"
          onChange={ handleOnChange }
        />
      </label>
      <label htmlFor="password">
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          id="password"
          onChange={ handleOnChange }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !(isValidEmail(email) && isValidPassword(password)) }
        onClick={ handleOnClick }
      >
        Enter

      </button>
    </form>
  );
}

export default Login;
