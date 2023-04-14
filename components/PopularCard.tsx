import { Text, ImageBackground } from "react-native";
import React from "react";
import PriceTag from "./PriceTag";

const PopularCard = ({
  imageUri = require("../assets/png/popularDishImage.png"),
  recipeName = "mousaka",
  price = 40
}) => {
  return (
    <ImageBackground
      borderRadius={16}
      source={imageUri}
      resizeMode="cover"
      className="mr-2 h-[130px] w-[96px] flex-col justify-between rounded-2xl border border-[#919EAB] bg-black shadow-2xl">
      <PriceTag price={price} />
      <Text className="pb-2 pl-2 text-xs font-bold text-white">{recipeName}</Text>
    </ImageBackground>
  );
};

export default PopularCard;
