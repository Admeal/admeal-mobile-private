import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from "react-native";
import { useState } from "react";
import BackIcon from "../assets/icons/backIcon";
import ClockIcon from "../assets/icons/clockIcon";
import ServingsIcon from "../assets/icons/servingsIcon";
import IngredientsItem from "../components/IngredientsItem";

type RecipeDetailsProps = {
  imageUri?: any;
  recipeName?: string;
  price?: number;
  navigation: any;
  cookTime: number;
  servings: number;
  nutrition: {
    cal: number;
    fat: number;
    protein: number;
    carbs: number;
  };
  recipePrice: number;
  ingredients: any[];
};

const RecipeDetails = ({
  imageUri = require("../assets/png/popularDishImage.png"),
  recipeName = "mousaka",
  price = 40,
  navigation,
  cookTime = 40,
  servings = 4,
  recipePrice = 300,
  ingredients = [
    // ["2 medium", "eggplants, sliced into rounds"],
    // ["2 medium", "potatoes, sliced into rounds"],
    // ["1 lb.", "ground beef or lamb"],
    // ["1", "onions, diced"],
    // ["2", "cloves garlic, minced"],
    // ["1 can (14 oz.)", "diced tomatoes"],
    // ["1/2 cup", "red wine"],
    // ["1 tbsp.", "tomato paste"],
    // ["1 tsp.", "dried oregano"],
    // ["1 tsp.", "ground cinnamon"],
    // ["", "Salt and pepper"],
    // ["3 tbsp.", "butter"],
    // ["3 tbsp.", "all-purpose flour"],
    // ["2 cups", "milk"],
    // ["2", "eggs"],
    // ["1/2 cup", "grated Parmesan cheese"],
    // ["2 cups", "Olive oil, for frying"]
    {
      quantity: "2 medium",
      ingredient: "eggplants, sliced into rounds"
    },
    {
      quantity: "2 medium",
      ingredient: "potatoes, sliced into rounds"
    },
    {
      quantity: "1 lb.",
      ingredient: "ground beef or lamb"
    },
    {
      quantity: "1",
      ingredient: "onions, diced"
    },
    {
      quantity: "2",
      ingredient: "cloves garlic, minced"
    },
    {
      quantity: "1 can (14 oz.)",
      ingredient: "diced tomatoes"
    },
    {
      quantity: "1/2 cup",
      ingredient: "red wine"
    },
    {
      quantity: "1 tbsp.",
      ingredient: "tomato paste"
    },
    {
      quantity: "1 tsp.",
      ingredient: "dried oregano"
    },
    {
      quantity: "1 tsp.",
      ingredient: "ground cinnamon"
    },
    {
      quantity: "",
      ingredient: "Salt and pepper"
    },
    {
      quantity: "3 tbsp.",
      ingredient: "butter"
    },
    {
      quantity: "3 tbsp.",
      ingredient: "all-purpose flour"
    },
    {
      quantity: "2 cups",
      ingredient: "milk"
    },
    {
      quantity: "2",
      ingredient: "eggs"
    },
    {
      quantity: "1/2 cup",
      ingredient: "grated Parmesan cheese"
    },
    {
      quantity: "2 cups",
      ingredient: "Olive oil, for frying"
    }
  ]
}: RecipeDetailsProps) => {
  const [toggle, setToggle] = useState(false);
  console.log("imageUri", imageUri);
  console.log("recipeName", recipeName);
  console.log("price", price);
  console.log("navigation", navigation);
  return (
    <ImageBackground
      className="flex-1 flex-col justify-between font-[Poppins-400]"
      // source={{
      //   uri: imageUri
      // }}
      source={imageUri}
      resizeMode="cover">
      <TouchableOpacity
        className="flex-row pt-12 space-x-2 px-7"
        onPress={() => navigation.goBack()}>
        <BackIcon />
        <Text className="text-white">Back</Text>
      </TouchableOpacity>
      <View className="relative h-2/3 flex-col  justify-between rounded-t-3xl bg-slate-50 bg-gradient-to-b from-white to-[#F6F6F6] px-7 pt-7">
        <View className="flex-row items-center justify-between">
          <Text className="font-[Poppins-700] text-2xl">{recipeName}</Text>
          <View className="flex-row items-center space-x-2">
            <Text className="mt-1 font-[Poppins-400] text-xs">Total:</Text>
            <Text className="font-[Poppins-700] text-2xl">{recipePrice}</Text>
            <Image source={require("../assets/png/coin1.png")} />
          </View>
        </View>
        <ScrollView className="flex-1 pt-3 pb-5">
          <Text className="font-[Poppins-400] text-xs text-[#6D6D6D]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio id
            voluptatibus asperiores recusandae inventore, magnam quas earum repellendus
            facere mollitia autem amet iste possimus cupiditate praesentium, voluptatem
            aliquid vero alias!
          </Text>
          <ScrollView className="pt-4">
            <View className="h-[114px] w-[122px] space-y-2 rounded-xl bg-white px-4 pt-3 ">
              <Text className="font-[Poppins-400] text-xs text-[#6D6D6D]">About:</Text>
              <View className="flex-row items-center space-x-2 ">
                <ClockIcon />
                <Text className="font-[Poppins-500] text-xs">{cookTime}</Text>
                <Text className="font-[Poppins-500] text-xs">mins</Text>
              </View>
              <View className="flex-row items-center space-x-2 ">
                <ServingsIcon />
                <Text className="font-[Poppins-500] text-xs">{servings}</Text>
                <Text className="font-[Poppins-500] text-xs">servings</Text>
              </View>
            </View>
          </ScrollView>
          <View className="flex-row pt-4">
            <TouchableOpacity
              onPress={() => {
                setToggle(false);
              }}
              className={`col-span-1 h-[48px] w-1/2 flex-row items-center justify-center border-b ${
                !toggle ? "border-[#FF1E00]" : "border-[#919EAB]"
              }`}>
              <Text
                className={` font-semibold ${
                  !toggle
                    ? "font-[Poppins-600] text-base text-[#212B36]"
                    : "font-[Poppins-400] text-sm text-[#637381]"
                }`}>
                Ingredients
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setToggle(true);
              }}
              className={`col-span-1 h-[48px] w-1/2 flex-row items-center justify-center border-b ${
                toggle ? "border-[#FF1E00]" : "border-[#919EAB]"
              }`}>
              <Text
                className={` font-semibold ${
                  toggle
                    ? "font-[Poppins-600] text-base text-[#212B36]"
                    : "font-[Poppins-400] text-sm text-[#637381]"
                }`}>
                Instructions
              </Text>
            </TouchableOpacity>
            {!toggle ? (
              <View className="z-20">
                {ingredients.map((ingredient, index) => (
                  <View
                    key={index}
                    className="h-12 w-full flex-row items-center justify-between border-b border-[#E0E0E0] bg-red-300 pt-4">
                    <Text className="bg-red-400 font-[Poppins-400] text-xs text-[#6D6D6D]">
                      {ingredient.ingredient}
                    </Text>
                    <Text className="font-[Poppins-500] text-xs text-[#6D6D6D]">
                      {ingredient.quantity}
                    </Text>
                  </View>
                ))}
                {/* {ingredients.map((ingredient, index) => (
                  <View
                    key={index}
                    className="h-12 w-full flex-row items-center justify-between border-b border-[#E0E0E0] bg-red-300 pt-4">
                    <Text className="bg-red-400 font-[Poppins-400] text-xs text-[#6D6D6D]">
                      {ingredient[0]}
                    </Text>
                    <Text className="font-[Poppins-500] text-xs text-[#6D6D6D]">
                      {ingredient[1]}
                    </Text>
                  </View>
                ))} */}
                {/* <FlatList data={ingredients} renderItem={IngredientsItem} /> */}
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </ScrollView>
        <TouchableOpacity className="absolute bottom-8 left-[9%] z-10 h-[60px] w-full flex-col items-center justify-center rounded-full bg-[#FF1E00] shadow-xl shadow-[#FF1E00]">
          <Text className="font-[Poppins-700] text-base text-white">LET'S COOK IT</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default RecipeDetails;
