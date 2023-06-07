import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import headerContext from '../context/Contexts/headerContext';

function TitleHeader() {
  const { pageUrl } = useContext(headerContext);
  const history = useHistory();
  let page = history.location.pathname;

  if (pageUrl) {
    page = pageUrl;
  }

  console.log(page);
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
