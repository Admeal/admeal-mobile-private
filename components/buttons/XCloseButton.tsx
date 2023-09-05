import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type XCloseButtonProps = {
  cloceProp: () => void;
  size?: number;
};

const XCloseButton = ({ cloceProp, size = 20 }: XCloseButtonProps) => {
  return (
    <TouchableOpacity onPress={cloceProp} className="absolute top-3 right-3">
      <View className=" h-7 w-7 flex-col items-center justify-center rounded-full bg-[#CCCCCC]/20">
        <Ionicons name="close" size={size} color="red" />
      </View>
    </TouchableOpacity>
  );
};

export default XCloseButton;
