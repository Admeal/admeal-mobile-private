import { Image, View, Text, TouchableOpacity } from "react-native";
import Search from "./Search";

const RecipesBar = () => {
  return (
    <View className="flex-row items-center justify-between px-5 pt-4">
      <Text className="pb-1 font-[Poppins-700] text-3xl">Recipes</Text>
      <View className="flex-row items-center space-x-4">
        <Search />
        <TouchableOpacity className="">
          <Image source={require("../assets/png/menuicon.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecipesBar;
