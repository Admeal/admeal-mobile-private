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
    ingredients: [
      {
        measurement_units: string;
        measurement_value: number;
        name: string;
      }
    ];
    difficulty: string;
    description: string;
    cooking_instructions: string;
    cook_time_in_mins: number;
    cook_count: number;
  };
  navigation?: any;
};

type MealProps = {
  meal: {
    current_state: string;
    dish_photos: string[];
    ingredients_photos: string[];
    my_meals_id: number;
    recipe_id: number;
    time_stamp_started: number;
    time_stamp_validated: number;
    tokens_earned: number;
  };
  navigation?: any;
};
