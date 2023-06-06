import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UserProvider from './context/Providers/UserProvider';
import DetailsProvider from './context/Providers/DetailsProvider';
import RecipesProvider from './context/Providers/RecipesProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <UserProvider>
        <RecipesProvider>
          <DetailsProvider>
            <App />
          </DetailsProvider>
        </RecipesProvider>
      </UserProvider>
    </BrowserRouter>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
