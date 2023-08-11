import { TouchableOpacity } from "react-native";

import BackIcon from "../../assets/icons/backIcon";

type GoBackButtonProps = {
  color?: string;
  navigation: NavigationProp;
  mealId?: string;
};

const GoBackButton = ({ navigation, color, mealId }: GoBackButtonProps) => {
  const press = () => {
    navigation.getState().routes.find((route: any) => {
      switch (route.name) {
        case "CameraUpload":
          console.log("camera upload");
          return navigation.navigate("CheckStatus", { mealId });
        case "CheckStatus":
          return navigation.navigate("My Meals");
        case "ImageVerification":
          return navigation.navigate("CameraUpload", { mealId });
        case "RecipeDetails":
          return navigation.navigate("Home");
        case "Wallet":
          return navigation.navigate("Recipes");
        default:
          console.log("this screen", route.name);
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
