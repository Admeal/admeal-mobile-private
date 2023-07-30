import { BackHandler, Image, Text, TouchableOpacity, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { useRecoilState } from "recoil";
import {
  defaultMyMealsListState,
  defaultRecipeListState,
  myMealsListState,
  recipeListState,
  userCreditsState,
  userState
} from "../atoms/dataAtom";

import AdmealCoinLogo from "../assets/icons/admealCoinLogo";
import DishCoinLogo from "../assets/icons/dishCoinLogo";

const HomeTopBar = ({ navigation }: GroupMealProps) => {
  const [user, setUser] = useRecoilState(userState);
  const [userCredits, setUserCredits] = useRecoilState(userCreditsState);
  const [defaultMyMealsList, setDefaultMyMealsList] = useRecoilState(
    defaultMyMealsListState
  );
  const [defaultRecipeList, setDefaultRecipeList] =
    useRecoilState(defaultRecipeListState);
  const [recipeList, setRecipeList] = useRecoilState(recipeListState);
  const [myMealsList, setMyMealsList] = useRecoilState(myMealsListState);

  const [admealCoins, setAdmealCoins] = useState(0);
  const [dishCoins, setDishCoins] = useState(0);

  useEffect(() => {
    if (userCredits) {
      setAdmealCoins(userCredits.admeal_token);
      setDishCoins(userCredits.dish_token);
    }
  }, [userCredits]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <View className="z-1 w-full flex-row items-center justify-between bg-white px-5 pb-6 pt-[33px]">
      <TouchableOpacity
        onPress={() => {
          setRecipeList(defaultRecipeList);
          setMyMealsList(defaultMyMealsList);
          navigation.openDrawer();
        }}
        className="">
        {/* image to change to svg */}
        <Image source={require("../assets/png/sidemenu.png")} />
      </TouchableOpacity>
      <View className="flex-row space-x-6">
        <TouchableOpacity className="flex-row items-center space-x-2">
          <DishCoinLogo size={16} scale={0.7} />
          <Text>{dishCoins}.00</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center space-x-2">
          <AdmealCoinLogo size={16} scale={0.7} />
          <Text>{admealCoins}.00</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeTopBar;
