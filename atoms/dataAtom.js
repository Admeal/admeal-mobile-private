import { atom } from 'recoil';

export const recipeItemState = atom({
  key: 'recipeItemState',
  default: {},
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
