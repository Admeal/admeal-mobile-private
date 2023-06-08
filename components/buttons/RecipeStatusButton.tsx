import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { storage, realtimeDB, db } from "../../firebaseConfig";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { encode } from "base-64";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc
} from "@firebase/firestore";

import {
  isIngredientsSumbittedState,
  isReadyDishState,
  ingredientsImageState,
  dishImageState,
  mealIdState
} from "../../atoms/dataAtom";
import useAuth from "../../hooks/useAuth";

type RecipeStatusButtonProps = {
  navigation: any;
  disabled?: boolean;
  label?: string;
};

const RecipeStatusButton = ({
  navigation,
  disabled,
  label = "TAKE A PHOTO"
}: RecipeStatusButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [dishImage, setDishImage] = useRecoilState(dishImageState);
  const [mealId, setMealId] = useRecoilState(mealIdState);

  const { user } = useAuth();

  useEffect(() => {}, []);

  const handleUpload = async () => {
    disabled ? null : console.log(label);
    if (!disabled) {
      console.log("upload id", mealId, typeof mealId);

      if (!ingredientsImage && !isIngredientsSumbitted) {
        navigation.navigate("CameraUpload");
      }
      if (ingredientsImage && isIngredientsSumbitted && !dishImage) {
        navigation.navigate("CameraUpload");
      }

      if (ingredientsImage && !isIngredientsSumbitted && mealId) {
        const docRef = await getDoc(doc(db, "my_meals", mealId));
        console.log("docRef", docRef);
        if (docRef.exists()) {
          console.log("Document data:", docRef.data());
          const imageRef = ref(
            storage,
            `meals/${mealId}/${user?.id}/ingredientsImage.png`
          );
          console.log("upload 1id", mealId);
          const encodedData = encode(ingredientsImage);
          await uploadString(imageRef, encodedData, "base64").then(async (snapshot) => {
            console.log("upload 2id", mealId);

            const downLoadUrl = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "my_meals", mealId), {
              ingredients_photos: [downLoadUrl]
            });
            console.log("ingredients Image uploaded");
          });

          navigation.navigate("CheckStatus");
        }
      }
    }

    // setIsIngredientsSumbitted(true);
    // set IngredientsImage to firebase storage
    // navigation.navigate("CheckStatus");

    // if (dishImage && ingredientsImage && isIngredientsSumbitted) {
    //   // setIsReadyDish(true);
    //   // set dishImage to firebase storage
    // }
    // }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handleUpload}
      className={`mb-[48px] h-12 w-[55%] flex-col items-center justify-center rounded-full  px-3 pt-1 text-center shadow-xl  ${
        disabled ? "bg-[#919EAB]/20 shadow-[#919EAB]/20" : "bg-[#FF1E00] shadow-[#FF1E00]"
      }`}>
      <Text
        className={`font-[Poppins-600] text-base ${
          disabled ? "text-[#919EAB]" : "text-white"
        }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default RecipeStatusButton;
