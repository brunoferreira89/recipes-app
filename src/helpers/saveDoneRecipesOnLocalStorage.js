// import checkIfItsDoneOnStorage from './checkIfItsDoneOnStorage';

export const saveDoneRecipeOnLocalStorage = (doneRecipe) => {
  const doneRecipeStorage = localStorage.getItem('doneRecipes');

  if (doneRecipeStorage) {
    const copydoneRecipeStorage = [
      ...(JSON.parse(doneRecipeStorage)),
    ];
    copydoneRecipeStorage.push(doneRecipe);

    localStorage.setItem('doneRecipes', JSON.stringify(copydoneRecipeStorage));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
  }
};

// export const handleSaveFavoriteMeal = ({ meals }, id = '') => {
//   const isInTheFavorite = checkIfItsDoneOnStorage(id);

//   if (!isInTheFavorite) {
//     const favoriteRecipe = {
//       id: meals[0].idMeal,
//       type: 'meal',
//       nationality: meals[0].strArea || '',
//       category: meals[0].strCategory || '',
//       alcoholicOrNot: '',
//       name: meals[0].strMeal,
//       image: meals[0].strMealThumb,
//     };
//     SaveFavoriteRecipes(favoriteRecipe);
//   } else {
//     const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
//     const indexOfFavorite = favoriteRecipes.findIndex((recipe) => recipe.id === id);
//     favoriteRecipes.splice(indexOfFavorite, 1);
//     localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
//   }
// };
