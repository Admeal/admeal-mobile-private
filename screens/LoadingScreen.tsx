import { View, Text, Image } from "react-native";
import { useState } from "react";
import AdmealLogoBig from "../assets/icons/admealLogoBig";

const LoadingScreen = () => {
  return (
    <View className="h-full w-full flex-col items-center justify-center object-contain">
      {/* <Image source={require("../assets/splash.png")} /> */}
      <AdmealLogoBig />
    </View>
  );
};

export default LoadingScreen;
