import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import {
  isIngredientsSumbittedState,
  isReadyDishState,
  ingredientsImageState,
  dishImageState,
  mealStatusState,
  mealIdState
} from "../atoms/dataAtom";

import FoodIngredientsIcon from "../assets/icons/foodIngredientsIcon";
import GoBackButton from "../components/buttons/GoBackButton";
import PreparedDishIcon from "../assets/icons/preparedDishIcon";
import RecipeStatusButton from "../components/buttons/RecipeStatusButton";
import CheckboxIcon from "../assets/icons/checkboxIcon";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const CheckStatus = ({ navigation }: any) => {
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [dishImage, setDishImage] = useRecoilState(dishImageState);
  const [mealStatus, setMealStatus] = useRecoilState(mealStatusState);
  const [mealId, setMealId] = useRecoilState<string>(mealIdState);
  const [textStatus, setTextStatus] = useState<string>("");
  const [meal, setMeal] = useState<object | null>(null);

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
      console.log("does this shit change? meal", meal.my_meals_id);
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

  const handleMealStatus = () => {
    switch (mealStatus) {
      case "IN_PROGRESS_INGREDIENTS":
        return "Take a photo of ingredients";
      case "IN_PROGRESS_DISH":
        return "Take a photo of the dish";
      case "COMPLETE":
        return `you have earned ${meal?.tokens_earned} tokens!`;
      case "INVALID":
        return "Your photos weren’t approved.  Probably your uploaded wrong photos.";
      case "AWAITING_VALIDATION":
        return "We’re checking your photos. You’ll receive your reward soon!";
      case "INCOMPLETE":
        return "Complete the steps to get tokens and track your progress";
      default:
        return "";
    }
  };

  return (
    <View className="h-full w-full flex-col items-center justify-between">
      <View className="w-full">
        <GoBackButton navigation={navigation} color="white" />
      </View>
      <View className="h-full w-[100vh] flex-col items-center justify-between">
        <Text className="pt-10 font-[Poppins-700] text-2xl">Excellent choice!</Text>
        <Text className="w-[70%] text-center font-[Poppins-400] text-xs text-[#6D6D6D]">
          Now follow the steps to get tokens and track your progress.
        </Text>

        {!isIngredientsSumbitted && ingredientsImage === "" && <FoodIngredientsIcon />}
        {isIngredientsSumbitted && ingredientsImage !== "" && (
          <Image
            style={{ width: 300, height: 200, borderRadius: 12 }}
            source={{ uri: ingredientsImage }}
          />
        )}

        <Text className="font-[Poppins-600] text-lg">
          {!isIngredientsSumbitted ? "Take a photo of ingredients" : "Ingredients photo"}
        </Text>

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
          <Image style={{ width: 300, height: 200 }} source={{ uri: dishImage }} />
        )}

        <Text className="font-[Poppins-600] text-lg">
          {!isReadyDish ? "Take a photo of prepared dish" : "Dish photo"}
        </Text>

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
              <Text className="font-[Poppins-600] text-sm text-[#919EAB]">Submitted</Text>
            </View>
            <View className="w-full px-8">
              <Text className="text-center font-[Poppins-600] text-[#6D6D6D]">
                {textStatus}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default CheckStatus;
