import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './styles/Footer.css';

function Footer() {
  const history = useHistory();
  const refreshPage = () => window.location.reload(true);

  const handleClick = (path) => {
    history.push(path);
    refreshPage();
  };

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

export default Footer;
