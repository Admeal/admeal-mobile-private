import { View, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { memo } from "react";

const TimeTag = memo(function TimeTag({ time = 30 }: TimeTagProps) {
  return (
    <View className="m-1 h-5 w-[47px] flex-row items-center justify-between rounded-md px-1">
      <EvilIcons name="clock" size={18} color="#919EAB" className="mt-1" />
      <Text className="text-xs font-bold text-[#919EAB]">{time}'</Text>
    </View>
  );
});

export default TimeTag;
