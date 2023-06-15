import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './styles/Footer.css';
import headerContext from '../context/Contexts/headerContext';

function Footer() {
  const { pageUrl } = useContext(headerContext);
  const history = useHistory();
  const refreshPage = () => window.location.reload(true);

  const page = history.location.pathname;

  useEffect(() => {}, [pageUrl]);

  const handleClick = (path) => {
    history.push(path);
    refreshPage();
  };

  if (page !== '/') {
    return (
      <footer data-testid="footer">
        <button onClick={ () => handleClick('/drinks') }>
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drinks" />
        </button>
        <button onClick={ () => handleClick('/meals') }>
          <img data-testid="meals-bottom-btn" src={ mealIcon } alt="Meals" />
        </button>
      </footer>
    );
  }
}

export default Footer;
