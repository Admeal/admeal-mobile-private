import { View } from "react-native";
import AdmealLogoBig from "../assets/icons/admealLogoBig";

const LoadingScreen = () => {
  return (
    <View className="h-full w-full flex-col items-center justify-center object-contain">
      <AdmealLogoBig />
    </View>
  );
};

export default LoadingScreen;
