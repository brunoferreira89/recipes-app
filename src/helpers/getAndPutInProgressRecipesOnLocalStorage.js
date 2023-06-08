const getAndPutInProgRecipes = (id, pathname, inProgressRecipesOnStorage) => {
  if (pathname.includes('/meals')) {
    let copyLocalStorage = {};
    if (!inProgressRecipesOnStorage) {
      copyLocalStorage = { drinks: {}, meals: { [id]: [] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(copyLocalStorage));
    }
    if (inProgressRecipesOnStorage) {
      const responseLocalStorage = JSON.parse(inProgressRecipesOnStorage);
      copyLocalStorage = { ...responseLocalStorage };
    }
    const isAlreadyHaveOnLocalStorage = Object.keys(copyLocalStorage.meals)
      .some((key) => Number(key) === Number(id));
    if (!isAlreadyHaveOnLocalStorage) {
      copyLocalStorage.meals[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(copyLocalStorage));
    }
  }

  if (pathname.includes('/drinks')) {
    let copyLocalStorage = {};
    if (!inProgressRecipesOnStorage) {
      copyLocalStorage = { drinks: { [id]: [] }, meals: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(copyLocalStorage));
    }
    if (inProgressRecipesOnStorage) {
      const responseLocalStorage = JSON.parse(inProgressRecipesOnStorage);
      copyLocalStorage = { ...responseLocalStorage };
    }
    const isAlreadyHaveOnLocalStorage = Object.keys(copyLocalStorage.drinks)
      .some((key) => Number(key) === Number(id));
    if (!isAlreadyHaveOnLocalStorage) {
      copyLocalStorage.drinks[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(copyLocalStorage));
    }
  }
};

export default getAndPutInProgRecipes;
