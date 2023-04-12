import { View, Text, TouchableOpacity } from "react-native";
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
          <View>
            <View>
              <Text className="text-lg font-bold">Popular Recipes</Text>
              <View className="py-4">
                <PopularCard />
              </View>
            </View>
            <View>
              <Text className="text-lg font-bold">Top Earnings</Text>
              <TopEarningsCard />
            </View>
          </View>
        ) : (
          <>
            <View className="flex-row items-center space-x-2">
              <Text>Total meals</Text>
              <Text className="rounded-full bg-[#FFCAC2] p-1 text-[#BB1E09]">0</Text>
            </View>
            <MyMealsCard />
          </>
        )}
      </View>
    </View>
  );
};

export default RecipeTabs;
