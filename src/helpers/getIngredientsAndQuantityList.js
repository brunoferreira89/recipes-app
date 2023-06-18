export const getMealIngredientsList = (data) => {
  if ('meals' in data) {
    const ingredientsKey = Object.keys(data.meals[0])
      .filter((key) => key.includes('strIngredient'));

    const ingredientsList = ingredientsKey.map((ingredient) => data.meals[0][ingredient])
      .filter((element) => {
        if (typeof element === 'string') {
          return element.length > 1;
        }
        return element !== null;
      });
    return ingredientsList;
  }

  return [];
};

export const getMealIngredientsQuantityList = (data) => {
  if ('meals' in data) {
    const ingredientsQuantityKey = Object.keys(data.meals[0])
      .filter((key) => key.includes('strMeasure'));

    const ingredientsQuantityList = ingredientsQuantityKey
      .map((ingredient) => data.meals[0][ingredient])
      .filter((element) => {
        if (typeof element === 'string') {
          return element.length > 1;
        }
        return element !== null;
      });
    return ingredientsQuantityList;
  }

  return [];
};

export const getDrinkIngredientsList = (data) => {
  if ('drinks' in data) {
    const ingredientsKey = Object.keys(data.drinks[0])
      .filter((key) => key.includes('strIngredient'));

    const ingredientsList = ingredientsKey.map((ingredient) => data.drinks[0][ingredient])
      .filter((element) => {
        if (typeof element === 'string') {
          return element.length > 0;
        }
        return element !== null;
      });
    return ingredientsList;
  }

  return [];
};

export const getDrinkIngredientsQuantityList = (data) => {
  if ('drinks' in data) {
    const ingredientsQuantityKey = Object.keys(data.drinks[0])
      .filter((key) => key.includes('strMeasure'));

    const ingredientsQuantityList = ingredientsQuantityKey
      .map((ingredient) => data.drinks[0][ingredient])
      .filter((element) => {
        if (typeof element === 'string') {
          return element.length > 0;
        }
        return element !== null;
      });
    return ingredientsQuantityList;
  }

  return [];
};
