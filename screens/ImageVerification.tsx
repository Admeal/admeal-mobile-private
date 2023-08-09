import { BackHandler, Image, Text, TouchableOpacity, View } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import RecipeStatusButton from "../components/buttons/RecipeStatusButton";
import {
  dishImageState,
  ingredientsImageState,
  isIngredientsSumbittedState,
  isReadyDishState
} from "../atoms/dataAtom";
import { useRecoilState } from "recoil";
import { useFocusEffect } from "@react-navigation/native";
import LoadingScreen from "./LoadingScreen";

const ImageVerification = ({ navigation, route }: ScreensProps) => {
  const { mealId, temporaryImage } = route.params;
  console.log("image verification mealId", mealId);
  const [dishImage, setDishImage] = useRecoilState(dishImageState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useLayoutEffect(() => {
  //   const unsubscribe = navigation.addListener("beforeRemove", () => {
  //     setIsLoading(true);
  //   });

  //   return () => {
  //     setIsLoading(false);
  //     unsubscribe();
  //   };
  // }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View className="flex-col items-center justify-between flex-1">
      <View className="pt-[80px]"></View>
      {!isIngredientsSumbitted && ingredientsImage !== "" ? (
        <Image
          className="mx-5 h-1/2 w-[80%] rounded-xl p-4"
          source={{
            uri: temporaryImage,
            method: "POST"
          }}
        />
      ) : (
        <Image
          className="mx-5 h-[55%] w-[80%] rounded-xl p-4 px-4"
          source={{ uri: temporaryImage, method: "POST" }}
        />
      )}
      <Text className="pb-8 pt-4 font-[Poppins-700] text-2xl">
        Great! Upload this photo?
      </Text>
      <RecipeStatusButton label="UPLOAD" navigation={navigation} />
      <TouchableOpacity onPress={() => navigation.push("CameraUpload", { mealId })}>
        <Text className="pb-4 font-[Poppins-500] text-sm underline">
          Take another shot
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageVerification;
