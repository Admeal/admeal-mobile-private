import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  isIngredientsSumbittedState,
  isReadyDishState,
  ingredientsImageState,
  dishImageState
} from "../atoms/dataAtom";
import { Camera } from "expo-camera";
import GoBackButton from "../components/buttons/GoBackButton";

const CameraUpload = ({ navigation }: any) => {
  const [isIngredientsSumbitted, setIsIngredientsSumbitted] = useRecoilState(
    isIngredientsSumbittedState
  );
  const [isReadyDish, setIsReadyDish] = useRecoilState(isReadyDishState);
  const [ingredientsImage, setIngredientsImage] = useRecoilState(ingredientsImageState);
  const [dishImage, setDishImage] = useRecoilState(dishImageState);

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

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
    Camera.Constants.FlashMode.torch;
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

  return (
    <Camera
      className="flex-1 flex-col items-center justify-center"
      type={type}
      ref={(ref) => {
        setCamera(ref);
      }}>
      <View className="w-full flex-row items-center justify-between self-start">
        <GoBackButton navigation={navigation} color="white" />
        {/* flash button */}
        {/* <TouchableOpacity
          className="mr-8 h-[40px] w-[40px] self-end rounded-full bg-[#919EAB]/70"
          style={{}}
          onPress={handleFlashButton}></TouchableOpacity> */}
      </View>
      <View className="flex-1 flex-row bg-transparent">
        <TouchableOpacity
          className="mb-8 h-[60px] w-[60px] self-end rounded-full bg-[#919EAB]/70"
          style={{}}
          onPress={handlePictureButton}></TouchableOpacity>
      </View>
    </Camera>
  );
};

export default CameraUpload;
