import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useLayoutEffect, useState } from "react";
import ClockIcon from "../assets/icons/clockIcon";
import ServingsIcon from "../assets/icons/servingsIcon";
import IngredientsItem from "../components/IngredientsItem";
import GoBackButton from "../components/buttons/GoBackButton";
import {
  isIngredientsSumbittedState,
  isReadyDishState,
  mealIdState,
  mealStatusState,
  myMealsListState,
  recipeItemState,
  userState
} from "../atoms/dataAtom";
import { useRecoilState } from "recoil";
import firestore from "@react-native-firebase/firestore";

import LoadingScreen from "./LoadingScreen";

const RecipeDetails = ({ navigation }: GroupMealProps) => {
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [mealId, setMealId] = useRecoilState(mealIdState);
  const [mealStatus, setMealStatus] = useRecoilState(mealStatusState);
  const [myMealsList, setMyMealsList] = useRecoilState(myMealsListState);
  const [recipeItem, setRecipeItem] = useRecoilState(recipeItemState);
  const [userItem, setUserItem] = useRecoilState(userState);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mealItem, setMealItem] = useState<MealProps | undefined>(undefined);
  const [mealLocalItem, setMealLocalItem] = useState<MealProps | undefined>(undefined);
  const [toggle, setToggle] = useState(false);

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      setIsLoading(true);
    });

    return () => {
      setIsLoading(false);
      unsubscribe();
    };
  }, [navigation]);

  const handleCookButton = async () => {
    console.log(myMealsList);
    if (myMealsList) {
      const localMeal = myMealsList.find(
        (meal: MealProps) =>
          meal.recipe_id === recipeItem.recipe_id && meal.user_id === userItem!.user.uid
      );
      console.log("localMeal", localMeal);
      setMealLocalItem(localMeal);
      setMealItem(mealLocalItem);
      console.log("mealLocalItem", mealLocalItem, mealItem);
      if (mealLocalItem) {
        setMealId(mealLocalItem.my_meals_id);

        console.log("meal found", mealLocalItem.my_meals_id);
        if (mealLocalItem.dish_photos[0] === "") {
          setIsReadyDish(false);
        } else {
          setIsReadyDish(true);
        }
        if (mealLocalItem.ingredients_photos[0] === "") {
          setIsIngredientsSumbitted(false);
        } else {
          setIsIngredientsSumbitted(true);
        }
        setMealStatus(mealLocalItem.current_state);
      } else {
        console.log("create new meal");
        const docRef = await firestore()
          .collection(`user_data`)
          .doc(userItem?.user.uid)
          .collection("meals")
          .add({
            created_at: firestore.FieldValue.serverTimestamp(),
            current_state: "INCOMPLETE",
            dish_photos: [""],
            ingredients_photos: [""],
            my_meals_id: myMealsList?.length,
            recipe_id: recipeItem.recipe_id,
            tokens_earned: 0,
            user_id: userItem?.user.uid
          });

        await firestore()
          .collection(`user_data`)
          .doc(userItem?.user.uid)
          .collection("meals")
          .doc(docRef.id)
          .update({
            my_meals_id: docRef.id
          });

        console.log("Document written with ID: ", docRef.id);
        setMealId(docRef.id);

        setIsIngredientsSumbitted(false);
        setIsReadyDish(false);
        setMealStatus("INCOMPLETE");
      }
    }

    setTimeout(() => {
      navigation.navigate("CheckStatus");
    }, 500);
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <ImageBackground
      className="relative flex-col justify-between flex-1 bg-gray-500"
      source={{
        uri: recipeItem.recipe_images[0]
      }}
      resizeMode="cover">
      <GoBackButton color="white" navigation={navigation} />

      <View className="absolute bottom-0 h-2/3 flex-col justify-between rounded-t-3xl bg-slate-50 bg-gradient-to-b from-white to-[#F6F6F6] px-7 pt-7">
        <View className="flex-row items-end justify-between">
          <Text className="w-[50%] font-[Poppins-700] text-2xl">
            {recipeItem.recipe_name}
          </Text>
          <View className="flex-row items-center space-x-2">
            <Text className="mt-1 font-[Poppins-400] text-xs">Total:</Text>
            <Text className="font-[Poppins-700] text-2xl">{recipeItem.token_reward}</Text>
            {/* this needs to change to svg */}
            <Image source={require("../assets/png/coin1.png")} />
          </View>
        </View>
        <ScrollView className="flex-1 pt-3 pb-5">
          <Text className="font-[Poppins-400] text-xs text-[#6D6D6D]">
            {recipeItem.description}
          </Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              alignItems: "center",
              flexDirection: "row",
              flexGrow: 1
            }}
            className="pt-4 space-x-2 ">
            <View className="h-[114px] w-[122px] space-y-2 rounded-xl bg-white px-4 pt-3 ">
              <Text className="font-[Poppins-400] text-xs text-[#6D6D6D]">About:</Text>
              <View className="flex-row items-center space-x-2 ">
                <ClockIcon />
                <Text className="font-[Poppins-500] text-xs">
                  {recipeItem.cook_time_in_mins}
                </Text>
                <Text className="font-[Poppins-500] text-xs">mins</Text>
              </View>
              <View className="flex-row items-center space-x-2 ">
                <ServingsIcon />
                <Text className="font-[Poppins-500] text-xs">
                  {recipeItem.number_of_servings}
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
                    {recipeItem.nutritional_information.calories_in_cal}kcal
                  </Text>
                </View>
                <View className="flex-row items-center space-x-2 self-center rounded-full bg-[#DBF7E0] px-4 py-2">
                  <Text className="font-[Poppins-400] text-xs  text-[#2BD449]">Fat:</Text>
                  <Text className="font-[Poppins-600] text-xs  text-[#2BD449]">
                    {recipeItem.nutritional_information.fat_in_grams}g
                  </Text>
                </View>
                <View className="flex-row items-center space-x-2 self-center rounded-full bg-[#E4E2F8] px-4 py-2">
                  <Text className="font-[Poppins-400] text-xs  text-[#7264FB]">
                    Protein:
                  </Text>
                  <Text className="font-[Poppins-600] text-xs  text-[#7264FB]">
                    {recipeItem.nutritional_information.protein_in_grams}g
                  </Text>
                </View>
                <View className="flex-row items-center space-x-2 self-center rounded-full bg-[#DDF9F5] px-4 py-2">
                  <Text className="font-[Poppins-400] text-xs  text-[#23D8BE]">
                    Carbs:
                  </Text>
                  <Text className="font-[Poppins-600] text-xs  text-[#23D8BE]">
                    {recipeItem.nutritional_information.carbs_in_grams}g
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
          </View>
          <ScrollView className="pb-32">
            {!toggle ? (
              <View className="">
                {recipeItem.ingredients.map((ingredient, index) => (
                  <IngredientsItem key={index} ingredient={ingredient} />
                ))}
              </View>
            ) : (
              <View className="pt-2">
                <Text className="font-[Poppins-400] text-xs leading-6  text-[#637381]">
                  {recipeItem.cook_time_in_mins}
                </Text>
              </View>
            )}
          </ScrollView>
        </ScrollView>
        <TouchableOpacity
          onPress={() => handleCookButton()}
          className="absolute bottom-8 left-[9%] z-10 h-[60px] w-full flex-col items-center justify-center rounded-full bg-[#FF1E00] shadow-xl shadow-[#FF1E00]">
          <Text className="font-[Poppins-700] text-base text-white">LET'S COOK IT</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default RecipeDetails;
