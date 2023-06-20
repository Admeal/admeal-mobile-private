import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import BackIcon from "../../assets/icons/backIcon";

const GoBackButton = ({ navigation, color }: any) => {
  const press = () => {
    // switch (navigation) {
    //   case "Wallet":
    //     navigation.navigate("Home");
    //     break;
    //   default:
    //     navigation.goBack();
    // }
    if (navigation.getState().routes.find((route) => route.name === "Wallet")) {
      navigation.navigate("Home");
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      className="absolute left-5 top-10 h-10 w-10 flex-row items-center justify-center rounded-full bg-[#919EAB]/50 pl-3 pt-1 "
      onPress={press}>
      <BackIcon fill={color} />
    </TouchableOpacity>
  );
};

export default GoBackButton;
