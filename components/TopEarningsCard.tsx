import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import React from "react";
import PriceTag from "./PriceTag";
import TimeTag from "./TimeTag";

import { useRecoilState } from "recoil";
import { recipeItemState } from "../atoms/dataAtom";

const TopEarningsCard = ({ recipe, navigation }: RecipeProps) => {
  const [recipeItem, setRecipeItem] = useRecoilState(recipeItemState);

  const {
    recipe_name,
    token_reward,
    recipe_images,
    recipe_id,
    nutritional_information,
    number_of_servings,
    ingredients,
    difficulty,
    description,
    cooking_instructions,
    cook_time_in_mins,
    cook_count
  } = recipe;

  const handleItemPress = () => {
    setRecipeItem({
      recipeName: recipe_name,
      price: token_reward,
      recipeImages: recipe_images[0],
      recipeId: recipe_id,
      nutritionalInformation: nutritional_information,
      numberOfServings: number_of_servings,
      ingredients: ingredients,
      difficulty: difficulty,
      description: description,
      cookingInstructions: cooking_instructions,
      cookTimeInMins: cook_time_in_mins,
      cookCount: cook_count
    });
    navigation.navigate("RecipeDetails");
  };

  return (
    <TouchableOpacity
      onPress={handleItemPress}
      className="relative mb-4 h-[208px] w-[47%] max-w-[163px] rounded-xl bg-gray-800 shadow-md">
      <Image
        borderRadius={16}
        source={{ uri: recipe.recipe_images[0] }}
        resizeMode="cover"
        className="absolute h-full w-full rounded-xl"
      />
      <PriceTag price={recipe.token_reward} />
      <View className="absolute bottom-0 h-2/5 w-full rounded-b-xl bg-white p-2">
        <TimeTag time={recipe.cook_time_in_mins} />
        <Text className="font-[Poppins-600] text-[13px] text-[#1D1D1D]">
          {recipe.recipe_name}
        </Text>
        <Text className="font-[Poppins-400] text-xs text-[#637381]">
          Cooked {recipe.cook_count} times
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TopEarningsCard;
