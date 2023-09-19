import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { useRecoilState } from "recoil";

import {
  userState,
  isIngredientsSumbittedState,
  isReadyDishState,
  ingredientsImageState,
  dishImageState,
  mealStatusState,
  myMealsListState
} from "../atoms/dataAtom";

import DishCoinLogo from "../assets/icons/dishCoinLogo";
import CheckboxIcon from "../assets/icons/checkboxIcon";
import EyeIcon from "../assets/icons/eyeIcon";
import FoodIngredientsIcon from "../assets/icons/foodIngredientsIcon";
import PreparedDishIcon from "../assets/icons/preparedDishIcon";

import GoBackButton from "../components/buttons/GoBackButton";
import RecipeStatusButton from "../components/buttons/RecipeStatusButton";

import CustomModal from "../components/CustomModal";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import blockHardBackPress from "../hooks/blockHardBackPress";

const CheckStatus = ({ navigation, route }: ScreensProps) => {
  const { mealId } = route.params;

  const [user, setUser] = useRecoilState(userState);
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [dishImage, setDishImage] = useRecoilState(dishImageState);
  const [myMealsList, setMyMealsList] = useRecoilState(myMealsListState);
  const [mealStatus, setMealStatus] = useRecoilState(mealStatusState);

  const [textStatus, setTextStatus] = useState<string>("");
  const [meal, setMeal] = useState<MealProps | null>(null);
  const [tokenReward, setTokenReward] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { address } = useWalletConnectModal();
  console.log("address", address);

  blockHardBackPress();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("user_data")
      .doc(user?.user.uid)
      .collection("meals")
      .doc(mealId)
      .onSnapshot((snapshot) => {
        console.log("snapshot", snapshot.data());
        setMeal(snapshot.data() as MealProps);
      });

    return () => {
      setMeal(null);
      unsubscribe();
      console.log("unsubscribed");
    };
  }, [mealId]);

  useEffect(() => {
    let array: MealProps[] = [];
    myMealsList.map((myMeal) => {
      if (myMeal.recipe_id === meal?.recipe_id) {
        array.push(myMeal as MealProps);
      }
    });

    // console.log("array", array);
    const firebaseTime = firestore.Timestamp.now().seconds;
    const day = 24 * 60 * 60;

    if (array.length > 0 && meal !== null && meal !== undefined) {
      array.map((item: MealProps) => {
        if (
          firebaseTime < day + item?.submitted_at?.seconds! &&
          meal?.current_state === "INCOMPLETE"
        ) {
          console.log("sumbition unavailable");
          setIsModalVisible(true);
        } else {
          !isModalVisible &&
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
        }
      });
    }

    if (meal) {
      if (meal?.dish_photos[0] === "") {
        setIsReadyDish(false);
      } else {
        setIsReadyDish(true);
        setDishImage(meal?.dish_photos[0]);
      }
      if (meal?.ingredients_photos[0] === "") {
        setIsIngredientsSumbitted(false);
      } else {
        setIsIngredientsSumbitted(true);
        setIngredientsImage(meal?.ingredients_photos[0]);
      }
      setMealStatus(meal?.current_state);
    }
  }, [meal]);

  useEffect(() => {
    setTextStatus(handleMealStatus());
  }, [meal?.current_state]);

  const handleMealStatus = () => {
    switch (mealStatus) {
      case "COMPLETE":
        return `you have earned ${meal?.tokens_earned} tokens!`;
      case "INVALID":
        return "Your photos weren’t approved.  Probably your uploaded wrong photos.";
      case "AWAITING_VALIDATION":
      case "INCOMPLETE":
        return "We’re checking your photos. You’ll receive your reward soon!";
      default:
        return "";
    }
  };

  return (
    <View className="h-screen w-full flex-col items-center justify-between">
      {/* submition modal */}
      {isModalVisible && (
        <CustomModal
          navigation={navigation}
          isVisible={isModalVisible}
          close={() => setIsModalVisible(false)}
          title="Recipe submition limitation"
          desc="You can submit this recipe once every 24 hours. Please try again tomorrow."
          buttonLogic="limit"
          height="h-[320px]"
        />
      )}

      <View className="w-full">
        <View className="pt-16 pr-8"></View>
        <GoBackButton mealId={mealId} navigation={navigation} color="white" />
      </View>

      {mealStatus === "COMPLETE" ? (
        <View className="h-5/6 flex-col items-center justify-between">
          <View className="mt- h-[58%] w-[300px] rounded-xl bg-gray-300">
            {dishImage !== "" && (
              <Image
                style={{ width: 300, height: "100%", borderRadius: 12 }}
                source={{ uri: dishImage, method: "POST" }}
              />
            )}
          </View>
          <Text className="font-[Poppins-700] text-2xl text-[#212B36]">
            Congratulations
          </Text>
          <View className="flex-col items-center justify-center">
            <Text className="font-[Poppins-500] text-lg text-[#6D6D6D]">You earned</Text>
            <View className="w-full flex-row items-center">
              <Text className="pr-2 font-[Poppins-700] text-2xl text-[#212B36]">
                {tokenReward}
              </Text>
              <DishCoinLogo size={24} />
            </View>
          </View>
          <Text className="px-8 text-center font-[Poppins-400] text-sm text-[#6D6D6D]">
            The reward is in your Wallet. Check it and enjoy your meal.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="mt-4 h-[50px] w-[220px] flex-col items-center justify-center rounded-full bg-[#FF1E00] py-2 shadow-[#FF1E00]">
            <Text className="font-[Poppins-700] text-xl text-white">MY RECIPES</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="h-full w-full flex-col items-center justify-between pb-16">
          <Text className=" font-[Poppins-700] text-2xl">Excellent choice!</Text>
          <View>
            <Text className="px-4 text-center font-[Poppins-600] text-sm text-[#6D6D6D]">
              Now follow the steps to get tokens and track your progress.
            </Text>
          </View>

          {isIngredientsSumbitted ? (
            <View className="h-[160px] w-[300px] rounded-xl bg-gray-300">
              {ingredientsImage !== "" && (
                <Image
                  style={{ width: 300, height: 160, borderRadius: 12 }}
                  source={{ uri: ingredientsImage, method: "POST" }}
                />
              )}
            </View>
          ) : (
            <FoodIngredientsIcon />
          )}

          {!isIngredientsSumbitted ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("RecipeDetails")}
              className="flex-row items-center space-x-2">
              <EyeIcon />
              <Text className="font-[Poppins-400] text-sm text-[#FF1E00]">
                View recipe
              </Text>
            </TouchableOpacity>
          ) : (
            <Text className="font-[Poppins-600] text-lg">
              Take a photo of ingredients
            </Text>
          )}

          {isIngredientsSumbitted ? (
            <View className="mb-[16px] flex-row items-center space-x-2">
              <CheckboxIcon />
              <Text className="font-[Poppins-600] text-sm text-[#919EAB]">Submitted</Text>
            </View>
          ) : (
            <RecipeStatusButton disabled={isLoading} navigation={navigation} />
          )}

          {isReadyDish ? (
            <View className="h-[160px] w-[300px] rounded-xl bg-gray-300">
              {dishImage !== "" && (
                <Image
                  style={{ width: 300, height: 160, borderRadius: 12 }}
                  source={{ uri: dishImage, method: "POST" }}
                />
              )}
            </View>
          ) : (
            <PreparedDishIcon />
          )}

          {!isReadyDish && (
            <Text className="font-[Poppins-600] text-lg">
              Take a photo of prepared dish
            </Text>
          )}

          {!isReadyDish && (
            <RecipeStatusButton
              navigation={navigation}
              disabled={!isIngredientsSumbitted || isLoading}
            />
          )}

          {isReadyDish && (
            <>
              <View className="flex-row items-center space-x-2">
                <CheckboxIcon />
                <Text className="font-[Poppins-600] text-sm text-[#919EAB]">
                  Submitted
                </Text>
              </View>
              <View className="px-8 pb-8">
                <Text className="text-center font-[Poppins-600] text-sm text-[#6D6D6D]">
                  {textStatus}
                </Text>
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default CheckStatus;
