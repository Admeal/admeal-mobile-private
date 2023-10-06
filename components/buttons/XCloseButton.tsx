import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";

type XCloseButtonProps = {
  cloceProp: () => void;
  size?: number;
  color?: string;
  bgColor?: string;
  cordinates?: string;
};

const XCloseButton = memo(function XCloseButton({
  cloceProp,
  size = 20,
  color = "red",
  bgColor = "bg-[#CCCCCC]/20",
  cordinates = "top-3 right-3"
}: XCloseButtonProps) {
  return (
    <TouchableOpacity onPress={cloceProp} className={`absolute ${cordinates}`}>
      <View
        className={`h-7 w-7 flex-col items-center justify-center rounded-full ${bgColor}`}>
        <Ionicons name="close" size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
});

export default XCloseButton;
