import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/dataAtom";

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
    <TouchableOpacity onPress={handlePress} className="w-6 h-6">
      <AntDesign name="caretright" size={20} color="red" />
    </TouchableOpacity>
  );
};

export default NextModalButton;
