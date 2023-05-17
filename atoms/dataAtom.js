import { atom } from 'recoil';

export const userListState = atom({
  key: 'userListState',
  default: [],
});

export const userIdState = atom({
  key: 'userIdState',
  default: null,
});

export const recipeListState = atom({
  key: 'recipeListState',
  default: [],
});

export const mealsListState = atom({
  key: 'mealsListState',
  default: [],
});

export const recipeItemState = atom({
  key: 'recipeItemState',
  default: {
    recipeName: '',
    price: 0,
    recipeImages: '',
    recipeId: 0,
    nutritionalInformation: {
      calories_in_cal: 0,
      carbs_in_grams: 0,
      protein_in_grams: 0,
      fat_in_grams: 0,
    },
    numberOfServings: 0,
    ingredients: [{ measurement_units: '', measurement_value: 0, name: '' }],
    difficulty: '',
    description: '',
    cookingInstructions: '',
    cookTimeInMins: 0,
    cookCount: 0,
  },
});

export const recipeStepsStatusState = atom({
  key: 'recipeStepsStatusState',
  default: '',
});

export const isIngredientsSumbittedState = atom({
  key: 'isIngredientsSumbittedState',
  default: false,
});

export const isReadyDishState = atom({
  key: 'isReadyDishState',
  default: false,
});

export const ingredientsImageState = atom({
  key: 'ingredientsImageState',
  default: '',
});

export const dishImageState = atom({
  key: 'dishImageState',
  default: '',
});
