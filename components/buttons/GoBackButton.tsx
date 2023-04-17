import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import BackIcon from "../../assets/icons/backIcon";

const GoBackButton = ({ navigation, color }: any) => {
  return (
    <TouchableOpacity
      className="flex-row items-center pt-12 space-x-2 px-7"
      onPress={() => navigation.goBack()}>
      <BackIcon fill={color} />
      <Text className={`font-[Poppins-400] text-base ${!color && "text-white"}`}>
        Back
      </Text>
    </TouchableOpacity>
  );
};

export default GoBackButton;
