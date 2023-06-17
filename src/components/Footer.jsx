import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Brandy, CheckSquareOffset, CookingPot, Heart } from '@phosphor-icons/react';
import styles from './styles/Footer.module.css';
import headerContext from '../context/Contexts/headerContext';
import recipesContext from '../context/Contexts/recipesContext';
import searchContext from '../context/Contexts/searchContext';

const doneRecipesText = '/done-recipes';
const favoriteRecipesText = '/favorite-recipes';

function Footer() {
  const { pageUrl, setPageUrl } = useContext(headerContext);
  const { setPageMealOrDrink } = useContext(recipesContext);
  const { setIsSearch } = useContext(searchContext);
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
          onClick={ () => {
            setIsSearch(false);
            handleClick('/meals');
          } }
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
          onClick={ () => {
            setIsSearch(false);
            handleClick('/drinks');
          } }
        >
          <Brandy
            data-testid="drinks-bottom-btn"
            className={ pageUrl === '/drinks' && styles.btnFooterFilled }
            size={ 32 }
            weight={ pageUrl === '/drinks' ? 'fill' : 'regular' }
          />
        </button>

        <button
          className={ styles.btnFooter }
          onClick={ () => {
            setIsSearch(false);
            handleClick(doneRecipesText);
          } }
        >
          <CheckSquareOffset
            className={ pageUrl === doneRecipesText && styles.btnFooterFilled }
            size={ 32 }
            weight={ pageUrl === doneRecipesText ? 'fill' : 'regular' }
          />
        </button>

        <button
          className={ styles.btnFooter }
          onClick={ () => {
            setIsSearch(false);
            handleClick(favoriteRecipesText);
          } }
        >
          <Heart
            className={ pageUrl === favoriteRecipesText && styles.btnFooterFilled }
            size={ 32 }
            weight={ pageUrl === favoriteRecipesText ? 'fill' : 'regular' }
          />
        </button>
      </footer>
    );
  }
}

export default Footer;
