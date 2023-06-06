import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import userIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const history = useHistory();
  const [search, setSearch] = useState(false);

  return (
    <section>
      <button onClick={ () => (search ? setSearch(false) : setSearch(true)) }>
        <img data-testid="search-top-btn" src={ searchIcon } alt="icone de pesquisa" />
      </button>
      <button onClick={ () => history.push('/profile') }>
        <img data-testid="profile-top-btn" src={ userIcon } alt="icone de usuario" />
      </button>
      <div>
        <h1>Titulo</h1>
      </div>
      {
        search && (
          <div>
            <input
              data-testid="search-input"
              placeholder="Search"
              type="text"
            />
            <div>
              <label htmlFor="ingredients">
                Ingredient
                <input
                  data-testid="ingredient-search-radio"
                  type="radio"
                  name="element"
                  id="ingredients"
                />
              </label>
              <label htmlFor="name">
                Name
                <input
                  data-testid="name-search-radio"
                  type="radio"
                  name="element"
                  id="name"
                />
              </label>
              <label>
                First letter
                <input
                  data-testid="first-letter-search-radio"
                  type="radio"
                  name="element"
                  id="first-letter"
                />
              </label>
            </div>
            <button data-testid="exec-search-btn">Search</button>
          </div>
        )
      }
    </section>
  );
}
