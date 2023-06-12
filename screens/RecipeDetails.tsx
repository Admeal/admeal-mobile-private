import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { useEffect, useState } from "react";
import ClockIcon from "../assets/icons/clockIcon";
import ServingsIcon from "../assets/icons/servingsIcon";
import IngredientsItem from "../components/IngredientsItem";
import GoBackButton from "../components/buttons/GoBackButton";
import {
  recipeItemState,
  isIngredientsSumbittedState,
  isReadyDishState,
  ingredientsImageState,
  dishImageState,
  mealsListState,
  mealStatusState,
  myMealsListState,
  mealIdState
} from "../atoms/dataAtom";
import { useRecoilState } from "recoil";
import useAuth from "../hooks/useAuth";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, realtimeDB } from "../firebaseConfig";

const RecipeDetails = ({ navigation }: any) => {
  const [recipeItem, setRecipeItem] = useRecoilState(recipeItemState);
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [dishImage, setDishImage] = useRecoilState(dishImageState);
  const [mealsList, setMealsList] = useRecoilState(mealsListState);
  const [myMealsList, setMyMealsList] = useRecoilState(myMealsListState);
  const [mealStatus, setMealStatus] = useRecoilState(mealStatusState);
  const [mealId, setMealId] = useRecoilState(mealIdState);

  const [toggle, setToggle] = useState(false);

  const { user } = useAuth();

  const handleCookButton = async () => {
    console.log("cook 1", typeof mealsList);
    if (myMealsList) {
      const meal = myMealsList.find(
        (meal) => meal.recipe_id === recipeItem.recipeId && meal.user_id === user?.id
      );

      console.log("doc found?", meal?.my_meals_id, meal, mealId);
      if (meal) {
        setMealId(meal?.my_meals_id);

        console.log("meal found", meal.my_meals_id);
        if (meal?.dish_photos[0] === "") {
          setIsReadyDish(false);
        } else {
          setIsReadyDish(true);
        }
        if (meal?.ingredients_photos[0] === "") {
          setIsIngredientsSumbitted(false);
        } else {
          setIsIngredientsSumbitted(true);
        }
        setMealStatus(meal.current_state);
      } else {
        console.log("create new meal");
        const docRef = await addDoc(collection(db, "my_meals"), {
          user_id: user?.id,
          tokens_earned: 0,
          recipe_id: recipeItem.recipeId,
          my_meals_id: mealsList?.length,
          ingredients_photos: [""],
          dish_photos: [""],
          current_state: "INCOMPLETE"
        });
        await updateDoc(doc(db, "my_meals", docRef.id), {
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

  return (
    <ImageBackground
      className="flex-1 flex-col justify-between bg-gray-500"
      source={{
        uri: recipeItem.recipeImages
      }}
      resizeMode="cover">
      <GoBackButton color="white" navigation={navigation} />

      <View className="relative h-2/3 flex-col  justify-between rounded-t-3xl bg-slate-50 bg-gradient-to-b from-white to-[#F6F6F6] px-7 pt-7">
        <View className="flex-row items-end justify-between">
          <Text className="w-[50%] font-[Poppins-700] text-2xl">
            {recipeItem.recipeName}
          </Text>
          <View className="flex-row items-center space-x-2">
            <Text className="mt-1 font-[Poppins-400] text-xs">Total:</Text>
            <Text className="font-[Poppins-700] text-2xl">{recipeItem.price}</Text>
            <Image source={require("../assets/png/coin1.png")} />
          </View>
        </View>
        <ScrollView className="flex-1 pb-5 pt-3">
          <Text className="font-[Poppins-400] text-xs text-[#6D6D6D]">
            {recipeItem.description}
          </Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              flexGrow: 1,
              flexDirection: "row",
              alignItems: "center"
            }}
            className="space-x-2 pt-4 ">
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
                  {recipeItem.cookingInstructions}
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
