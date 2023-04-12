import { Image, View, Text, TouchableOpacity } from "react-native";
import Search from "./Search";
import { SafeAreaView } from "react-native-safe-area-context";

const RecipesBar = () => {
  return (
    <SafeAreaView className="flex-row items-center justify-between px-5">
      <Text className="pb-1 text-3xl font-semibold">Recipes</Text>
      <View className="flex-row items-center space-x-4">
        <Search />
        <TouchableOpacity className="">
          <Image source={require("../assets/png/menuicon.png")} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecipesBar;
