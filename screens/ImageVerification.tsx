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
    navigation.navigate("CheckStatus", { navigation });
  };

  const handleStatusButton = () => {
    if (!isIngredientsSumbitted) {
      setIsIngredientsSumbitted(true);
    } else {
      setIsReadyDish(true);
    }
    navigation.navigate("CheckStatus", { navigation });
  };

  return (
    <View className="flex-col items-center justify-between flex-1">
      <View className="pt-[110px]"></View>
      {!isIngredientsSumbitted ? (
        <Image
          className="w-full p-4 mx-5 h-1/2 rounded-xl"
          source={{ uri: ingredientsImage }}
        />
      ) : (
        <Image className="w-full p-4 mx-5 h-1/2 rounded-xl" source={{ uri: dishImage }} />
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
