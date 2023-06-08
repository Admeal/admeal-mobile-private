import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import RecipeStatusButton from "../components/buttons/RecipeStatusButton";
import {
  dishImageState,
  ingredientsImageState,
  isIngredientsSumbittedState,
  isReadyDishState
} from "../atoms/dataAtom";
import { useRecoilState } from "recoil";

const ImageVerification = ({ navigation }) => {
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [dishImage, setDishImage] = useRecoilState(dishImageState);

  const handleTakeAnotherShot = () => {
    ingredientsImage && setIngredientsImage(null);
    dishImage && setDishImage(null);
    navigation.navigate("CheckStatus");
  };

  const handleStatusButton = () => {
    if (!isIngredientsSumbitted) {
      setIsIngredientsSumbitted(true);
    } else {
      setIsReadyDish(true);
    }
    navigation.navigate("CheckStatus");
  };

  return (
    <View className="flex-1 flex-col items-center justify-between">
      <View className="pt-[110px]"></View>
      {!isIngredientsSumbitted ? (
        <Image
          className="mx-5 h-1/2 w-full rounded-xl p-4"
          source={{ uri: ingredientsImage }}
        />
      ) : (
        <Image
          className="mx-5 h-1/2 w-full rounded-xl p-4 px-4"
          source={{ uri: dishImage }}
        />
      )}
      <Text className="font-[Poppins-700] text-2xl">Great! Upload this photo?</Text>
      <RecipeStatusButton label="UPLOAD" navigation={navigation} />
      <TouchableOpacity onPress={handleTakeAnotherShot}>
        <Text className="pb-4 font-[Poppins-500] text-sm underline">
          Take another shot
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageVerification;
