import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type NextModalButtonProps = {
  functionality: string;
  setIsLogoutModalVisible?: () => void;
  setIsDeleteAccountModalVisible?: () => void;
};
const NextModalButton = ({
  functionality,
  setIsLogoutModalVisible,
  setIsDeleteAccountModalVisible
}: NextModalButtonProps) => {
  const handlePress = () => {
    switch (functionality) {
      case "signOut":
        setIsLogoutModalVisible!();
        break;
      case "deleteAccount":
        setIsDeleteAccountModalVisible!();
        break;
      default:
        break;
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} className="h-6 w-6">
      <AntDesign name="caretright" size={20} color="red" />
    </TouchableOpacity>
  );
};

export default NextModalButton;
