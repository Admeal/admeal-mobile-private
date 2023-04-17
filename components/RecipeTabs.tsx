import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import PopularCard from "./PopularCard";
import TopEarningsCard from "./TopEarningsCard";
import MyMealsCard from "./MyMealsCard";

type RecipeTabsProps = {
  navigation: any;
  routeName: string;
};

const RecipeTabs = ({ navigation, routeName }: RecipeTabsProps) => {
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
            className={` font-semibold ${
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
            className={` font-semibold ${
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
              <Text className="text-lg font-bold">Popular Recipes</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className="flex-row py-4">
                <PopularCard navigation={navigation} />
                <PopularCard navigation={navigation} recipeName="Fried chicken" />
                <PopularCard navigation={navigation} recipeName="mousaka" />
                <PopularCard navigation={navigation} recipeName="Fried chicken" />
                <PopularCard navigation={navigation} recipeName="Fried chicken" />
                <PopularCard navigation={navigation} />
                <PopularCard navigation={navigation} recipeName="mousaka" />
                <PopularCard navigation={navigation} recipeName="Fried chicken" />
                <PopularCard navigation={navigation} recipeName="Fried chicken" />
                <PopularCard navigation={navigation} recipeName="Fried chicken" />
              </ScrollView>
            </View>
            <View className="pb-60">
              <Text className="py-4 text-lg font-bold">Top Earnings</Text>
              <View className="h-[100%] flex-row flex-wrap items-center justify-between pt-4">
                <TopEarningsCard
                  navigation={navigation}
                  cookedCount={70}
                  recipeName="Fried chicken"
                />
                <TopEarningsCard
                  navigation={navigation}
                  cookedCount={70}
                  recipeName="mousaka"
                />
                <TopEarningsCard navigation={navigation} cookedCount={320} />
                <TopEarningsCard
                  navigation={navigation}
                  cookedCount={970}
                  recipeName="tzatziki"
                  time={25}
                />
              </View>
            </View>
          </ScrollView>
        ) : (
          <View className="">
            <View className="flex-row items-center space-x-2">
              <Text className="text-lg font-bold">Total meals</Text>
              <Text className="rounded-full bg-[#FFCAC2] p-1 text-[#BB1E09]">0</Text>
            </View>
            <View className="relative">
              <ScrollView
                nestedScrollEnabled={true}
                alwaysBounceVertical={true}
                scrollEnabled={true}
                className="h-screen ">
                <View onStartShouldSetResponder={() => true} className="pb-[500px]">
                  <MyMealsCard
                    navigation={navigation}
                    status="Take a photo of the dish"
                  />
                  <MyMealsCard
                    navigation={navigation}
                    status="Take a photo of ingredients"
                  />
                  <MyMealsCard navigation={navigation} status="Finished" />
                  <MyMealsCard navigation={navigation} status="Finished" />
                  <MyMealsCard navigation={navigation} status="Finished" />
                  <MyMealsCard navigation={navigation} status="Finished" />
                  <MyMealsCard navigation={navigation} status="Finished" />
                  <MyMealsCard navigation={navigation} status="Finished" />
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
