import { SafeAreaView } from "react-native";
import HomeTopBar from "../components/HomeTopBar";
import RecipesBar from "../components/RecipesBar";
import RecipeTabs from "../components/RecipeTabs";

export default function Home({ navigation }: any) {
  return (
    <SafeAreaView className="relative">
      <HomeTopBar navigation={navigation} />
      <RecipesBar />
      <RecipeTabs navigation={navigation} routeName="Recipes" />
    </SafeAreaView>
  );
}
