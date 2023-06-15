import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from './styles/Footer.module.css';
import headerContext from '../context/Contexts/headerContext';

function Footer() {
  const { pageUrl, setPageUrl } = useContext(headerContext);
  const history = useHistory();
  // const refreshPage = () => window.location.reload(true);

  const page = history.location.pathname;

  useEffect(() => {}, [pageUrl]);

  const handleClick = (path) => {
    setPageUrl(path);
    history.push(path);
    // refreshPage();
  };

  if (page !== '/') {
    return (
      <footer className={ styles.footer } data-testid="footer">
        <button
          onClick={ () => handleClick('/meals') }
        >
          Home
        </button>

        <button type="button" onClick={ () => handleClick('/drinks') }>
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drinks" />
        </button>

        <button type="button" onClick={ () => handleClick('/meals') }>
          <img data-testid="meals-bottom-btn" src={ mealIcon } alt="Meals" />
        </button>

        <button
          onClick={ () => handleClick('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          onClick={ () => handleClick('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
      </footer>
    );
  }
}

export default Footer;
