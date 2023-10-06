import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import OptionsIcon from "../assets/icons/optionsIcon";
import XCloseButton from "./buttons/XCloseButton";
import { useNavigation } from "@react-navigation/native";

import { useRecoilState } from "recoil";
import {
  defaultMyMealsListState,
  defaultRecipeListState,
  myMealsListState,
  recipeListState
} from "../atoms/dataAtom";
import { Motion } from "@legendapp/motion";

const Search = () => {
  const [defaultMyMealsList, setDefaultMyMealsList] = useRecoilState(
    defaultMyMealsListState
  );
  const [defaultRecipeList, setDefaultRecipeList] =
    useRecoilState(defaultRecipeListState);
  const [recipeList, setRecipeList] = useRecoilState(recipeListState);
  const [myMealsList, setMyMealsList] = useRecoilState(myMealsListState);

  const [search, setSearch] = useState<string>("");

  const navigation = useNavigation();

  const handleEndEditing = () => {
    const routeName = navigation.getState().routes[0].name;
    const filteredRecipeList = recipeList.filter((recipe: RecipeProps) =>
      recipe.recipe_name.toLowerCase().includes(search.toLowerCase())
    );

    if (search.length > 0) {
      switch (routeName) {
        case "Home":
          setDefaultRecipeList(filteredRecipeList as RecipeProps[]);
          break;
        case "My Meals":
          let list = [] as any;

          filteredRecipeList.forEach((recipe: RecipeProps) => {
            myMealsList.forEach((meal: MealProps) => {
              if (recipe.recipe_id === meal.recipe_id) {
                list.push(meal);
              }
            });
          });

          setDefaultMyMealsList(list);
          break;
        default:
          break;
      }
    }
  };

  const resetSubmitValue = () => {
    switch (navigation.getState().routes[0].name) {
      case "Home":
        setDefaultRecipeList([]);
        break;
      case "My Meals":
        setDefaultMyMealsList([]);
        break;
      default:
        break;
    }
    setSearch("");
  };

  return (
    <Motion.View
      animate={{ opacity: 1, y: 0 }}
      className="relative flex-row items-center px-4"
      key='A'
      exit={{ opacity: 0, y: -100 }}
      initial={{ opacity: 0, y: -100 }}
      transition={{
        default: {
          type: "spring",
          stiffness: 350,
          damping: 22
        },
        opacity:{
          type: 'timing',
          duration: 1
        }
      }}
    >
      <View className="mt-2 mr-4 h-9 flex-1 flex-row items-center justify-between rounded-xl bg-[#919EAB]/10">
        <TouchableOpacity className="px-2" onPress={handleEndEditing}>
          <FontAwesome name="search" size={16} color="grey" />
        </TouchableOpacity>
        <TextInput
          className="flex-1 bg-transparent pr-10 pt-1 text-left font-[Poppins-400] text-sm"
          onChange={(e) => setSearch(e.nativeEvent.text)}
          onEndEditing={handleEndEditing}
          placeholder="Search"
          value={search}></TextInput>
        <View className="relative -top-[22px]">
          {search.length > 0 && (
            <XCloseButton
              bgColor="bg-[#CCCCCC]/80"
              cloceProp={resetSubmitValue}
              cordinates="top-2 right-2"
              size={16}
            />
          )}
        </View>
      </View>
      <TouchableOpacity className="pt-2 pr-2">
        <OptionsIcon />
      </TouchableOpacity>
    </Motion.View>
  );
};

export default Search;
