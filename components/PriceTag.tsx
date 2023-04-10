import { View, Text, Image } from "react-native";
import React from "react";

type PriceTagProps = {
  price: number;
  coinNo?: number;
};

const PriceTag = ({ price, coinNo = 1 }: PriceTagProps) => {
  return (
    <View className="flex-row items-center justify-end px-2 pt-2 ">
      <View className=" h-[21px] w-[55px] flex-row items-center justify-between rounded-xl bg-white px-[4px] pt-[1px]">
        <Text className="text-xs font-bold">+{price}</Text>
        {coinNo === 1 ? (
          <Image source={require("../assets/png/coin1.png")} />
        ) : (
          <Image source={require("../assets/png/coin2.png")} />
        )}
      </View>
    </View>
  );
};

export default PriceTag;
