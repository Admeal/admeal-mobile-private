import { Text, View, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeTopBar from "../components/HomeTopBar";
import RecipesBar from "../components/RecipesBar";
import RecipeTabs from "../components/RecipeTabs";

export default function Home() {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      className="relative">
      <HomeTopBar />
      <RecipesBar />
      <RecipeTabs />
    </SafeAreaView>
  );
}
