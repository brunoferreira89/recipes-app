import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserFocus } from '@phosphor-icons/react';
import Button from '../components/Button';
import styles from './styles/Profile.module.css';
import userContext from '../context/Contexts/userContext';
import headerContext from '../context/Contexts/headerContext';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  const { user, setUser, isValidEmail } = useContext(userContext);
  const { email } = user;

  const { setPageUrl } = useContext(headerContext);

  const getUserFromStorage = () => {
    const { email: localStorageEmail } = JSON.parse(localStorage.getItem('user')) || '';
    setUserEmail(localStorageEmail);
  };

  useEffect(() => {
    getUserFromStorage();
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleOnClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    setUserEmail(email);
    setUser({ ...user, email: '' });
  };

  const handleLogout = () => {
    history.push('/');
    localStorage.clear();
    setPageUrl('/');
  };

  return (
    <div className={ styles.wrapProfile }>
      <header className={ styles.profileTitlePage }>
        <h1>Profile</h1>
      </header>

      <main className={ styles.mainProfile }>
        <header>
          <UserFocus size={ 28 } />
          <div className={ styles.mainEmailContent }>
            <strong>Email:</strong>
            <span data-testid="profile-email">{userEmail}</span>
          </div>
        </header>

        <form className={ styles.formProfile }>
          <main>
            <label htmlFor="email" className={ styles.emailLabel }>
              Change email
            </label>
            <input
              data-testid="email-input"
              className={ styles.emailInput }
              type="email"
              autoComplete="off"
              name="email"
              value={ email }
              id="email"
              onChange={ handleOnChange }
            />

          </main>

          <footer>
            <button
              data-testid="change-submit-btn"
              type="button"
              className={ styles.btnChangeEmail }
              disabled={ !(isValidEmail(email)) }
              onClick={ handleOnClick }
            >
              Change
            </button>
          </footer>
        </form>
      </main>

      <footer>
        <Button
          dataTestid="profile-logout-btn"
          className={ styles.btnLogout }
          textContent="Logout"
          onClick={ () => handleLogout() }
        />
      </footer>
    </div>
  );
}

export default Profile;
