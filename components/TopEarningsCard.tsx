import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import PriceTag from "./PriceTag";
import TimeTag from "./TimeTag";

const TopEarningsCard = ({
  imageUrl = "../assets/png/popularDishImage.png",
  recipeName = "Pasta arrapiata",
  price = 40,
  time = 30,
  cookedCount = 100
}) => {
  return (
    <View className="relative mb-4 h-[208px] w-[47%] max-w-[163px] rounded-xl shadow-md">
      <Image
        borderRadius={16}
        source={require("../assets/png/popularDishImage.png")}
        resizeMode="cover"
        className="absolute h-full w-full rounded-xl"
      />
      <PriceTag price={price} />
      <View className="absolute bottom-0 h-2/5 w-full rounded-b-xl bg-white p-2">
        <TimeTag time={time} />
        <Text className="text-sm font-semibold text-[#1D1D1D]">{recipeName}</Text>
        <Text className="text-xs text-[#637381]">Cooked {cookedCount} times</Text>
      </View>
    </View>
  );
};

export default TopEarningsCard;
