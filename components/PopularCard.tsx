import { View, Text, Image } from "react-native";
import React from "react";
import PriceTag from "./PriceTag";

const PopularCard = ({
  imageUrl = "",
  recipeName = "Pasta arrapiata and s",
  price = 40
}) => {
  return (
    <View className="h-[130px] w-[96px] flex-col justify-between rounded-2xl border border-[#919EAB] bg-black shadow-2xl">
      <PriceTag price={price} />
      <Text className="pb-2 pl-2 text-xs font-bold text-white">{recipeName}</Text>
    </View>
  );
};

export default PopularCard;
