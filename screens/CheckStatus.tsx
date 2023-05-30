import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import { useRecoilState } from "recoil";
import {
  isIngredientsSumbittedState,
  isReadyDishState,
  ingredientsImageState,
  dishImageState,
  mealStatusState
} from "../atoms/dataAtom";

import FoodIngredientsIcon from "../assets/icons/foodIngredientsIcon";
import GoBackButton from "../components/buttons/GoBackButton";
import PreparedDishIcon from "../assets/icons/preparedDishIcon";
import RecipeStatusButton from "../components/buttons/RecipeStatusButton";
import CheckboxIcon from "../assets/icons/checkboxIcon";

const CheckStatus = ({ navigation, meal }: any) => {
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [dishImage, setDishImage] = useRecoilState(dishImageState);
  const [mealStatus, setMealStatus] = useRecoilState(mealStatusState);

  const handleMealStatus = () => {
    switch (mealStatus) {
      case "IN_PROGRESS_INGREDIENTS":
        return "Take a photo of ingredients";
      case "IN_PROGRESS_DISH":
        return "Take a photo of the dish";
      case "COMPLETE":
        return `you have earned ${meal.tokens_earned} tokens!`;
      case "INVALID":
        return "Invalid photos for further information you will receive an email";
      case "AWAITING_VALIDATION":
        return "We’re checking your photos. You’ll receive your reward soon!";
      case "INCOMPLETE":
        return "Complete the steps to get tokens and track your progress";
      default:
        return "";
    }
  };

  return (
    <View className="flex-col items-center w-full h-full">
      <View className="flex-row items-start w-full pb-10">
        <GoBackButton navigation={navigation} color="black" />
      </View>
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "space-between"
        }}>
        <Text className="pb-3 font-[Poppins-700] text-2xl">Excellent choice!</Text>
        <Text className="w-[70%] pb-[60px] text-center font-[Poppins-400] text-sm text-[#6D6D6D]">
          Now follow the steps to get tokens and track your progress.
        </Text>
        {!isIngredientsSumbitted ? (
          <FoodIngredientsIcon />
        ) : (
          <Image style={{ width: 200, height: 200 }} source={{ uri: ingredientsImage }} />
        )}
        <Text className="pb-8 pt-3 font-[Poppins-600] text-lg">
          {!isIngredientsSumbitted ? "Take a photo of ingredients" : "Ingredients photo"}
        </Text>

        {!isIngredientsSumbitted && ingredientsImage === "" ? (
          <RecipeStatusButton navigation={navigation} />
        ) : (
          <View className="mb-[16px] flex-row items-center space-x-2">
            <CheckboxIcon />
            <Text className="font-[Poppins-600] text-sm text-[#919EAB]">Submitted</Text>
          </View>
        )}

        {!isReadyDish && dishImage === "" ? (
          <PreparedDishIcon />
        ) : (
          <Image style={{ width: 200, height: 200 }} source={{ uri: dishImage }} />
        )}
        <Text className="pb-8 pt-3 font-[Poppins-600] text-lg">
          {!isReadyDish ? "Take a photo of prepared dish" : "Dish photo"}
        </Text>
        {!isReadyDish ? (
          <RecipeStatusButton
            navigation={navigation}
            disabled={!isIngredientsSumbitted}
          />
        ) : (
          <>
            <View className="mb-[16px] flex-row items-center space-x-2">
              <CheckboxIcon />
              <Text className="font-[Poppins-600] text-sm text-[#919EAB]">Submitted</Text>
            </View>
            <Text className="w-[253px] text-center font-[Poppins-600] text-[#6D6D6D]">
              {handleMealStatus()}
            </Text>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default CheckStatus;