import { View, Text, Image } from "react-native";
import React from "react";
import AdmealCoinLogo from "../assets/icons/admealCoinLogo";
import DishCoinLogo from "../assets/icons/dishCoinLogo";

type PriceTagProps = {
  price: number;
  tokenName: string;
  coinNo?: number;
};

const PriceTag = ({ price, tokenName }: PriceTagProps) => {
  return (
    <View className="flex-row items-center justify-end px-2 pt-2 ">
      <View className=" h-[21px] w-[55px] flex-row items-center justify-between rounded-xl bg-white px-[4px] pt-[1px]">
        <Text className="font-[Poppins-700] text-xs">
          {tokenName === "DISH" && "+"}
          {price}
        </Text>
        {tokenName === "ADMEAL" ? (
          <AdmealCoinLogo size={14} scale={0.6} />
        ) : (
          <DishCoinLogo size={14} scale={0.6} />
        )}
      </View>
    </View>
  );
};

export default PriceTag;
