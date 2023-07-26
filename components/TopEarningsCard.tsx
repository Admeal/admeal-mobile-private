import { Image, Text, TouchableOpacity, View } from "react-native";

import { useRecoilState } from "recoil";
import { recipeItemState } from "../atoms/dataAtom";

import PriceTag from "./PriceTag";
import TimeTag from "./TimeTag";
import CookCountIcon from "../assets/icons/cookCountIcon";

const TopEarningsCard = ({ recipe, navigation }: GroupRecipesProps) => {
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
      token_reward: recipe.token_reward
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
        className="absolute w-full h-full rounded-xl"
      />
      <PriceTag tokenName="DISH" price={recipe.token_reward} />
      <View className="absolute bottom-0 w-full p-2 bg-white h-2/5 rounded-b-xl">
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
