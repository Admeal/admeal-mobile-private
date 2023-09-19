import { Image, Text, TouchableOpacity, View } from "react-native";
import RecipeStatusButton from "../components/buttons/RecipeStatusButton";
import { ingredientsImageState, isIngredientsSumbittedState } from "../atoms/dataAtom";
import { useRecoilState } from "recoil";

import blockHardBackPress from "../hooks/blockHardBackPress";

const ImageVerification = ({ navigation, route }: ScreensProps) => {
  const { mealId, temporaryImage } = route.params;
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );

  blockHardBackPress();

  return (
    <View className="flex-1 flex-col items-center justify-between">
      <View className="pt-[80px]"></View>
      {!isIngredientsSumbitted && ingredientsImage !== "" ? (
        <Image
          className="mx-5 h-1/2 w-[80%] rounded-xl p-4"
          source={{
            uri: temporaryImage,
            method: "POST"
          }}
        />
      ) : (
        <Image
          className="mx-5 h-[55%] w-[80%] rounded-xl p-4 px-4"
          source={{ uri: temporaryImage, method: "POST" }}
        />
      )}
      <Text className="pb-8 pt-4 font-[Poppins-700] text-2xl">
        Great! Upload this photo?
      </Text>
      <RecipeStatusButton label="UPLOAD" navigation={navigation} />
      <TouchableOpacity onPress={() => navigation.push("CameraUpload", { mealId })}>
        <Text className="pb-4 font-[Poppins-500] text-sm underline">
          Take another shot
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageVerification;
