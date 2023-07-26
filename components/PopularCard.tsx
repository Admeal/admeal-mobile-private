import { Text, ImageBackground, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";

import { useRecoilState } from "recoil";
import { recipeItemState } from "../atoms/dataAtom";
import PriceTag from "./PriceTag";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

const PopularCard = ({ recipe, navigation }: GroupRecipesProps) => {
  const [recipeItem, setRecipeItem] = useRecoilState(recipeItemState);

  const handleItemPress = () => {
    setRecipeItem({
      cook_count: recipe.cook_count,
      cook_time_in_mins: recipe.cook_time_in_mins,
      cooking_instructions: recipe.cooking_instructions,
      created_at: recipe.created_at,
      creator_name: recipe.creator_name,
      creator_photo: recipe.creator_photo,
      description: recipe.description,
      difficulty: recipe.difficulty,
      enabled: recipe.enabled,
      ingredients: recipe.ingredients,
      number_of_servings: recipe.number_of_servings,
      nutritional_information: recipe.nutritional_information,
      recipe_id: recipe.recipe_id,
      recipe_images: recipe.recipe_images,
      recipe_name: recipe.recipe_name,
      token_reward: recipe.token_reward,
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
