import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";

import { useRecoilState } from "recoil";
import { userState } from "../../atoms/dataAtom";

import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

type RedModalButtonProps = {
  functionality: string;
};

const RedModalButton = ({ functionality }: RedModalButtonProps) => {
  const [userItem, setUserItem] = useRecoilState(userState);

  const handleDisconnect = () => {
    setUserItem(null);
  };

  const handleDeleteAccount = () => {
    firestore()
      .collection("user_data")
      .doc(userItem?.user.uid)
      .delete()
      .then(() => {
        console.log("User deleted!");
      });
    storage().ref(`user_photos/${userItem?.user.uid}`).delete();

    setUserItem(null);
  };

  const handlePress = () => {
    switch (functionality) {
      case "signOut":
        handleDisconnect();
        break;
      case "deleteAccount":
        handleDeleteAccount();
        break;
      default:
        break;
    }
  };
  const handleButtonText = () => {
    switch (functionality) {
      case "signOut":
        return "EXIT";
      case "deleteAccount":
        return "DELETION";
      default:
        break;
    }
  };
  return (
    <TouchableOpacity
      className="mb-4 h-12 w-[70%] flex-col items-center justify-center rounded-full bg-[#FF1E00]"
      onPress={handlePress}>
      <Text className="font-[Poppins-700] text-white">{handleButtonText()}</Text>
    </TouchableOpacity>
  );
};

export default RedModalButton;