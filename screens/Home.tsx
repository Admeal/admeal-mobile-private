import { View } from "react-native";

import HomeTopBar from "../components/HomeTopBar";
import RecipesBar from "../components/RecipesBar";
import RecipeTabs from "../components/RecipeTabs";
import blockHardBackPress from "../hooks/blockHardBackPress";

export default function Home({ navigation }: ScreensProps) {
  blockHardBackPress();
  return (
    <View className="relative">
      <HomeTopBar navigation={navigation} />
      <RecipesBar title="Recipes" />
      <RecipeTabs navigation={navigation} routeName="Recipes" />
    </View>
  );
}
