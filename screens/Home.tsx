import { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import HomeTopBar from "../components/HomeTopBar";
import RecipesBar from "../components/RecipesBar";
import RecipeTabs from "../components/RecipeTabs";
import LoadingScreen from "./LoadingScreen";

export default function Home({ navigation }: GroupMealProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      setIsLoading(true);
    });

    return () => {
      setIsLoading(false);
      unsubscribe();
    };
  }, [navigation]);
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View className="relative">
      <HomeTopBar navigation={navigation} />
      <RecipesBar />
      <RecipeTabs navigation={navigation} routeName="Recipes" />
    </View>
  );
}
