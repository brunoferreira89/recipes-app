import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipeDetails from './pages/RecipeDetails';
import HeaderProvider from './context/Providers/HeaderProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Header from './components/Header';
import RecipeInProgress from './pages/RecipeInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import SearchProvider from './context/Providers/SearchProvider';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <HeaderProvider>
      <SearchProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route path="/done-recipes" component={ RecipeInProgress } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </SearchProvider>
    </HeaderProvider>
  );
}

export default App;
