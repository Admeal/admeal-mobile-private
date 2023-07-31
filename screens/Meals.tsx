import { View } from "react-native";

import HomeTopBar from "../components/HomeTopBar";
import RecipesBar from "../components/RecipesBar";
import RecipeTabs from "../components/RecipeTabs";

export default function Meals({ navigation }: GroupMealProps) {
  return (
    <View className="relative">
      <HomeTopBar navigation={navigation} />
      <RecipesBar title="My Meals" />
      <RecipeTabs navigation={navigation} routeName="My Meals" />
    </View>
  );
}
