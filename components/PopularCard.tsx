import { Text, ImageBackground, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";

import { useRecoilState } from "recoil";
import { recipeItemState } from "../atoms/dataAtom";
import PriceTag from "./PriceTag";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

const PopularCard = ({ recipe, navigation }: RecipeProps) => {
  const [recipeItem, setRecipeItem] = useRecoilState(recipeItemState);

  const handleItemPress = () => {
    setRecipeItem({
      recipeName: recipe.recipe_name,
      price: recipe.token_reward,
      recipeImages: recipe.recipe_images[0],
      recipeId: recipe.recipe_id,
      nutritionalInformation: recipe.nutritional_information,
      numberOfServings: recipe.number_of_servings,
      ingredients: recipe.ingredients,
      difficulty: recipe.difficulty,
      description: recipe.description,
      cookingInstructions: recipe.cooking_instructions,
      cookTimeInMins: recipe.cook_time_in_mins,
      cookCount: recipe.cook_count
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
          uri: recipe.recipe_images[0]
        }}>
        <PriceTag tokenName="DISH" price={recipe.token_reward} />
        <Text className="pb-2 pl-2 font-[Poppins-400] text-xs font-bold text-white">
          {recipe.recipe_name}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default PopularCard;
