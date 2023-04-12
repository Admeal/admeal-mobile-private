import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SectionList,
  SafeAreaView
} from "react-native";

import { useState } from "react";
import PopularCard from "./PopularCard";
import TopEarningsCard from "./TopEarningsCard";
import MyMealsCard from "./MyMealsCard";

const RecipeTabs = () => {
  const [tabSwitch, setTabSwitch] = useState<boolean>(false);

  return (
    <View className=" px-5">
      <View className="flex-row items-center justify-center  pb-5">
        <TouchableOpacity
          onPress={() => setTabSwitch(false)}
          className={`col-span-1 h-[48px] w-1/2 flex-row items-center justify-center border-b ${
            !tabSwitch ? "border-[#FF1E00]" : "border-[#919EAB]"
          }`}>
          <Text
            className={` font-semibold ${
              !tabSwitch ? "text-[#FF1E00]" : "text-[#637381]"
            }`}>
            Discover
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTabSwitch(true)}
          className={`col-span-1 h-[48px] w-1/2 flex-row items-center justify-center border-b ${
            tabSwitch ? "border-[#FF1E00]" : "border-[#919EAB]"
          }`}>
          <Text
            className={` font-semibold ${
              tabSwitch ? "text-[#FF1E00]" : "text-[#637381]"
            }`}>
            My meals
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {!tabSwitch ? (
          <ScrollView
            // horizontal={false}
            className="h-screen pb-40">
            <View>
              <Text className="text-lg font-bold">Popular Recipes</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className="flex-row  py-4">
                <PopularCard />
                <PopularCard recipeName="Fried chicken" />
                <PopularCard recipeName="mousaka" />
                <PopularCard recipeName="Fried chicken" />
                <PopularCard recipeName="Fried chicken" />
                <PopularCard />
                <PopularCard recipeName="mousaka" />
                <PopularCard recipeName="Fried chicken" />
                <PopularCard recipeName="Fried chicken" />
                <PopularCard recipeName="Fried chicken" />
              </ScrollView>
            </View>
            <View className="pb-60">
              <Text className="py-4 text-lg font-bold">Top Earnings</Text>
              <View className="h-[100%] flex-row flex-wrap items-center justify-between pt-4">
                <TopEarningsCard cookedCount={70} recipeName="Fried chicken" />
                <TopEarningsCard cookedCount={70} recipeName="mousaka" />
                <TopEarningsCard cookedCount={320} />
                <TopEarningsCard cookedCount={970} recipeName="tzatziki" time={25} />
              </View>
            </View>
          </ScrollView>
        ) : (
          <View className=" ">
            <View className="flex-row items-center space-x-2">
              <Text className="text-lg font-bold">Total meals</Text>
              <Text className="rounded-full bg-[#FFCAC2] p-1 text-[#BB1E09]">0</Text>
            </View>
            <View className="relative  pb-80">
              <ScrollView
                nestedScrollEnabled={true}
                alwaysBounceVertical={true}
                scrollEnabled={true}
                className=" h-screen">
                {/* className="mb-96 h-screen"> */}
                <View onStartShouldSetResponder={() => true} className="pb-[500px]">
                  <MyMealsCard status="Take a photo of the dish" />
                  <MyMealsCard status="Take a photo of ingredients" />
                  <MyMealsCard status="Finished" />
                  <MyMealsCard status="Finished" />
                  <MyMealsCard status="Finished" />
                  <MyMealsCard status="Finished" />
                  <MyMealsCard status="Finished" />
                  <MyMealsCard status="Finished" />
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
