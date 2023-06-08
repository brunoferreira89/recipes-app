import checkIfItsFavoritedOnStorage from './checkIfItsFavoritedOnStorage';

const SaveFavoriteRecipes = (favoriteRecipe) => {
  const favoriteRecipesStorage = localStorage.getItem('favoriteRecipes');
  if (favoriteRecipesStorage) {
    const copyFavoritesRecipesStorage = [
      ...(JSON.parse(favoriteRecipesStorage)),
    ];
    copyFavoritesRecipesStorage.push(favoriteRecipe);
    localStorage
      .setItem('favoriteRecipes', JSON.stringify(copyFavoritesRecipesStorage));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]));
  }
};

export const handleSaveFavoriteMeal = ({ meals }, id = '') => {
  const isInTheFavorite = checkIfItsFavoritedOnStorage(id);

  if (!isInTheFavorite) {
    const favoriteRecipe = {
      id: meals[0].idMeal,
      type: 'meal',
      nationality: meals[0].strArea || '',
      category: meals[0].strCategory || '',
      alcoholicOrNot: '',
      name: meals[0].strMeal,
      image: meals[0].strMealThumb,
    };
    SaveFavoriteRecipes(favoriteRecipe);
  } else {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const indexOfFavorite = favoriteRecipes.findIndex((recipe) => recipe.id === id);
    favoriteRecipes.splice(indexOfFavorite, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }
};

export const handleSaveFavoriteDrink = ({ drinks }, id = '') => {
  const isInTheFavorite = checkIfItsFavoritedOnStorage(id);

  if (!isInTheFavorite) {
    const favoriteRecipe = {
      id: drinks[0].idDrink,
      type: 'drink',
      nationality: '',
      category: drinks[0].strCategory || '',
      alcoholicOrNot: drinks[0].strAlcoholic,
      name: drinks[0].strDrink,
      image: drinks[0].strDrinkThumb,
    };
    SaveFavoriteRecipes(favoriteRecipe);
  } else {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const indexOfFavorite = favoriteRecipes.findIndex((recipe) => recipe.id === id);
    favoriteRecipes.splice(indexOfFavorite, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }
};
