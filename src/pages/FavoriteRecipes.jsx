import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import shareIcon from '../images/shareIcon.svg';
import desfavorIcon from '../images/blackHeartIcon.svg';
import useFilterButtons from '../helpers/useFilterButtons';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState([]);

  const {
    isLinkCopied,
    handleOnClickShareBtn,
  } = useFilterButtons();

  useEffect(() => {
    const favorit = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(favorit);
  }, []);

  const handleOnClickDesfavorBtn = (recipe) => {
    const updateStorage = [...favorites];
    updateStorage.splice(recipe, 1);
    setFavorites(updateStorage);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updateStorage));
  };
  return (
    <section>
      <div>
        <button
          onClick={ () => setFavorites(filter) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          onClick={ () => {
            const filterMeal = favorites.filter((favorite) => favorite.type === 'meal');
            setFavorites(filterMeal);
            setFilter([...favorites, filterMeal]);
          } }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          onClick={ () => {
            const filterDrink = favorites.filter((favorite) => favorite.type === 'drink');
            setFavorites(filterDrink);
            setFilter([...favorites, filterDrink]);
          } }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      <section>
        {
          favorites.map(({ id, name, image,
            category, nationality, type,
            alcoholicOrNot,
          }, index) => (
            type === 'drink' ? (
              <div key={ id }>
                <Link to={ `/drinks/${id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ image }
                    alt="foto da receita"
                  />
                  <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {alcoholicOrNot}
                </p>
                { isLinkCopied && <section><h4>Link copied!</h4></section> }
                <input
                  type="image"
                  onClick={ () => handleOnClickShareBtn(`http://localhost:3000/drinks/${id}`) }
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="icone de compartilhar"
                />
                <input
                  type="image"
                  onClick={ () => handleOnClickDesfavorBtn(index) }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ desfavorIcon }
                  alt="icone de desfavoritar"
                />
              </div>
            ) : (
              <div key={ id }>
                <Link to={ `/meals/${id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ image }
                    alt="foto da receita"
                  />
                  <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${nationality} - ${category}`}
                </p>
                { isLinkCopied && <section><h4>Link copied!</h4></section> }
                <input
                  type="image"
                  onClick={ () => handleOnClickShareBtn(`http://localhost:3000/meals/${id}`) }
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="icone de compartilhar"
                />
                <input
                  type="image"
                  onClick={ () => handleOnClickDesfavorBtn(index) }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ desfavorIcon }
                  alt="icone de desfavoritar"
                />
              </div>
            )
          ))
        }
      </section>
    </section>
  );
}

export default FavoriteRecipes;
