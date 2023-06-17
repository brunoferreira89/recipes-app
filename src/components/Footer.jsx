import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Brandy, CheckSquareOffset, CookingPot, Heart } from '@phosphor-icons/react';
import styles from './styles/Footer.module.css';
import headerContext from '../context/Contexts/headerContext';
import recipesContext from '../context/Contexts/recipesContext';

function Footer() {
  const { pageUrl, setPageUrl } = useContext(headerContext);
  const { setPageMealOrDrink } = useContext(recipesContext);
  const history = useHistory();

  const page = history.location.pathname;

  useEffect(() => {}, [pageUrl]);

  const handleClick = (path) => {
    setPageUrl(path);
    setPageMealOrDrink(path);
    history.push(path);
  };

  if (page !== '/') {
    return (
      <footer className={ styles.footer } data-testid="footer">
        <button
          className={ styles.btnFooter }
          type="button"
          onClick={ () => handleClick('/meals') }
        >
          <CookingPot
            data-testid="meals-bottom-btn"
            className={ pageUrl === '/meals' && styles.btnFooterFilled }
            size={ 32 }
            weight={ pageUrl === '/meals' ? 'fill' : 'regular' }
          />
        </button>

        <button
          className={ styles.btnFooter }
          type="button"
          onClick={ () => handleClick('/drinks') }
        >
          <Brandy
            data-testid="drinks-bottom-btn"
            className={ pageUrl === '/drinks' && styles.btnFooterFilled }
            size={ 32 }
          />
        </button>

        <button
          className={ styles.btnFooter }
          onClick={ () => handleClick('/done-recipes') }
        >
          <CheckSquareOffset
            className={ pageUrl === '/done-recipes' && styles.btnFooterFilled }
            size={ 32 }
          />
        </button>

        <button
          className={ styles.btnFooter }
          onClick={ () => handleClick('/favorite-recipes') }
        >
          <Heart
            className={ pageUrl === '/favorite-recipes' && styles.btnFooterFilled }
            size={ 32 }
          />
        </button>
      </footer>
    );
  }
}

export default Footer;
