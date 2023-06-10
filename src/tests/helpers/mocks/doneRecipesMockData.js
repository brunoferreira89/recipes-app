const mockSetLocalStorage = () => global.localStorage.setItem('doneRecipes', JSON.stringify([
  {
    id: '52977',
    type: 'meal',
    category: 'Side',
    nationality: 'Turkish',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: '29/09/2022',
    tags: ['Soup'],
  },
  {
    id: '17203',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: '',
    name: 'Kir',
    image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
    doneDate: '29/09/2022',
    tags: ['IBA', 'ContemporaryClassic'],
  },
]));

export default mockSetLocalStorage;
