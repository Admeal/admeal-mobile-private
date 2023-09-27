type GroupRecipesProps = {
  recipe: RecipeProps;
  navigation?: NavigationProp<Record<string, object | undefined>, string, any, any, any>;
};

type TimeTagProps = number;

type RecipeProps = {
  cook_count: number;
  cook_time_in_mins: TimeTagProps;
  cooking_instructions: string;
  created_at: timestamp;
  creator_name: string;
  creator_photo: string;
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

type ScreensProps = {
  navigation: NavigationProp<Record<string, object | undefined>, string, any, any, any>;
  route: {
    params: {
      mealId: string;
      temporaryImage?: string;
      recipe: RecipeProps;
    };
  };
};

type NavigationProp = NavigationProp<
  Record<string, object | undefined>,
  string,
  any,
  any,
  any
>;

type RouteProps = {
  name: "CameraUpload" | "CheckStatus" | "ImageVerification" | "RecipeDetails" | "Wallet";
};

type NavigationNavigateProp = {
  navigate: (screen: string, params?: any) => void;
  reset: (arg0: { index: number; routes: { name: string }[] }) => void;
};

type NavigationResetProp = {
  reset: (arg0: { index: number; routes: { name: string }[] }) => void;
};

type GroupMealProps = {
  route?: {
    params: {
      mealId: string;
      temporaryImage: string;
    };
  };
  meal?: MealProps;
  mealId?: string;
  navigation: NavigationNavigateProp<
    Record<string, object | undefined>,
    string,
    any,
    any,
    any
  >;
};

type MealStatusProps = "COMPLETE" | "INVALID" | "AWAITING_VALIDATION" | "INCOMPLETE" | "";

type MealProps = {
  created_at: timestamp;
  current_state: MealStatusProps;
  dish_photos: string[];
  ingredients_photos: string[];
  my_meals_id: string;
  recipe_id: number;
  submitted: boolean;
  submitted_at: null | timestamp;
  tokens_earned: number;
  user_id: string;
};

type NftItemProps = {
  name: string;
  description: string;
  image: string;
  external_url: string;
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
  wallet: string;
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
