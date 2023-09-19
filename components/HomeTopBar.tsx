import { Image, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import {
  defaultMyMealsListState,
  defaultRecipeListState,
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

  const [admealCoins, setAdmealCoins] = useState(0);
  const [dishCoins, setDishCoins] = useState(0);

  useEffect(() => {
    if (userCredits) {
      setAdmealCoins(userCredits.admeal_token);
      setDishCoins(userCredits.dish_token);
    }
  }, [userCredits]);

  return (
    <View className="z-1 w-full flex-row items-center justify-between bg-white px-5 pb-6 pt-[33px]">
      <TouchableOpacity
        onPress={() => {
          setDefaultRecipeList([]);
          setDefaultMyMealsList([]);
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
          <Text>{admealCoins ? admealCoins : 0}.00</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeTopBar;
