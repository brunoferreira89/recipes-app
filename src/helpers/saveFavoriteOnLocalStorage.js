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

export const handleSaveFavoriteMeal = ({ meals }) => {
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
};

export const handleSaveFavoriteDrink = ({ drinks }) => {
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
};
