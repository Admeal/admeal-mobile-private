import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState, useCallback, useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import {
  dishImageState,
  ingredientsImageState,
  isIngredientsSumbittedState
} from "../atoms/dataAtom";

import { Camera, CameraProps, CameraType, ConstantsType, FlashMode } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";

import GoBackButton from "../components/buttons/GoBackButton";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import LoadingScreen from "./LoadingScreen";

const CameraUpload = ({ navigation, route }: ScreensProps) => {
  const { mealId } = route.params;
  console.log("camera mealId", mealId);
  const [dishImage, setDishImage] = useRecoilState(dishImageState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );

  const [camera, setCamera] = useState<Camera | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState<boolean>(false);
  const [flashText, setFlashText] = useState<string>(FlashMode.off);

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      setIsLoading(true);
    });

    return () => {
      setIsLoading(false);
      unsubscribe();
    };
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission((prevState) => status === "granted");
    })();
    return () => {
      setCamera(null);
      setHasCameraPermission(null);
    };
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({
        quality: 0.3
      });
      console.log("data", typeof data, data);

      if (!isIngredientsSumbitted) {
        setIngredientsImage(data.uri);
      } else {
        setDishImage(data.uri);
      }
      navigation.navigate("ImageVerification", { mealId, temporaryImage: data.uri });
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Camera
      className="flex-1 flex-col items-center justify-center"
      flashMode={flashText as FlashMode}
      type={type}
      ref={(ref) => {
        setCamera(ref);
      }}>
      <GoBackButton mealId={mealId} navigation={navigation} color="white" />
      <View className="w-full flex-row items-center justify-end self-start">
        {/* flash button */}
        <TouchableOpacity
          className="mr-8 mt-10 h-[40px] w-[40px] flex-col items-center justify-center self-end rounded-full bg-[#919EAB]/50"
          onPress={() => {
            setFlashMode(!flashMode);
            setFlashText(FlashMode.on ? "on" : "off");
          }}>
          {flashMode ? (
            <Ionicons name="flash-outline" size={24} color="white" />
          ) : (
            <Ionicons name="flash-off-outline" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
      <View className="flex-1 flex-row bg-transparent">
        <TouchableOpacity
          className="mb-8 h-[60px] w-[60px] flex-col items-center justify-center self-end rounded-full bg-[#919EAB]/50"
          style={{}}
          onPress={takePicture}>
          <AntDesign name="camerao" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

export default CameraUpload;
