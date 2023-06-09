const checkIfItsDoneOnStorage = (id) => {
  const getLocalStorage = localStorage.getItem('doneRecipes');
  if (getLocalStorage) {
    const doneRecipes = JSON.parse(getLocalStorage);
    const haveTheRecipeInDone = doneRecipes
      .some((recipe) => recipe.id === id);
    console.log(haveTheRecipeInDone);
    return haveTheRecipeInDone;
  }
  return false;
};

export default checkIfItsDoneOnStorage;
