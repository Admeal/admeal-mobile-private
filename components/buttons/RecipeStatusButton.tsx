import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  dishImageState,
  ingredientsImageState,
  isIngredientsSumbittedState,
  isReadyDishState,
  mealIdState,
  mealStatusState,
  userState
} from "../../atoms/dataAtom";

import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { AntDesign } from "@expo/vector-icons";
import getBlobFromUri from "../../hooks/getBlobFromUri";
import Spinner from "../animations/spinner";

type RecipeStatusButtonProps = {
  disabled?: boolean;
  label?: string;
  navigation: NavigationProp;
};

const RecipeStatusButton = ({
  disabled,
  label = "TAKE A PHOTO",
  navigation
}: // mealId
RecipeStatusButtonProps) => {
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

  const handlePress = async () => {
    isLoading || disabled ? null : console.log(label);
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
        console.log("upload 1id", mealId);
        navigation.navigate("CameraUpload", { mealId: mealId });
      }

      if (ingredientsImage !== "" && isIngredientsSumbitted && dishImage === "") {
        console.log("upload 2id", mealId);
        navigation.navigate("CameraUpload", { mealId: mealId });
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
              ingredients_photos: [downLoadUrl]
            });
          console.log("ingredients Image uploaded");
        });

        setIsIngredientsSumbitted(true);
        setIsLoading(false);
        navigation.navigate("CheckStatus", { mealId });
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
            submitted: true,
            submitted_at: firestore.FieldValue.serverTimestamp(),
            current_state: "AWAITING_VALIDATION"
          });
        console.log("ingredients Image uploaded", downLoadUrl);
      });
      setIsReadyDish(true);
      setIsLoading(false);
      navigation.navigate("CheckStatus", { mealId });
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handlePress}
      className={`mb-[48px] h-12 w-[40%] flex-col items-center justify-center rounded-full px-3 pt-1 text-center shadow-xl ${
        disabled ? "bg-[#919EAB]/20 shadow-[#919EAB]/20" : "bg-[#FF1E00] shadow-[#FF1E00]"
      }`}>
      {isLoading ? (
        <View className="flex-row items-center justify-center">
          <Spinner />
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
