import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Header from './components/Header';
import Footer from './components/Footer';

function RouterSwitch() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals">
        <Header />
        <Recipes />
        <Footer />
      </Route>
      <Route exact path="/drinks">
        <Header />
        <Recipes />
        <Footer />
      </Route>
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/done-recipes">
        <Header />
        <DoneRecipes />
      </Route>
      <Route path="/profile">
        <Header />
        <Profile />
        <Footer />
      </Route>
      <Route path="/favorite-recipes">
        <Header />
        <FavoriteRecipes />
      </Route>
    </Switch>
  );
}

export default RouterSwitch;
