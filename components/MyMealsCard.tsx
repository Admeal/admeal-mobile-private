import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import { useRecoilState } from "recoil";
import {
  recipeListState,
  recipeItemState,
  isIngredientsSumbittedState,
  isReadyDishState,
  ingredientsImageState,
  dishImageState,
  mealsListState,
  mealStatusState
} from "../atoms/dataAtom";

const MyMealsCard = ({ meal, navigation }: MealProps) => {
  const [recipeList, setRecipeList] = useRecoilState(recipeListState);
  const [recipeItem, setRecipeItem] = useRecoilState(recipeItemState);
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [dishImage, setDishImage] = useRecoilState(dishImageState);
  const { recipeImages, ingredients } = recipeItem;
  const [mealStatus, setMealStatus] = useRecoilState(mealStatusState);

  const handleStatusButtonUI = () => {
    switch (meal.current_state) {
      case "Finished":
      case "COMPLETE":
      case "COMPLETED":
        return "bg-[#229A16] text-white ";
      case "AWAITING_VALIDATION":
        return "bg-[#919EAB]/25 text-[#919EAB] ";
      case "INVALID":
        return "bg-white text-[#919EAB] ";
      case "IN_PROGRESS_DISH":
      case "IN_PROGRESS_INGREDIENTS":
      case "INCOMPLETE":
        return " bg-[#FF1E00] text-white ";
      default:
        return "";
    }
  };

  const handleStatusText = () => {
    switch (meal.current_state) {
      case "Finished":
      case "COMPLETE":
      case "COMPLETED":
        return "Complete";
      case "IN_PROGRESS_DISH":
        return "Take a photo of the dish";
      case "IN_PROGRESS_INGREDIENTS":
        return "Take a photo of ingredients";
      case "INVALID":
        return "Invalid";
      case "AWAITING_VALIDATION":
        return "Awaiting validation";
      case "INCOMPLETE":
        return "Incomplete";
      default:
        return "";
    }
  };

  const getRecipeName = () => {
    const recipe = recipeList.find((recipe) => recipe.recipe_id === meal.recipe_id);
    return recipe?.recipe_name;
  };

  const getRecipeImage = () => {
    const recipe = recipeList.find((recipe) => recipe.recipe_id === meal.recipe_id);
    return recipe?.recipe_images[0];
  };

  const handleItemPress = () => {
    setIsIngredientsSumbitted(false);
    setIsReadyDish(false);
    if (meal.ingredients_photos[0] !== "") {
      setIngredientsImage(meal.ingredients_photos[0]);
    }
    if (meal.dish_photos[0] !== "") {
      setDishImage(meal.dish_photos[0]);
    }
    setMealStatus(meal.current_state);

    if (ingredientsImage) {
      setIsIngredientsSumbitted(true);
    }
    if (ingredientsImage && dishImage) {
      setIsReadyDish(true);
    }

    navigation.navigate("CheckStatus", {
      meal
    }); //
  };

  return (
    <TouchableOpacity
      style={[
        {
          shadowColor: "#000",
          shadowOffset: {
            width: 1,
            height: 5
          },
          shadowOpacity: 0.26,
          shadowRadius: 3.18,

          elevation: 4
        }
      ]}
      onPress={handleItemPress}
      className="my-1 w-[100%] flex-row space-x-4 rounded-2xl bg-white shadow-2xl">
      <ImageBackground
        className="h-[121px] w-[84px] flex-col justify-between "
        borderBottomLeftRadius={16}
        borderTopLeftRadius={16}
        source={{
          uri: getRecipeImage()
        }}></ImageBackground>
      <View className="w-[100%] flex-col items-start justify-between">
        <Text className="pt-3 font-[Poppins-600] text-sm text-[#1D1D1D]">
          {getRecipeName()}
        </Text>
        <View className="flex-row items-center">
          <Text
            style={[
              {
                shadowColor: "#000",
                shadowOffset: {
                  width: 1,
                  height: 5
                },
                shadowOpacity: 0.36,
                shadowRadius: 4.18,

                elevation: 5
              }
            ]}
            className={`h-[30px] rounded-[18px] px-3 pt-1 text-center align-middle font-[Poppins-700] text-[13px] ${handleStatusButtonUI()}`}>
            {handleStatusText()}
          </Text>
        </View>
        <View className="w-[57%] flex-row items-center justify-between pb-4 ">
          <Text className="font-[Poppins-400] text-sm text-[#637381]">Earned:</Text>
          <View className="flex-row items-center space-x-4">
            <View className="flex-row items-center space-x-2">
              <Text className="font-[Poppins-700]">{meal.tokens_earned}</Text>
              <Image source={require("../assets/png/coin1.png")} />
            </View>
            <View className="flex-row items-center space-x-2">
              <Text className="font-[Poppins-700]">0</Text>
              <Image source={require("../assets/png/coin2.png")} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyMealsCard;
