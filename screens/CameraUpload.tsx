import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
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
      const data = await camera.takePictureAsync(null);
      if (!isIngredientsSumbitted) {
        setIngredientsImage(data.uri);
      } else {
        setDishImage(data.uri);
      }
      navigation.navigate("ImageVerification", { navigation });
    }
  };

  const handlePictureButton = () => {
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
      flashMode={Camera.Constants.FlashMode.off}
      className="flex-col items-center justify-center flex-1"
      type={type}
      ref={(ref) => {
        setCamera(ref);
      }}>
      <View className="flex-row items-center self-start justify-between w-full">
        <GoBackButton navigation={navigation} color="black" />
        {/* flash button
        <TouchableOpacity
          className="mr-8 h-[25px] w-[25px] self-end rounded-full bg-[#919EAB]/70"
          style={{}}
          onPress={handlePictureButton}></TouchableOpacity> */}
      </View>
      <View className="flex-row flex-1 bg-transparent">
        <TouchableOpacity
          className="mb-8 h-[60px] w-[60px] self-end rounded-full bg-[#919EAB]/70"
          style={{}}
          onPress={handlePictureButton}></TouchableOpacity>
      </View>
    </Camera>
  );
};

export default CameraUpload;