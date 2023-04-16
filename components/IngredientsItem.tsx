import { View, Text } from "react-native";
import React from "react";

type IngredientsItemProps = {
  item: {
    ingredient: string;
    quantity: string;
  };
};

const IngredientsItem = ({ item }: IngredientsItemProps) => {
  return (
    <View
      // key={index}
      className="h-12 w-full flex-row items-center justify-between border-b border-[#E0E0E0] bg-red-300 pt-4">
      <Text className="bg-red-400 font-[Poppins-400] text-xs text-[#6D6D6D]">
        {item.ingredient}
      </Text>
      <Text className="font-[Poppins-500] text-xs text-[#6D6D6D]">{item.quantity}</Text>
    </View>
  );
};

export default IngredientsItem;
