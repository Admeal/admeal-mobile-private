import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useRecoilState } from "recoil";
import { isIngredientsSumbittedState, isReadyDishState } from "../atoms/dataAtom";

import FoodIngredientsIcon from "../assets/icons/foodIngredientsIcon";
import GoBackButton from "../components/buttons/GoBackButton";
import PreparedDishIcon from "../assets/icons/preparedDishIcon";
import RecipeStatusButton from "../components/buttons/RecipeStatusButton";
import CheckboxIcon from "../assets/icons/checkboxIcon";

const CheckStatus = ({ navigation }: any) => {
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );

  return (
    <View className="flex-col items-center ">
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "space-between"
        }}>
        <View className="flex-row items-start w-full pb-10">
          <GoBackButton navigation={navigation} color="black" />
        </View>
        <Text className="pb-3 font-[Poppins-700] text-2xl">Excellent choice!</Text>
        <Text className="w-[70%] pb-[60px] text-center font-[Poppins-400] text-sm text-[#6D6D6D]">
          Now follow the steps to get tokens and track your progress.
        </Text>
        <FoodIngredientsIcon />
        <Text className="pb-8 pt-3 font-[Poppins-600] text-lg">
          Take a photo of ingredients
        </Text>

        {!isIngredientsSumbitted ? (
          <RecipeStatusButton navigation={navigation} />
        ) : (
          <View className="mb-[48px] flex-row items-center space-x-2">
            <CheckboxIcon />
            <Text className="font-[Poppins-600] text-sm text-[#919EAB]">Submitted</Text>
          </View>
        )}

        <PreparedDishIcon />
        <Text className="pb-8 pt-3 font-[Poppins-600] text-lg">
          Take a photo of prepared dish
        </Text>
        <RecipeStatusButton navigation={navigation} disabled={!isIngredientsSumbitted} />
      </ScrollView>
    </View>
  );
};

export default CheckStatus;
