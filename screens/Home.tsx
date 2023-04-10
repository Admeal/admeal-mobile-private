import { Text, View, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeTopBar from "../components/HomeTopBar";
import RecipesBar from "../components/RecipesBar";
import RecipeTabs from "../components/RecipeTabs";

export default function Home() {
  const navigation = useNavigation();

  return (
      className="bg- [##E0E0E0] relative min-h-screen">
      <HomeTopBar />
      <RecipesBar />
      <RecipeTabs />
    </SafeAreaView>
  );
}
