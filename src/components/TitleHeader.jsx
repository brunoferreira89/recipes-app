import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function TitleHeader() {
  const history = useHistory();

  const page = history.location.pathname;

  return (
    <h1 data-testid="page-title">
      {
        page.includes('meals') && 'Meals'
      }
      {
        page.includes('drinks') && 'Drinks'
      }
      {
        page.includes('profile') && 'Profile'
      }
      {
        page.includes('done-recipes') && 'Done Recipes'
      }
      {
        page.includes('favorite-recipes') && 'Favorite Recipes'
      }
    </h1>
  );
}

export default TitleHeader;
