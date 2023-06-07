import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

import {
  isIngredientsSumbittedState,
  isReadyDishState,
  ingredientsImageState,
  dishImageState
} from "../../atoms/dataAtom";

type RecipeStatusButtonProps = {
  navigation: any;
  disabled?: boolean;
  label?: string;
};

const RecipeStatusButton = ({
  navigation,
  disabled,
  label = "TAKE A PHOTO"
}: RecipeStatusButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [dishImage, setDishImage] = useRecoilState(dishImageState);

  const handleUpload = () => {
    disabled ? null : console.log(label);
    if (!disabled) {
      if (!ingredientsImage && !isIngredientsSumbitted) {
        navigation.navigate("CameraUpload", { navigation });
      }
      if (ingredientsImage && isIngredientsSumbitted && !dishImage) {
        navigation.navigate("CameraUpload", { navigation });
      }

      if (ingredientsImage && !isIngredientsSumbitted) {
        setIsIngredientsSumbitted(true);
        // set IngredientsImage to google cloud
        navigation.navigate("CheckStatus", { navigation });
      }
      if (dishImage && ingredientsImage && isIngredientsSumbitted) {
        setIsReadyDish(true);
        // set dishImage to google cloud
        navigation.navigate("CheckStatus", { navigation });
      }
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handleUpload}
      className={`mb-[48px] h-12 w-[55%] flex-col items-center justify-center rounded-full  px-3 pt-1 text-center shadow-xl  ${
        disabled ? "bg-[#919EAB]/20 shadow-[#919EAB]/20" : "bg-[#FF1E00] shadow-[#FF1E00]"
      }`}>
      <Text
        className={`font-[Poppins-600] text-base ${
          disabled ? "text-[#919EAB]" : "text-white"
        }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default RecipeStatusButton;
