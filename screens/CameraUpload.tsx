import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import { useEffect, useState, useCallback, useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import {
  isIngredientsSumbittedState,
  isReadyDishState,
  ingredientsImageState,
  dishImageState
} from "../atoms/dataAtom";
import { Camera, CameraProps } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";

import GoBackButton from "../components/buttons/GoBackButton";

import LoadingScreen from "./LoadingScreen";

const CameraUpload = ({ navigation }: GroupMealProps) => {
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [dishImage, setDishImage] = useRecoilState(dishImageState);

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      navigation.navigate("ImageVerification");
    }
  };

  const handlePictureButton = () => {
    Camera.Constants.AutoFocus.on;
    const picture = takePicture();
  };

  const handleFlashButton = () => {
    if (Camera.Constants.FlashMode.off) {
      Camera.Constants.FlashMode.on;
    } else {
      Camera.Constants.FlashMode.off;
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
      type={type}
      ref={(ref) => {
        setCamera(ref);
      }}>
      <GoBackButton navigation={navigation} color="white" />
      <View className="w-full flex-row items-center justify-end self-start">
        {/* flash button */}
        <TouchableOpacity
          className="mr-8 mt-10 h-[40px] w-[40px] self-end rounded-full bg-[#919EAB]/50"
          style={{}}
          onPress={handleFlashButton}>
          <Text>11</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 flex-row bg-transparent">
        <TouchableOpacity
          className="mb-8 h-[60px] w-[60px] self-end rounded-full bg-[#919EAB]/50"
          style={{}}
          onPress={handlePictureButton}></TouchableOpacity>
      </View>
    </Camera>
  );
};

export default CameraUpload;
