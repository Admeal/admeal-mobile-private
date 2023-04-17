import { Text, ImageBackground, View, TouchableOpacity, Image } from "react-native";
import React from "react";

import { useRecoilState } from "recoil";
import { recipeItemState } from "../atoms/dataAtom";
import PriceTag from "./PriceTag";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

type PopularCardProps = {
  imageUri?: any;
  imagePath?: string;
  recipeName?: string;
  price?: number;
  navigation: any;
};

const PopularCard = ({
  imageUri = "https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png",
  imagePath = "../assets/png/popularDishImage.png",
  recipeName = "mousaka",
  price = 40,
  navigation
}: PopularCardProps) => {
  const [recipeItem, setRecipeItem] = useRecoilState(recipeItemState);
  const handleItemPress = () => {
    // () =>
    //     navigation.navigate("RecipeDetails", {
    //       imageUri: imageUri,
    //       recipeName: recipeName,
    //       price: price,
    //       navigation: navigation
    //     })
    setRecipeItem({
      imageUri: imageUri,
      recipeName: recipeName,
      price: price
    });
    navigation.navigate("RecipeDetails");
  };

  return (
    <TouchableOpacity className="mr-2 shadow-2xl rounded-2xl" onPress={handleItemPress}>
      <ImageBackground
        className=" h-[130px] w-[96px] flex-col justify-between rounded-2xl border border-[#919EAB] bg-black shadow-2xl"
        borderRadius={16}
        source={require("../assets/png/popularDishImage.png")}>
        <PriceTag price={price} />
        <Text className="pb-2 pl-2 text-xs font-bold text-white">{recipeName}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default PopularCard;
