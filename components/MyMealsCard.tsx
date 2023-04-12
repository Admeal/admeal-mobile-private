import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
const MyMealsCard = ({
  imageUri = "../assets/png/popularDishImage.png",
  recipeName = "Pasta arrapiata",
  coinOneWon = 40,
  coinTwoWon = 0,
  status = "Take a photo of the dish"
}) => {
  const handleStatusButtonUI = () => {
    switch (status) {
      case "Finished":
        return "bg-none text-[#637381] text-xs font-normal";
      case "Take a photo of the dish":
        return "h-[30px] rounded-[18px] bg-[#FF1E00] pt-1 text-center align-middle text-sm font-extrabold  text-white px-3";
      case "Take a photo of ingredients":
        return "h-[30px] rounded-[18px] bg-[#FF1E00] pt-1 text-center align-middle text-sm font-extrabold  text-white px-3";
      default:
        return "";
    }
  };

  return (
    <TouchableOpacity className="my-2 w-[100%] flex-row space-x-4 rounded-2xl bg-white shadow-2xl">
      <ImageBackground
        className="h-[121px] w-[84px] flex-col justify-between "
        borderBottomLeftRadius={16}
        borderTopLeftRadius={16}
        source={require(`../assets/png/popularDishImage.png`)}></ImageBackground>
      <View className="w-[100%] flex-col items-start justify-between">
        <Text className="pt-3 text-sm font-bold text-[#1D1D1D]">{recipeName}</Text>
        <View className="flex-row items-center">
          <Text className={`text-xs ${handleStatusButtonUI()}`}>{status}</Text>
        </View>
        <View className="w-[57%] flex-row items-center justify-between pb-4 ">
          <Text className="text-sm text-[#637381]">Earned:</Text>
          <View className="flex-row items-center space-x-4">
            <View className="flex-row items-center space-x-2">
              <Text className="font-bold">{coinOneWon}</Text>
              <Image source={require("../assets/png/coin1.png")} />
            </View>
            <View className="flex-row items-center space-x-2">
              <Text className="font-bold">{coinTwoWon}</Text>
              <Image source={require("../assets/png/coin2.png")} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyMealsCard;
