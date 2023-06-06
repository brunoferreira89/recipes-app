import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import UserProvider from '../../context/Providers/UserProvider';
import RecipesProvider from '../../context/Providers/RecipesProvider';
import DetailsProvider from '../../context/Providers/DetailsProvider';

function renderWithRouterAndContext(component, path = ['/']) {
  const history = createMemoryHistory({ initialEntries: path });

  return ({
    ...render(
      <Router history={ history }>
        <UserProvider>
          <RecipesProvider>
            <DetailsProvider>
              {component}
            </DetailsProvider>
          </RecipesProvider>
        </UserProvider>
      </Router>,
    ),
    history,
  });
}

export default renderWithRouterAndContext;
