import { View, Text, TouchableOpacity } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  dishImageState,
  ingredientsImageState,
  isIngredientsSumbittedState,
  isReadyDishState,
  mealIdState,
  mealStatusState,
  userState,
} from "../../atoms/dataAtom";

import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { AntDesign } from "@expo/vector-icons";
import getBlobFromUri from "../../hooks/getBlobFromUri";

type RecipeStatusButtonProps = {
  disabled?: boolean;
  label?: string;
  navigation: NavigationNavigateProp;
};

const RecipeStatusButton = ({
  disabled,
  label = "TAKE A PHOTO",
  navigation,
}: RecipeStatusButtonProps) => {
  const [dishImage, setDishImage] = useRecoilState(dishImageState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [mealId, setMealId] = useRecoilState(mealIdState);
  const [mealStatus, setMealStatus] = useRecoilState(mealStatusState);
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [user, setUser] = useRecoilState(userState);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const handleUpload = async () => {
    disabled ? null : console.log(label);
    if (!disabled) {
      console.log("upload id", mealId, typeof mealId);

      if (mealStatus === "COMPLETE" && ingredientsImage !== "" && dishImage !== "") {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }]
        });
        return;
      }

      if (ingredientsImage === "" && !isIngredientsSumbitted) {
        navigation.reset({
          index: 0,
          routes: [{ name: "CameraUpload" }]
        });
      }

      if (ingredientsImage !== "" && isIngredientsSumbitted && dishImage === "") {
        navigation.reset({
          index: 0,
          routes: [{ name: "CameraUpload" }]
        });
      }

      if (ingredientsImage !== "" && !isIngredientsSumbitted && mealId) {
        setIsLoading(true);
        const docRef = await firestore()
          .collection("user_data")
          .doc(user?.user.uid)
          .collection("meals")
          .doc(mealId)
          .get();

        docRef.exists && console.log("Document data:", docRef.data());
        const imageRef = storage().ref(
          `user_photos/${user?.user.uid}/meals/${mealId}/ingredientsImage.jpg`
        );
        console.log("upload 1id", mealId);
        const imageBlob = await getBlobFromUri(ingredientsImage);
        await imageRef.put(imageBlob as Blob).then(async () => {
          console.log("upload 2id", mealId);
          const downLoadUrl = await imageRef.getDownloadURL();
          await firestore()
            .collection("user_data")
            .doc(user?.user.uid)
            .collection("meals")
            .doc(mealId)
            .update({
              ingredients_photos: [downLoadUrl],
              my_meals_id: mealId
            });
          console.log("ingredients Image uploaded");
        });

        setIsIngredientsSumbitted(true);
        setIsLoading(false);
        navigation.navigate("CheckStatus");
      }
    }
    if (dishImage !== "" && ingredientsImage !== "" && isIngredientsSumbitted) {
      setIsLoading(true);
      const docRef = await firestore()
        .collection("user_data")
        .doc(user?.user.uid)
        .collection("meals")
        .doc(mealId)
        .get();

      docRef.exists && console.log("Document data:", docRef.data());
      const imageRef = storage().ref(
        `user_photos/${user?.user.uid}/meals/${mealId}/dishImage.jpg`
      );
      console.log("upload 1id", mealId);
      const imageBlob = await getBlobFromUri(dishImage);
      await imageRef.put(imageBlob as Blob).then(async () => {
        console.log("upload 2id", mealId);
        const downLoadUrl = await imageRef.getDownloadURL();
        await firestore()
          .collection("user_data")
          .doc(user?.user.uid)
          .collection("meals")
          .doc(mealId)
          .update({
            dish_photos: [downLoadUrl],
            my_meals_id: mealId,
            current_state: "AWAITING_VALIDATION"
          });
        console.log("ingredients Image uploaded", downLoadUrl);
      });
      setIsReadyDish(true);
      setIsLoading(false);
      navigation.navigate("CheckStatus");
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handleUpload}
      className={`mb-[48px] h-12 w-[40%] flex-col items-center justify-center rounded-full px-3 pt-1 text-center shadow-xl ${
        disabled ? "bg-[#919EAB]/20 shadow-[#919EAB]/20" : "bg-[#FF1E00] shadow-[#FF1E00]"
      }`}>
      {isLoading ? (
        <View className="flex-row items-center justify-center animate-spin">
          {/* <AntDesign name="reload1" size={24} color="white" /> */}
        </View>
      ) : (
        <Text
          className={`font-[Poppins-600] text-base ${
            disabled ? "text-[#919EAB]" : "text-white"
          }`}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default RecipeStatusButton;
