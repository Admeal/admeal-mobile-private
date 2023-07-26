import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type XCloseButtonProps = {
  cloceProp: () => void;
};

const XCloseButton = ({ cloceProp }: XCloseButtonProps) => {
  return (
    <TouchableOpacity onPress={cloceProp} className="absolute top-3 right-3">
      <View className=" h-6 w-6 flex-col items-center justify-center rounded-full bg-[#CCCCCC]/20">
        <Ionicons name="close" size={20} color="red" />
      </View>
    </TouchableOpacity>
  );
};

export default XCloseButton;
