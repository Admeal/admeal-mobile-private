import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from "react-native";
import { useEffect, useState } from "react";
import BackIcon from "../assets/icons/backIcon";
import ClockIcon from "../assets/icons/clockIcon";
import ServingsIcon from "../assets/icons/servingsIcon";
import IngredientsItem from "../components/IngredientsItem";
import GoBackButton from "../components/buttons/GoBackButton";
import { recipeItemState } from "../atoms/dataAtom";
import { useRecoilState } from "recoil";

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
  ingredients: { quantity: string; ingredient: string }[];
};

const RecipeDetails = ({ navigation }) => {
  const [recipeItem, setRecipeItem] = useRecoilState(recipeItemState);
  const { recipeImages, ingredients } = recipeItem;

  const [toggle, setToggle] = useState(false);

  return (
    <ImageBackground
      className="flex-col justify-between flex-1"
      // source={{
      //   uri: imageUri
      // }}
      source={{
        uri: recipeImages[0]
      }}
      resizeMode="cover">
      <GoBackButton navigation={navigation} />

      <View className="relative h-2/3 flex-col  justify-between rounded-t-3xl bg-slate-50 bg-gradient-to-b from-white to-[#F6F6F6] px-7 pt-7">
        <View className="flex-row items-center justify-between">
          <Text className="font-[Poppins-700] text-2xl">{recipeItem.recipeName}</Text>
          <View className="flex-row items-center space-x-2">
            <Text className="mt-1 font-[Poppins-400] text-xs">Total:</Text>
            <Text className="font-[Poppins-700] text-2xl">{recipeItem.price}</Text>
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
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              flexGrow: 1,
              flexDirection: "row",
              alignItems: "center"
            }}
            className="pt-4 space-x-2 ">
            <View className="h-[114px] w-[122px] space-y-2 rounded-xl bg-white px-4 pt-3 ">
              <Text className="font-[Poppins-400] text-xs text-[#6D6D6D]">About:</Text>
              <View className="flex-row items-center space-x-2 ">
                <ClockIcon />
                <Text className="font-[Poppins-500] text-xs">
                  {recipeItem.cookTimeInMins}
                </Text>
                <Text className="font-[Poppins-500] text-xs">mins</Text>
              </View>
              <View className="flex-row items-center space-x-2 ">
                <ServingsIcon />
                <Text className="font-[Poppins-500] text-xs">
                  {recipeItem.numberOfServings}
                </Text>
                <Text className="font-[Poppins-500] text-xs">servings</Text>
              </View>
            </View>
            <View className="h-[114px] w-[270px] rounded-xl bg-white px-4 pt-3 ">
              <Text className="pb-2 font-[Poppins-400] text-xs text-[#6D6D6D]">
                Nutrition estimate:
              </Text>
              <View className="flex-row flex-wrap gap-1.5">
                <View className="flex-row items-center space-x-2 self-center rounded-full bg-[#FFE9D0] px-4 py-2">
                  <Text className="font-[Poppins-400] text-xs  text-[#FC7800]">
                    Cal.:
                  </Text>
                  <Text className="font-[Poppins-600] text-xs  text-[#FC7800]">
                    {recipeItem.nutritionalInformation.calories_in_cal}kcal
                  </Text>
                </View>
                <View className="flex-row items-center space-x-2 self-center rounded-full bg-[#DBF7E0] px-4 py-2">
                  <Text className="font-[Poppins-400] text-xs  text-[#2BD449]">Fat:</Text>
                  <Text className="font-[Poppins-600] text-xs  text-[#2BD449]">
                    {recipeItem.nutritionalInformation.fat_in_grams}g
                  </Text>
                </View>
                <View className="flex-row items-center space-x-2 self-center rounded-full bg-[#E4E2F8] px-4 py-2">
                  <Text className="font-[Poppins-400] text-xs  text-[#7264FB]">
                    Protein:
                  </Text>
                  <Text className="font-[Poppins-600] text-xs  text-[#7264FB]">
                    {recipeItem.nutritionalInformation.protein_in_grams}g
                  </Text>
                </View>
                <View className="flex-row items-center space-x-2 self-center rounded-full bg-[#DDF9F5] px-4 py-2">
                  <Text className="font-[Poppins-400] text-xs  text-[#23D8BE]">
                    Carbs:
                  </Text>
                  <Text className="font-[Poppins-600] text-xs  text-[#23D8BE]">
                    {recipeItem.nutritionalInformation.carbs_in_grams}g
                  </Text>
                </View>
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
                {/* {ingredients.map((ingredient, index) => (
                  <View
                    key={index}
                    className="h-12 w-full flex-row items-center justify-between border-b border-[#E0E0E0] bg-red-300 pt-4">
                    <Text className="bg-red-400 font-[Poppins-400] text-xs text-[#6D6D6D]">
                      {ingredient.measurement_value}
                    </Text>
                    <Text className="font-[Poppins-500] text-xs text-[#6D6D6D]">
                      {ingredient.measurement_units}
                    </Text>
                  </View>
                ))} */}
              </View>
            ) : (
              <View>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et perspiciatis
                  quaerat natus, est laudantium dolorem nam atque autem sed illum,
                  accusantium commodi, ea aut ex dolores molestiae libero nulla dicta.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CheckStatus", {
              navigation: navigation
            })
          }
          className="absolute bottom-8 left-[9%] z-10 h-[60px] w-full flex-col items-center justify-center rounded-full bg-[#FF1E00] shadow-xl shadow-[#FF1E00]">
          <Text className="font-[Poppins-700] text-base text-white">LET'S COOK IT</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default RecipeDetails;
