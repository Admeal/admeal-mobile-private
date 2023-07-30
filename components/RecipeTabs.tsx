import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import PopularCard from "./PopularCard";
import TopEarningsCard from "./TopEarningsCard";
import MyMealsCard from "./MyMealsCard";

import {
  recipeListState,
  myMealsListState,
  defaultRecipeListState,
  defaultMyMealsListState
} from "../atoms/dataAtom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

type RecipeTabsProps = {
  navigation: NavigationNavigateProp;
  routeName: string;
};

const RecipeTabs = ({ navigation, routeName }: RecipeTabsProps) => {
  const [defaultMyMealsList, setDefaultMyMealsList] = useRecoilState(
    defaultMyMealsListState
  );
  const [defaultRecipeList, setDefaultRecipeList] =
    useRecoilState(defaultRecipeListState);
  const [recipeList, setRecipeList] = useRecoilState(recipeListState);
  const [myMealsList, setMyMealsList] = useRecoilState(myMealsListState);

  const [myLocalMealsList, setMyLocalMealsList] = useState([] as MealProps[]);

  useEffect(() => {
    setMyLocalMealsList(myMealsList);
  }, [myMealsList]);

  return (
    <View className="px-5 ">
      <View className="flex-row items-center justify-center">
        <TouchableOpacity
          onPress={() => {
            setRecipeList(defaultRecipeList);
            setMyMealsList(defaultMyMealsList);
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }]
            });
          }}
          className={`col-span-1 h-[48px] w-1/2 flex-row items-center justify-center border-b ${
            routeName === "Recipes" ? "border-[#FF1E00]" : "border-[#919EAB]"
          }`}>
          <Text
            className={`font-[Poppins-600] ${
              routeName === "Recipes" ? "text-[#FF1E00]" : "text-[#637381]"
            }`}>
            Discover
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setRecipeList(defaultRecipeList);
            setMyMealsList(defaultMyMealsList);
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "My Meals" }]
              });
            }, 200);
          }}
          className={`col-span-1 h-[48px] w-1/2 flex-row items-center justify-center border-b ${
            routeName === "My Meals" ? "border-[#FF1E00]" : "border-[#919EAB]"
          }`}>
          <Text
            className={`font-[Poppins-600] ${
              routeName === "My Meals" ? "text-[#FF1E00]" : "text-[#637381]"
            }`}>
            My meals
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {routeName === "Recipes" ? (
          <ScrollView className="h-screen pb-40">
            <View className="pb-60">
              <Text className="py-4 font-[Poppins-700] text-lg">All Recipes</Text>
              <View className="h-[100%] flex-row flex-wrap items-center justify-between ">
                {recipeList?.map((recipe, index) => {
                  return (
                    <TopEarningsCard
                      navigation={navigation}
                      recipe={recipe}
                      key={index}
                    />
                  );
                })}
              </View>
            </View>
          </ScrollView>
        ) : (
          <View className="py-4">
            <View className="flex-row items-center space-x-2">
              <Text className="font-[Poppins-700] text-lg ">Total meals</Text>
              <Text className="rounded-full bg-[#FFCAC2] px-3 pt-1 font-[Poppins-700] text-[#BB1E09]">
                {myLocalMealsList?.length}
              </Text>
            </View>
            <View className="relative">
              <ScrollView
                nestedScrollEnabled={true}
                alwaysBounceVertical={true}
                scrollEnabled={true}
                className="h-screen ">
                <View onStartShouldSetResponder={() => true} className="pb-[500px]">
                  {myLocalMealsList?.map((meal, index) => {
                    return (
                      <MyMealsCard meal={meal} navigation={navigation} key={index} />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default RecipeTabs;
