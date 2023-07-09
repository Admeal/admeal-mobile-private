import { TouchableOpacity } from "react-native";
import React from "react";
import BackIcon from "../../assets/icons/backIcon";

import { StackActions } from "@react-navigation/native";

const GoBackButton = ({ navigation, color }: any) => {
  const press = () => {
    if (navigation.getState().routes.find((route) => route.name === "Wallet")) {
      navigation.navigate("Home");
    } else if (
      navigation.getState().routes.find((route) => route.name === "CheckStatus")
    ) {
      navigation.dispatch(StackActions.push("My Meals"));
    } else if (
      navigation.getState().routes.find((route) => route.name === "CameraUpload")
    ) {
      // navigation.goBack();
      navigation.dispatch(StackActions.push("CheckStatus"));
    } else if (
      navigation.getState().routes.find((route) => route.name === "ImageVerification")
    ) {
      navigation.dispatch(StackActions.push("CameraUpload"));
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
