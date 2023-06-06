import React from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
//aaaaaa
function Footer() {
  const history = useHistory();
  const location = useLocation();

  const handleClick = (path) => {
    history.push(path);
  };

  const shouldShowFooter = [
    '/meals',
    '/drinks',
    '/profile',
  ].includes(location.pathname);

  if (!shouldShowFooter) {
    return null;
  }

  return (
    <footer data-testid="footer">
      <div>
        <button
          data-testid="drinks-bottom-btn"
          onClick={ () => handleClick('/drinks') }
        >
          <img src={ drinkIcon } alt="Drinks" />
        </button>
        <button
          data-testid="meals-bottom-btn"
          onClick={ () => handleClick('/meals') }
        >
          <img src={ mealIcon } alt="Meals" />
        </button>
      </div>
    </footer>

  );
}

export default Footer;
