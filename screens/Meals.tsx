import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import HomeTopBar from "../components/HomeTopBar";
import RecipesBar from "../components/RecipesBar";
import RecipeTabs from "../components/RecipeTabs";

export default function Meals({ navigation }: any) {
  return (
    <SafeAreaView className="relative">
      <HomeTopBar navigation={navigation} />
      <RecipesBar />
      <RecipeTabs navigation={navigation} routeName="My Meals" />
    </SafeAreaView>
  );
}
