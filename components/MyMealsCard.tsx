import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import { useRecoilState } from "recoil";
import { recipeListState, recipeItemState } from "../atoms/dataAtom";

const MyMealsCard = ({ meal, navigation }: MealProps) => {
  const [recipeList, setRecipeList] = useRecoilState(recipeListState);
  const [recipeItem, setRecipeItem] = useRecoilState(recipeItemState);

  const handleStatusButtonUI = () => {
    switch (meal.current_state) {
      case "Finished":
      case "COMPLETE":
        return "bg-none text-[#637381] text-xs font-normal";
      case "IN_PROGRESS_DISH":
        return "h-[30px] rounded-[18px] bg-[#FF1E00] pt-1 text-center align-middle text-sm font-extrabold  text-white px-3 font-[Poppins-700]";
      case "IN_PROGRESS_INGREDIENTS":
        return "h-[30px] rounded-[18px] bg-[#FF1E00] pt-1 text-center align-middle text-sm font-extrabold  text-white px-3 font-[Poppins-700]";
      default:
        return "";
    }
  };

  const handleStatusText = () => {
    switch (meal.current_state) {
      case "Finished":
      case "COMPLETE":
        return "Finished";
      case "IN_PROGRESS_DISH":
        return "Take a photo of the dish";
      case "IN_PROGRESS_INGREDIENTS":
        return "Take a photo of ingredients";
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
    const recipeId = meal.recipe_id;

    // setRecipeItem({
    //   recipeName: recipeList.find((recipe) => recipe.recipe_id === recipeId)?.recipe_name,
    //   price: recipeList.find((recipe) => recipe.recipe_id === recipeId)?.token_reward,
    //   recipeImages: recipeList.find((recipe) => recipe.recipe_id === recipeId)
    //     ?.recipe_images[0],
    //   recipeId: recipeList.find((recipe) => recipe.recipe_id === recipeId)?.recipe_id,
    //   nutritionalInformation: recipeList.find((recipe) => recipe.recipe_id === recipeId)
    //     ?.nutritional_information,
    //   numberOfServings: recipeList.find((recipe) => recipe.recipe_id === recipeId)
    //     ?.number_of_servings,
    //   ingredients: recipeList.find((recipe) => recipe.recipe_id === recipeId)
    //     ?.ingredients,
    //   difficulty: recipeList.find((recipe) => recipe.recipe_id === recipeId)?.difficulty,
    //   description: recipeList.find((recipe) => recipe.recipe_id === recipeId)
    //     ?.description,
    //   cookingInstructions: recipeList.find((recipe) => recipe.recipe_id === recipeId)
    //     ?.cooking_instructions,
    //   cookTimeInMins: recipeList.find((recipe) => recipe.recipe_id === recipeId)
    //     ?.cook_time_in_mins,
    //   cookCount: recipeList.find((recipe) => recipe.recipe_id === recipeId)?.cook_count
    // });
    navigation.navigate("CheckStatus"); //
  };

  return (
    <TouchableOpacity
      onPress={handleItemPress}
      className="my-2 w-[100%] flex-row space-x-4 rounded-2xl bg-white shadow-2xl">
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
          <Text className={`text-xs ${handleStatusButtonUI()}`}>
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
