import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import React from "react";
import PriceTag from "./PriceTag";
import TimeTag from "./TimeTag";

import { useRecoilState } from "recoil";
import { recipeItemState } from "../atoms/dataAtom";
import CookCountIcon from "../assets/icons/cookCountIcon";

const TopEarningsCard = ({ recipe, navigation }: GroupRecipesProps) => {
  const [recipeItem, setRecipeItem] = useRecoilState(recipeItemState);

  const handleItemPress = () => {
    setRecipeItem({
      recipe_name: recipe.recipe_name,
      token_reward: recipe.token_reward,
      recipe_images: recipe.recipe_images,
      recipe_id: recipe.recipe_id,
      nutritional_information: recipe.nutritional_information,
      number_of_servings: recipe.number_of_servings,
      ingredients: recipe.ingredients,
      difficulty: recipe.difficulty,
      description: recipe.description,
      cooking_instructions: recipe.cooking_instructions,
      cook_time_in_mins: recipe.cook_time_in_mins,
      cook_count: recipe.cook_count,
      created_at: recipe.created_at,
      enabled: recipe.enabled
    });
    navigation.navigate("RecipeDetails");
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

          elevation: 7
        }
      ]}
      onPress={handleItemPress}
      className="relative mb-4 h-[60vw] w-[47%] rounded-xl bg-gray-800 shadow-md">
      <Image
        borderRadius={16}
        source={{ uri: recipe.recipe_images[0] }}
        resizeMode="cover"
        className="absolute h-full w-full rounded-xl"
      />
      <PriceTag tokenName="DISH" price={recipe.token_reward} />
      <View className="absolute bottom-0 h-2/5 w-full rounded-b-xl bg-white p-2">
        <Text className="h-10 font-[Poppins-600] text-base leading-5 text-[#1D1D1D]">
          {recipe.recipe_name}
        </Text>
        <View className="flex-row items-center justify-between">
          <TimeTag time={recipe.cook_time_in_mins} />
          <View className="m-1 h-5 w-[47px] flex-row items-center justify-between rounded-md px-1">
            <CookCountIcon />
            <Text className="pr-1 pt-1 font-[Poppins-400] text-xs text-[#637381]">
              {recipe.cook_count}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TopEarningsCard;
