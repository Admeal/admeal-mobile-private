import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import PopularCard from "./PopularCard";
import TopEarningsCard from "./TopEarningsCard";
import MyMealsCard from "./MyMealsCard";

import { recipeListState, mealsListState, userListState } from "../atoms/dataAtom";
import { useRecoilState } from "recoil";
import getRecipesEndpoint from "../endpoints/getRecipesEndpoint";
import getMyMealsEndpoint from "../endpoints/getMyMealsEndpoint";
import { useEffect } from "react";
import getUserEndpoint from "../endpoints/getUsersEndpoint";

type RecipeTabsProps = {
  navigation: any;
  routeName: string;
};

const RecipeTabs = ({ navigation, routeName }: RecipeTabsProps) => {
  const [recipeList, setRecipeList] = useRecoilState(recipeListState);
  const [mealsList, setMealsList] = useRecoilState(mealsListState);
  const [userList, setUserList] = useRecoilState(userListState);

  return (
    <View className="px-5 ">
      <View className="flex-row items-center justify-center pb-5">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Recipes");
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
            navigation.navigate("My Meals");
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
            <View>
              <Text className="font-[Poppins-700] text-lg">Popular recipes</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className="flex-row py-4">
                {recipeList?.map((recipe, index) => {
                  return (
                    <PopularCard navigation={navigation} recipe={recipe} key={index} />
                  );
                })}
              </ScrollView>
            </View>
            <View className="pb-60">
              <Text className="py-4 font-[Poppins-700] text-lg">Top Earnings</Text>
              <View className="h-[100%] flex-row flex-wrap items-center justify-between pt-4">
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
          <View className="">
            <View className="flex-row items-center space-x-2">
              <Text className="font-[Poppins-700] text-lg ">Total meals</Text>
              <Text className="rounded-full bg-[#FFCAC2] px-3 pt-1 font-[Poppins-700] text-[#BB1E09]">
                {mealsList.length}
              </Text>
            </View>
            <View className="relative">
              <ScrollView
                nestedScrollEnabled={true}
                alwaysBounceVertical={true}
                scrollEnabled={true}
                className="h-screen ">
                <View onStartShouldSetResponder={() => true} className="pb-[500px]">
                  {mealsList.map((meal, index) => {
                    return (
                      <MyMealsCard navigation={navigation} meal={meal} key={index} />
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
