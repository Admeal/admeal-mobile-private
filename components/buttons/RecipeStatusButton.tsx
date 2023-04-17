import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type RecipeStatusButtonProps = {
  navigation: any;
  disabled?: boolean;
  label?: string;
};

const RecipeStatusButton = ({
  navigation,
  disabled,
  label = "Upload"
}: RecipeStatusButtonProps) => {
  const handleUpload = () => {
    console.log("Upload");
  };

  return (
    <TouchableOpacity
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
