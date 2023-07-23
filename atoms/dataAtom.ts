import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: null as null | UserProps
});

export const userCreditsState = atom<CreditsProps>({
  key: "userCreditsState",
  default: {
    admeal_token: 0,
    dish_token: 0
  }
});

export const userListState = atom({
  key: "userListState",
  default: []
});

export const recipeListState = atom({
  key: "recipeListState",
  default: []
});

export const mealIdState = atom({
  key: "mealIdState",
  default: "" as string
});

export const myMealsListState = atom({
  key: "myMealsListState",
  default: []
});

export const mealStatusState = atom({
  key: "mealStatusState",
  default: "" as string
});

export const recipeItemState = atom<RecipeProps>({
  key: "recipeItemState",
  default: {
    cook_count: 0,
    cook_time_in_mins: 0,
    cooking_instructions: "",
    created_at: "",
    description: "",
    difficulty: "",
    enabled: false,
    ingredients: [{ measurement_units: "", measurement_value: 0, name: "" }],
    number_of_servings: 0,
    nutritional_information: {
      calories_in_cal: 0,
      carbs_in_grams: 0,
      protein_in_grams: 0,
      fat_in_grams: 0
    },

    recipe_id: 0,
    recipe_name: "",
    recipe_images: [""],
    token_reward: 0
  }
});

export const isIngredientsSumbittedState = atom({
  key: "isIngredientsSumbittedState",
  default: false as boolean
});

export const isReadyDishState = atom({
  key: "isReadyDishState",
  default: false as boolean
});

export const ingredientsImageState = atom({
  key: "ingredientsImageState",
  default: "" as string
});

export const dishImageState = atom({
  key: "dishImageState",
  default: "" as string
});
