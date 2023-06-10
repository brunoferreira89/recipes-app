import checkIfItsDoneOnStorage from './checkIfItsDoneOnStorage';

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

export const handleSaveDoneRecipe = (doneRecipe, id = '') => {
  const isInTheDone = checkIfItsDoneOnStorage(id);

  if (!isInTheDone) {
    saveDoneRecipeOnLocalStorage(doneRecipe);
  } else {
    return false;
  }
};
