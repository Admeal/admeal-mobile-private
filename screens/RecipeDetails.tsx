import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
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
  userState
} from "../atoms/dataAtom";
import { useRecoilState } from "recoil";
import firestore from "@react-native-firebase/firestore";

import { Motion } from "@legendapp/motion";

import MinMaxButton from "../components/buttons/MinMaxButton";
import Spinner from "../components/animations/spinner";

import DishCoinLogo from "../assets/icons/dishCoinLogo";

import blockHardBackPress from "../hooks/blockHardBackPress";
import transition from "../hooks/transitionAnimation";

const RecipeDetails = ({ navigation, route }: ScreensProps) => {
  const { recipe } = route.params;
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [mealId, setMealId] = useRecoilState(mealIdState);
  const [mealStatus, setMealStatus] = useRecoilState(mealStatusState);
  const [myMealsList, setMyMealsList] = useRecoilState(myMealsListState);
  const [userItem, setUserItem] = useRecoilState(userState);

  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const [toggle, setToggle] = useState(false);
  const [isMiniImage, setIsMiniImage] = useState<boolean>(true);

  blockHardBackPress();

  const handleCookButton = async () => {
    setIsLoadingButton(true);
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
        recipe_id: recipe.recipe_id,
        submitted: false,
        submitted_at: null,
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

    setMealId(docRef.id);

    setIsIngredientsSumbitted(false);
    setIsReadyDish(false);
    setMealStatus("INCOMPLETE");

    navigation.navigate("CheckStatus", {
      recipe,
      mealId: docRef.id
    });
    setIsLoadingButton(false);
  };

  return (
    <ImageBackground
      className="relative flex-1 flex-col justify-between bg-gray-500"
      source={{
        uri: recipe.recipe_images[0],
        method: "POST"
      }}
      resizeMode="cover">
      <GoBackButton mealId={mealId} navigation={navigation} color="white" />

      <Motion.View
        initial={{ height: isMiniImage ? 90 : 480 }}
        animate={{ height: isMiniImage ? 90 : 480 }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 400
        }}
        className="absolute bottom-0 h-2/3 ">
        <View className="relative h-full flex-col justify-between rounded-t-3xl bg-slate-50 bg-gradient-to-b from-white to-[#F6F6F6] px-7 pt-7">
          <MinMaxButton
            horizontalPosition="right-[51%]"
            isMini={isMiniImage}
            setIsMini={setIsMiniImage}
            verticalPosition="top-0"
            rotateFrom={270}
            rotateTo={90}
          />
          <View className="flex-row items-end justify-between">
            <Text className="w-[50%] font-[Poppins-700] text-2xl">
              {recipe.recipe_name}
            </Text>
            <View className="flex-row items-center space-x-2">
              <Text className="mt-1 font-[Poppins-400] text-xs">Total:</Text>
              <Text className="pr-2 font-[Poppins-700] text-2xl">
                {recipe.token_reward}
              </Text>
              <DishCoinLogo size={18} scale={0.7} />
            </View>
          </View>
          <ScrollView className="flex-1 pt-3 pb-5">
            <Text className="font-[Poppins-400] text-xs text-[#6D6D6D]">
              {recipe.description}
            </Text>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                alignItems: "center",
                flexDirection: "row",
                flexGrow: 1
              }}
              className="space-x-2 pt-4 ">
              <View className="h-[114px] w-[122px] space-y-2 rounded-xl bg-white px-4 pt-3 ">
                <Text className="font-[Poppins-400] text-xs text-[#6D6D6D]">About:</Text>
                <View className="flex-row items-center space-x-2 ">
                  <ClockIcon />
                  <Text className="font-[Poppins-500] text-xs">
                    {recipe.cook_time_in_mins}
                  </Text>
                  <Text className="font-[Poppins-500] text-xs">mins</Text>
                </View>
                <View className="flex-row items-center space-x-2 ">
                  <ServingsIcon />
                  <Text className="font-[Poppins-500] text-xs">
                    {recipe.number_of_servings}
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
                      {recipe.nutritional_information.calories_in_cal}kcal
                    </Text>
                  </View>
                  <View className="flex-row items-center space-x-2 self-center rounded-full bg-[#DBF7E0] px-4 py-2">
                    <Text className="font-[Poppins-400] text-xs  text-[#2BD449]">
                      Fat:
                    </Text>
                    <Text className="font-[Poppins-600] text-xs  text-[#2BD449]">
                      {recipe.nutritional_information.fat_in_grams}g
                    </Text>
                  </View>
                  <View className="flex-row items-center space-x-2 self-center rounded-full bg-[#E4E2F8] px-4 py-2">
                    <Text className="font-[Poppins-400] text-xs  text-[#7264FB]">
                      Protein:
                    </Text>
                    <Text className="font-[Poppins-600] text-xs  text-[#7264FB]">
                      {recipe.nutritional_information.protein_in_grams}g
                    </Text>
                  </View>
                  <View className="flex-row items-center space-x-2 self-center rounded-full bg-[#DDF9F5] px-4 py-2">
                    <Text className="font-[Poppins-400] text-xs  text-[#23D8BE]">
                      Carbs:
                    </Text>
                    <Text className="font-[Poppins-600] text-xs  text-[#23D8BE]">
                      {recipe.nutritional_information.carbs_in_grams}g
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
                  {recipe.ingredients.map((ingredient, index) => (
                    <IngredientsItem key={index} ingredient={ingredient} />
                  ))}
                </View>
              ) : (
                <View className="pt-2">
                  <Text className="font-[Poppins-400] text-xs leading-6  text-[#637381]">
                    {recipe.cooking_instructions}
                  </Text>
                </View>
              )}
            </ScrollView>
          </ScrollView>
          {!isMiniImage && (
            <Motion.View
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: "easeIn", duration: 5.5 }}
              className="absolute bottom-8 left-[9%] z-10 h-[60px] w-full">
              <TouchableOpacity
                disabled={isLoadingButton}
                onPress={() => handleCookButton()}
                className="h-full  flex-col items-center justify-center rounded-full bg-[#FF1E00] shadow-xl shadow-[#FF1E00]">
                {!isLoadingButton ? (
                  <Text className="font-[Poppins-700] text-base text-white">
                    LET'S COOK IT
                  </Text>
                ) : (
                  <Spinner />
                )}
              </TouchableOpacity>
            </Motion.View>
          )}
        </View>
      </Motion.View>
    </ImageBackground>
  );
};

export default RecipeDetails;
