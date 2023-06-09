const checkIfItsFavoritedOnStorage = (id) => {
  const getLocalStorage = localStorage.getItem('favoriteRecipes');
  if (getLocalStorage) {
    const favoriteRecipes = JSON.parse(getLocalStorage);
    const haveTheRecipeInTheFavorite = favoriteRecipes
      .some((recipe) => recipe.id === id);
    console.log(haveTheRecipeInTheFavorite);
    return haveTheRecipeInTheFavorite;
  }
  return false;
};

export default checkIfItsFavoritedOnStorage;
