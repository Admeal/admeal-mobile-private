type RecipeProps = {
  recipe: {
    recipe_name: string;
    token_reward: number;
    recipe_images: string[];
    recipe_id: number;
    nutritional_information: {
      calories_in_cal: number;
      carbs_in_grams: number;
      fat_in_grams: number;
      protein_in_grams: number;
    };
    number_of_servings: number;
    ingredients: {
      measurement_units: string;
      measurement_value: string;
      name: string;
    };
    difficulty: string;
    description: string;
    cooking_instructions: string;
    cook_time_in_mins: number;
  };
  navigation: any;
};
