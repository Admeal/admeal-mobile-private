import { TouchableOpacity } from "react-native";

import { StackActions } from "@react-navigation/native";

import BackIcon from "../../assets/icons/backIcon";

type GoBackButtonProps = {
  color?: string;
  navigation: NavigationProp;
};

const GoBackButton = ({ navigation, color }: GoBackButtonProps) => {
  const press = () => {
    navigation.getState().routes.find((route: any) => {
      switch (route.name) {
        case "Wallet":
          return navigation.navigate("Recipes");
        case "RecipeDetails":
          return navigation.navigate("Home");
        case "CheckStatus":
          return navigation.reset({
            index: 0,
            routes: [{ name: "My Meals" }]
          });
        case "CameraUpload":
          console.log("camera upload");
          return navigation.navigate("CheckStatus");
        case "ImageVerification":
          return navigation.dispatch(StackActions.push("CameraUpload"));
        default:
          console.log("wtf is this screen", route.name);
      }
    });
  };

  return (
    <TouchableOpacity
      className="absolute left-5 top-10 h-10 w-10 flex-row items-center justify-center rounded-full bg-[#919EAB]/50 pl-3 pt-1 "
      onPress={press}>
      <BackIcon fill={color} />
    </TouchableOpacity>
  );
};

export default GoBackButton;
