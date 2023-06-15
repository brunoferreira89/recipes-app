import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';
import userContext from '../context/Contexts/userContext';

function Login() {
  const history = useHistory();
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
    history.push('/meals');
  };

  const handleClickShowMadeBy = () => {
    Swal.fire({
      title: '<strong>Group 3</strong>',
      icon: 'info',
      html:
      '<p><a href="//sweetalert2.github.io">Bruno Ferreira</a></p>'
      + '<p><a href="//sweetalert2.github.io">Diego Cordeiro</a></p>'
      + '<p><a href="//sweetalert2.github.io">Felipe Lima Coelho</a></p>'
      + '<p><a href="//sweetalert2.github.io">Louis Phillipi</a></p>'
      + '<p><a href="//sweetalert2.github.io">Luiz Fernando Heilig</a></p>',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    });
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

      <p>
        Made by
        {' '}
        <button
          type="button"
          onClick={ handleClickShowMadeBy }
        >
          <u>Group 3</u>
        </button>
      </p>
    </form>
  );
}

export default Login;
