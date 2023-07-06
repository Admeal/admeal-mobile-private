import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import PopularCard from "./PopularCard";
import TopEarningsCard from "./TopEarningsCard";
import MyMealsCard from "./MyMealsCard";

import { recipeListState, myMealsListState } from "../atoms/dataAtom";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import useAuth from "../hooks/useAuth";

type RecipeTabsProps = {
  navigation: any;
  routeName: string;
};

const RecipeTabs = ({ navigation, routeName }: RecipeTabsProps) => {
  const [recipeList, setRecipeList] = useRecoilState(recipeListState);
  const [myMealsList, setMyMealsList] = useRecoilState<any>(myMealsListState);

  const { user } = useAuth();

  useEffect(() => {
    if (routeName === "Recipes") {
      const fetchRecipes = async () => {
        const query = await getDocs(collection(db, "recipes"));
        const array = query.docs.map((doc) => {
          return doc.data();
        });
        setRecipeList(array);
        console.log("get recipes");
      };
      // const unsubscribe = onSnapshot(collection(db, "recipes"), (snapshot) => {
      //   const array = snapshot.docs.map((doc) => {
      //     return doc.data();
      //   });
      //   setRecipeList(array);
      // });
      fetchRecipes();
      return () => {
        // unsubscribe();
        console.log("unsubscribed recipes");
      };
    }
  }, []);

  useEffect(() => {
    if (routeName === "Recipes") {
      const unsubscribe = onSnapshot(
        query(collection(db, "my_meals"), where("user_id", "==", user?.id)),
        (snapshot) => {
          console.log("sub meals");

          const array = snapshot.docs.map((doc) => {
            return doc.data();
          });

          setMyMealsList(array);
        }
      );
      return () => {
        unsubscribe();
        console.log("unsubscribed meals");
      };
    }
  }, []);

  return (
    <View className="px-5 ">
      <View className="flex-row items-center justify-center">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
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
                {myMealsList?.length}
              </Text>
            </View>
            <View className="relative">
              <ScrollView
                nestedScrollEnabled={true}
                alwaysBounceVertical={true}
                scrollEnabled={true}
                className="h-screen ">
                <View onStartShouldSetResponder={() => true} className="pb-[500px]">
                  {myMealsList?.map((meal, index) => {
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
