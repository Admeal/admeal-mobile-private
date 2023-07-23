import { View, Text, TouchableOpacity, Image, BackHandler } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { useRecoilState } from "recoil";
import { userCreditsState } from "../atoms/dataAtom";

import DishCoinLogo from "../assets/icons/dishCoinLogo";
import AdmealCoinLogo from "../assets/icons/admealCoinLogo";

const HomeTopBar = ({ navigation }: GroupMealProps) => {
  const [userCredits, setUserCredits] = useRecoilState(userCreditsState);
  const [dishCoins, setDishCoins] = useState(Number);
  const [admealCoins, setAdmealCoins] = useState(Number);

  useEffect(() => {
    setAdmealCoins(userCredits.admeal_token);
    setDishCoins(userCredits.dish_token);
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
      <TouchableOpacity onPress={() => navigation.openDrawer()} className="">
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
