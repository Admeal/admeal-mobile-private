import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";

import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useRecoilState } from "recoil";

import {
  isIngredientsSumbittedState,
  isReadyDishState,
  ingredientsImageState,
  dishImageState,
  recipeItemState,
  recipeListState,
  mealStatusState,
  mealIdState
} from "../atoms/dataAtom";

import DishCoinLogo from "../assets/icons/dishCoinLogo";
import CheckboxIcon from "../assets/icons/checkboxIcon";
import EyeIcon from "../assets/icons/eyeIcon";
import FoodIngredientsIcon from "../assets/icons/foodIngredientsIcon";
import PreparedDishIcon from "../assets/icons/preparedDishIcon";
import GoBackButton from "../components/buttons/GoBackButton";
import RecipeStatusButton from "../components/buttons/RecipeStatusButton";

const CheckStatus = ({ navigation }: any) => {
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [dishImage, setDishImage] = useRecoilState(dishImageState);
  const [mealStatus, setMealStatus] = useRecoilState(mealStatusState);
  const [recipeItem, setRecipeItem] = useRecoilState(recipeItemState);
  const [recipeList, setRecipeList] = useRecoilState(recipeListState);

  const [mealId, setMealId] = useRecoilState<string>(mealIdState);
  const [textStatus, setTextStatus] = useState<string>("");
  const [meal, setMeal] = useState<object | null>(null);
  const [tokenReward, setTokenReward] = useState<number>(0);

  useEffect(() => {}, [mealId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "my_meals", mealId), (snapshot) => {
      console.log("snapshot", snapshot.data());
      setMeal(snapshot.data());
    });

    return () => {
      setMeal(null);
      setIngredientsImage("");
      setDishImage("");
      setIsIngredientsSumbitted(false);
      setIsReadyDish(false);
      unsubscribe();
      console.log("unsubscribed");
    };
  }, [mealId]);

  useEffect(() => {
    if (meal) {
      if (meal?.dish_photos[0] === "") {
        setIsReadyDish(false);
      } else {
        setIsReadyDish(true);
        setDishImage(meal?.dish_photos[0]);
      }
      if (meal?.ingredients_photos[0] === "") {
        setIsIngredientsSumbitted(false);
      } else {
        setIsIngredientsSumbitted(true);
        setIngredientsImage(meal?.ingredients_photos[0]);
      }
      setMealStatus(meal?.current_state);
    }
  });

  useEffect(() => {
    setTextStatus(handleMealStatus());
  }, [meal?.current_state]);

  useEffect(() => {
    recipeList.map((recipe) => {
      if (recipe.recipe_id === meal?.recipe_id) {
        setTokenReward(recipe.token_reward);
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
      }
    });
  }, [meal] || []);

  const handleMealStatus = () => {
    switch (mealStatus) {
      case "COMPLETE":
        return `you have earned ${meal?.tokens_earned} tokens!`;
      case "INVALID":
        return "Your photos weren’t approved.  Probably your uploaded wrong photos.";
      case "AWAITING_VALIDATION":
      case "INCOMPLETE":
        return "We’re checking your photos. You’ll receive your reward soon!";
      default:
        return "";
    }
  };

  return (
    <View className="h-full w-full flex-col items-center justify-between">
      <View className="w-full">
        <GoBackButton navigation={navigation} color="white" />
      </View>

      {mealStatus === "COMPLETE" ? (
        <View className="h-full flex-col items-center justify-between">
          <View className="mt-24 h-[50%] w-[300px] rounded-xl bg-gray-300">
            {dishImage !== "" && (
              <Image
                style={{ width: 300, height: "100%", borderRadius: 12 }}
                source={{ uri: dishImage }}
              />
            )}
          </View>
          <Text className="font-[Poppins-700] text-2xl text-[#212B36]">
            Congratulations
          </Text>
          <View className="flex-col items-center justify-center">
            <Text className="font-[Poppins-500] text-lg text-[#6D6D6D]">You earned</Text>
            <View className="w-full flex-row items-center">
              <Text className="pr-2 font-[Poppins-700] text-2xl text-[#212B36]">
                {tokenReward}
              </Text>
              <DishCoinLogo size={24} />
            </View>
          </View>
          <Text className="px-8 text-center font-[Poppins-400] text-sm text-[#6D6D6D]">
            The reward is in your Wallet. Check it and enjoy your meal.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="my-4 h-[50px] w-[220px] flex-col items-center justify-center rounded-full bg-[#FF1E00] py-2 shadow-[#FF1E00]">
            <Text className="font-[Poppins-700] text-xl text-white">MY RECIPES</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="h-full w-full flex-col items-center justify-between">
          <Text className="pt-11 font-[Poppins-700] text-2xl">Excellent choice!</Text>
          <View>
            <Text className="px-4 text-center font-[Poppins-600] text-sm text-[#6D6D6D]">
              Now follow the steps to get tokens and track your progress.
            </Text>
          </View>

          <View className="pt-4">
            {!isIngredientsSumbitted && ingredientsImage === "" && (
              <FoodIngredientsIcon />
            )}
          </View>
          {isIngredientsSumbitted && ingredientsImage !== "" && (
            <View className="h-[160px] w-[300px] rounded-xl bg-gray-300">
              <Image
                style={{ width: 300, height: 160, borderRadius: 12 }}
                source={{ uri: ingredientsImage }}
              />
            </View>
          )}

          {!isIngredientsSumbitted && (
            <Text className="font-[Poppins-600] text-lg">
              Take a photo of ingredients
            </Text>
          )}

          {!isIngredientsSumbitted && (
            <TouchableOpacity
              onPress={() => navigation.navigate("RecipeDetails")}
              className="flex-row items-center space-x-2">
              <EyeIcon />
              <Text className="font-[Poppins-400] text-sm text-[#FF1E00]">
                View recipe
              </Text>
            </TouchableOpacity>
          )}

          {!isIngredientsSumbitted && ingredientsImage === "" && (
            <RecipeStatusButton navigation={navigation} />
          )}
          {isIngredientsSumbitted && ingredientsImage !== "" && (
            <View className="mb-[16px] flex-row items-center space-x-2">
              <CheckboxIcon />
              <Text className="font-[Poppins-600] text-sm text-[#919EAB]">Submitted</Text>
            </View>
          )}

          {!isReadyDish && dishImage === "" && <PreparedDishIcon />}
          {isReadyDish && dishImage !== "" && (
            <View className="h-[160px] w-[300px] rounded-xl bg-gray-300">
              <Image
                style={{ width: 300, height: 160, borderRadius: 12 }}
                source={{ uri: dishImage }}
              />
            </View>
          )}

          {!isReadyDish && (
            <Text className="font-[Poppins-600] text-lg">
              Take a photo of prepared dish
            </Text>
          )}

          {!isReadyDish && dishImage === "" && (
            <RecipeStatusButton
              navigation={navigation}
              disabled={!isIngredientsSumbitted}
            />
          )}

          {isReadyDish && dishImage !== "" && (
            <>
              <View className="flex-row items-center space-x-2">
                <CheckboxIcon />
                <Text className="font-[Poppins-600] text-sm text-[#919EAB]">
                  Submitted
                </Text>
              </View>
              <View className="px-8 ">
                <Text className="text-center font-[Poppins-600] text-sm text-[#6D6D6D]">
                  {textStatus}
                </Text>
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default CheckStatus;
