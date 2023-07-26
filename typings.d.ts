type GroupRecipesProps = {
  recipe: RecipeProps;
  navigation?: NavigationProp<Record<string, object | undefined>, string, any, any, any>;
};

type RecipeProps = {
  cook_count: number;
  cook_time_in_mins: number;
  cooking_instructions: string;
  enabled: boolean;
  created_at: string;
  creator_name: string;
  creator_photo: string;
  description: string;
  difficulty: string;
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

type NavigationProp = {
  navigate: (screen: string, params?: any) => void;
  getState: () => { routes: { name: string }[] };
  reset: (arg0: { index: number; routes: { name: string }[] }) => void;
  dispatch: (arg0: any) => void;
};

type NavigationNavigateProp = {
  navigate: (screen: string, params?: any) => void;
  reset: (arg0: { index: number; routes: { name: string }[] }) => void;
};

type NavigationResetProp = {
  reset: (arg0: { index: number; routes: { name: string }[] }) => void;
};

type GroupMealProps = {
  meal?: MealProps;
  navigation: NavigationNavigateProp<
    Record<string, object | undefined>,
    string,
    any,
    any,
    any
  >;
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
  created_at: timestamp;
  creator: boolean;
  device_id: string;
  email: string;
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
  additionalUserInfo: AdditionalUserInfoProps;
  profile: ProfileUserInfoProps;
  user: {
    email: string;
    uid: string;
  };
};
