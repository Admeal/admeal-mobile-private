import { View, Text, Modal } from "react-native";
import AdmealLogoSmall from "../assets/icons/admealLogoSmall";
import NextModalButton from "./buttons/NextModalButton";
import RedModalButton from "./buttons/RedModalButton";
import XCloseButton from "./buttons/XCloseButton";

type CustomModalProps = {
  close: () => void;
  isVisible: boolean;
  navigation: NavigationProp;
  title?: string;
  desc?: string;
  buttonLogic?: string;
  height: string;
  isAccountProfileModal?: boolean;
  setIsLogoutModalVisible?: () => void;
  setIsDeleteAccountModalVisible?: () => void;
};

const CustomModal = ({
  close,
  isVisible,
  navigation,
  title,
  desc,
  buttonLogic,
  height,
  isAccountProfileModal,
  setIsLogoutModalVisible,
  setIsDeleteAccountModalVisible
}: CustomModalProps) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View className="flex-col items-center justify-center h-full bg-black/30">
        <View
          className={`${height} relative w-[90%] flex-col items-center justify-around rounded-2xl bg-white px-7`}>
          {buttonLogic !== "limit" && <XCloseButton cloceProp={() => close()} />}
          <AdmealLogoSmall />
          {!isAccountProfileModal ? (
            <>
              <View className={`space-y-4 ${title === "Sign out" ? "-mt-52" : "-mt-72"}`}>
                <Text className="font-[Poppins-600] text-base font-semibold text-[#1D1B20]">
                  {title}
                </Text>
                <Text className="text-start font-[Poppins-400] text-base text-[#212B36]">
                  {desc}
                </Text>
              </View>
              <RedModalButton navigation={navigation} functionality={buttonLogic!} />
            </>
          ) : (
            <View className="flex-col items-center justify-center w-full -mt-48 space-y-5">
              <View className="flex-row items-center justify-between w-full">
                <Text className="font-[Poppins-600] text-base font-semibold text-[#212B36]">
                  Sign out
                </Text>
                <NextModalButton
                  functionality="signOut"
                  setIsLogoutModalVisible={setIsLogoutModalVisible}
                />
              </View>
              <View className="flex-row items-center justify-between w-full">
                <Text className="font-[Poppins-600] text-base font-semibold text-[#212B36]">
                  Delete account
                </Text>
                <NextModalButton
                  functionality="deleteAccount"
                  setIsDeleteAccountModalVisible={setIsDeleteAccountModalVisible}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
