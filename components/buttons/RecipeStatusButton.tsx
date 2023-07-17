import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
// import { storage, realtimeDB, db } from "../../firebaseConfig";
// import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
// import { doc, updateDoc, getDoc } from "@firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import {
  isIngredientsSumbittedState,
  isReadyDishState,
  ingredientsImageState,
  dishImageState,
  mealIdState,
  mealStatusState
} from "../../atoms/dataAtom";
import useAuth from "../../hooks/useAuth";
import getBlobFromUri from "../../hooks/getBlobFromUri";

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
  const [mealStatus, setMealStatus] = useRecoilState(mealStatusState);

  const { user } = useAuth();

  useEffect(() => {}, []);

  const handleUpload = async () => {
    // disabled ? null : console.log(label);
    // if (!disabled) {
    //   console.log("upload id", mealId, typeof mealId);
    //   if (mealStatus === "COMPLETE" && ingredientsImage !== "" && dishImage !== "") {
    //     navigation.reset({
    //       index: 0,
    //       routes: [{ name: "Home" }]
    //     });
    //     return;
    //   }
    //   if (ingredientsImage === "" && !isIngredientsSumbitted) {
    //     navigation.reset({
    //       index: 0,
    //       routes: [{ name: "CameraUpload" }]
    //     });
    //   }
    //   if (ingredientsImage !== "" && isIngredientsSumbitted && dishImage === "") {
    //     navigation.reset({
    //       index: 0,
    //       routes: [{ name: "CameraUpload" }]
    //     });
    //   }
    //   if (ingredientsImage !== "" && !isIngredientsSumbitted && mealId) {
    //     setIsLoading(true);
    //     const docRef = await getDoc(doc(db, "my_meals", mealId));
    //     console.log("docRef", docRef);
    //     if (docRef.exists()) {
    //       console.log("Document data:", docRef.data());
    //       const imageRef = ref(
    //         storage,
    //         `meals/${mealId}/${user?.id}/ingredientsImage.jpg`
    //       );
    //       console.log("upload 1id", mealId);
    //       const imageBlob = await getBlobFromUri(ingredientsImage);
    //       await uploadBytesResumable(imageRef, imageBlob).then(async () => {
    //         console.log("upload 2id", mealId);
    //         const downLoadUrl = await getDownloadURL(imageRef);
    //         await updateDoc(doc(db, "my_meals", mealId), {
    //           ingredients_photos: [downLoadUrl],
    //           my_meals_id: mealId
    //         });
    //         console.log("ingredients Image uploaded");
    //       });
    //       setIsIngredientsSumbitted(true);
    //       setIsLoading(false);
    //       navigation.navigate("CheckStatus");
    //     }
    //   }
    // }
    // if (dishImage !== "" && ingredientsImage !== "" && isIngredientsSumbitted) {
    //   setIsLoading(true);
    //   const docRef = await getDoc(doc(db, "my_meals", mealId));
    //   console.log("docRef", docRef);
    //   if (docRef.exists()) {
    //     console.log("Document data:", docRef.data());
    //     const imageRef = ref(storage, `meals/${mealId}/${user?.id}/dishImage.jpg`);
    //     console.log("upload 1id", mealId);
    //     const imageBlob = await getBlobFromUri(dishImage);
    //     await uploadBytesResumable(imageRef, imageBlob).then(async () => {
    //       console.log("upload 2id", mealId);
    //       const downLoadUrl = await getDownloadURL(imageRef);
    //       await updateDoc(doc(db, "my_meals", mealId), {
    //         dish_photos: [downLoadUrl],
    //         my_meals_id: mealId,
    //         current_state: "AWAITING_VALIDATION"
    //       });
    //       console.log("ingredients Image uploaded", downLoadUrl);
    //     });
    //     setIsReadyDish(true);
    //     setIsLoading(false);
    //     navigation.navigate("CheckStatus");
    //   }
    // }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handleUpload}
      className={`mb-[48px] h-12 w-[40%] flex-col items-center justify-center rounded-full px-3 pt-1 text-center shadow-xl ${
        disabled ? "bg-[#919EAB]/20 shadow-[#919EAB]/20" : "bg-[#FF1E00] shadow-[#FF1E00]"
      }`}>
      {isLoading ? (
        <View className="animate-spin flex-row items-center justify-center">
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
