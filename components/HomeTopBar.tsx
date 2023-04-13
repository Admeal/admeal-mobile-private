import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

const HomeTopBar = ({ navigation }) => {
  const [coins1, setCoins1] = useState<Float>(0.0);
  const [coins2, setCoins2] = useState<Float>(0.0);

  return (
    <SafeAreaView className="z-1 w-full flex-row items-center justify-between bg-white px-5 pb-6 pt-[52px]">
      <TouchableOpacity onPress={() => navigation.openDrawer()} className="">
        <Image source={require("../assets/png/sidemenu.png")} />
      </TouchableOpacity>
      <View className="flex-row space-x-6">
        <TouchableOpacity className="flex-row items-center space-x-2">
          <Image source={require("../assets/png/coin1.png")} />
          <Text>{coins1}.00</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center space-x-2">
          <Image source={require("../assets/png/coin2.png")} />
          <Text>{coins2}.00</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeTopBar;
