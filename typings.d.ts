type GroupRecipesProps = {
  recipe: RecipeProps;
  navigation: any;
};

type RecipeProps = {
  cooking_instructions: string;
  cook_time_in_mins: number;
  cook_count: number;
  created_at: timestamp;
  description: string;
  difficulty: string;
  enabled: boolean;
  ingredients: [
    {
      measurement_units: string;
      measurement_value: number;
      name: string;
    }
  ];
  number_of_servings: number;
  nutritional_information: {
    calories_in_cal: number;
    carbs_in_grams: number;
    fat_in_grams: number;
    protein_in_grams: number;
  };
  recipe_id: number;
  recipe_images: string[];
  recipe_name: string;
  token_reward: number;
};

type GroupMealProps = {
  meal: MealProps;
  navigation: any;
};

type MealProps = {
  created_at: timestamp;
  current_state: string;
  dish_photos: string[];
  ingredients_photos: string[];
  my_meals_id: string;
  recipe_id: number;
  tokens_earned: number;
  user_id: string;
};
type timestamp = {
  nanoseconds: number;
  seconds: number;
};

type AuthProps = {
  admin: boolean;
  black_listed: boolean;
  created_at?: timestamp;
  creator: boolean;
  email?: string;
};

type CreditsProps = {
  admeal_token: number;
  dish_token: number;
};

type UserDbProps = {
  auth: AuthProps;
  credits: CreditsProps;
};

type ProfileUserInfoProps = {
  email: string;
  given_name: string;
  picture: string;
};

type AdditionalUserInfoProps = {
  profile: ProfileUserInfoProps;
};

type UserProps = {
  user: {
    uid: string;
    email: string;
  };
  additionalUserInfo: AdditionalUserInfoProps;
};
