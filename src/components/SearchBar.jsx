import React from 'react';

function SearchBar() {
  return (
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
  );
}

export default SearchBar;
