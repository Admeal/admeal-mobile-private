import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Search from "./Search";
import BackArrowIcon from "../assets/icons/backArrowIcon";

import { useRecoilState } from "recoil";
import { defaultMyMealsListState, defaultRecipeListState } from "../atoms/dataAtom";

const RecipesBar = ({ title }: any) => {
  const [defaultMyMealsList, setDefaultMyMealsList] = useRecoilState(
    defaultMyMealsListState
  );
  const [defaultRecipeList, setDefaultRecipeList] =
    useRecoilState(defaultRecipeListState);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setDefaultRecipeList([]);
      setDefaultMyMealsList([]);
    };
  }, []);

  return (
    <View>
      <View
        className={`flex-row items-center ${
          isSearchVisible ? "justify-start" : "justify-between"
        } px-5 pt-4`}>
        {isSearchVisible && (
          <TouchableOpacity
            onPress={() => {
              setIsSearchVisible(!isSearchVisible);
              setDefaultRecipeList([]);
              setDefaultMyMealsList([]);
            }}
            className="w-6 h-6 mb-2 mr-3 rounded-full">
            <BackArrowIcon />
          </TouchableOpacity>
        )}
        <Text className="pb-1 font-[Poppins-700] text-3xl">{title}</Text>
        {!isSearchVisible && (
          <TouchableOpacity onPress={() => setIsSearchVisible(!isSearchVisible)}>
            <FontAwesome name="search" size={16} color="black" className="pr-2" />
          </TouchableOpacity>
        )}
      </View>
      {isSearchVisible && <Search />}
    </View>
  );
};

export default RecipesBar;
