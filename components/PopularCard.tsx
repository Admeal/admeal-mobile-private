import { Text, ImageBackground, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";

import { useRecoilState } from "recoil";
import { recipeItemState } from "../atoms/dataAtom";
import PriceTag from "./PriceTag";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

const PopularCard = ({ recipe, navigation }: RecipeProps) => {
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
    cook_time_in_mins
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
      cookTimeInMins: cook_time_in_mins
    });
    navigation.navigate("RecipeDetails");
  };

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  return (
    <TouchableOpacity className="mr-2 rounded-2xl shadow-2xl" onPress={handleItemPress}>
      <ImageBackground
        className=" h-[130px] w-[96px] flex-col justify-between rounded-2xl border border-[#919EAB] bg-black shadow-2xl"
        borderRadius={16}
        source={{
          uri: recipe_images[0]
        }}>
        <PriceTag price={token_reward} />
        <Text className="pb-2 pl-2 text-xs font-bold text-white">{recipe_name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default PopularCard;
