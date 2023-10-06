import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

import { useRecoilState } from "recoil";
import {
  dishImageState,
  ingredientsImageState,
  isIngredientsSumbittedState,
  isReadyDishState,
  mealIdState,
  mealStatusState,
  recipeListState
} from "../atoms/dataAtom";

import AdmealCoinLogo from "../assets/icons/admealCoinLogo";
import DishCoinLogo from "../assets/icons/dishCoinLogo";

import shadows from "../hooks/shadows";
import { memo } from "react";

const MyMealsCard = memo(function MyMealsCard({ meal, navigation }: GroupMealProps) {
  const [dishImage, setDishImage] = useRecoilState(dishImageState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [mealId, setMealId] = useRecoilState(mealIdState);
  const [mealStatus, setMealStatus] = useRecoilState(mealStatusState);
  const [recipeList, setRecipeList] = useRecoilState(recipeListState);

  const handleStatusButtonUI = () => {
    switch (meal?.current_state) {
      case "COMPLETE":
        return "bg-[#229A16] text-white ";
      case "AWAITING_VALIDATION":
        return "bg-[#919EAB]/25 text-[#919EAB] ";
      case "INVALID":
        return "bg-white text-[#919EAB] ";
      case "INCOMPLETE":
        return " bg-[#FF1E00] text-white ";
      default:
        return "";
    }
  };

  const handleStatusText = () => {
    switch (meal?.current_state) {
      case "COMPLETE":
        return "Complete";
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

  const recipe = recipeList.find(
    (recipe: RecipeProps) => recipe.recipe_id === meal?.recipe_id
  );

  const handleItemPress = () => {
    setMealId(meal!.my_meals_id);
    setIsIngredientsSumbitted(false);
    setIngredientsImage("");
    setIsReadyDish(false);
    setDishImage("");

    if (meal?.dish_photos[0] === "") {
      setIsReadyDish(false);
    } else {
      setIsReadyDish(true);
    }
    if (meal?.ingredients_photos[0] === "") {
      setIsIngredientsSumbitted(false);
    } else {
      setIsIngredientsSumbitted(true);
    }
    setMealStatus(meal?.current_state as MealStatusProps);

    navigation.navigate("CheckStatus", {
      mealId: meal?.my_meals_id
    });
  };

  return (
    <TouchableOpacity
      style={shadows.mealCardShadow}
      onPress={handleItemPress}
      className="-px-2 my-2 w-[100%] flex-row space-x-4 rounded-2xl bg-white shadow-2xl">
      <ImageBackground
        className="h-[121px] w-[84px] flex-col justify-between "
        borderBottomLeftRadius={16}
        borderTopLeftRadius={16}
        source={{
          uri: recipe?.recipe_images[0],
          method: "POST"
        }}></ImageBackground>
      <View className="w-[100%] flex-col items-start justify-between">
        <Text className="pt-3 font-[Poppins-600] text-sm text-[#1D1D1D]">
          {recipe?.recipe_name}
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
              <Text className="font-[Poppins-700] text-lg">{meal?.tokens_earned}</Text>
              <View>
                <DishCoinLogo size={16} scale={0.7} />
              </View>
            </View>
            <View className="flex-row items-center space-x-2">
              <Text className="font-[Poppins-700] text-lg">0</Text>
              <View>
                <AdmealCoinLogo size={16} scale={0.7} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default MyMealsCard;
