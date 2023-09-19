import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";
import { Motion } from "@legendapp/motion";
import { MotionLinearGradient } from "@legendapp/motion/linear-gradient-expo";

import { useWalletConnectModal } from "@walletconnect/modal-react-native";

import ConnectWalletButton from "../components/buttons/ConnectWalletButton";
import GoBackButton from "../components/buttons/GoBackButton";
import ReconnectWalletButton from "../components/buttons/ReconnectWalletButton";
import CustomModal from "../components/CustomModal";
import NftWalletSection from "../components/NftWalletSection";

import AdmealCoinLogo from "../assets/icons/admealCoinLogo";
import ArrowBottom from "../assets/icons/arrowBottom";
import ArrowTopRight from "../assets/icons/arrowTopRight";
import DishCoinLogo from "../assets/icons/dishCoinLogo";
import FileIcon from "../assets/icons/fileIcon";
import GearIcon from "../assets/icons/gearIcon";

import { AntDesign } from "@expo/vector-icons";

import { useRecoilState } from "recoil";
import { userCreditsState, userState } from "../atoms/dataAtom";
import firestore from "@react-native-firebase/firestore";
import blockHardBackPress from "../hooks/blockHardBackPress";

const Wallet = ({ navigation }: NavigationProp) => {
  const [userCredits, setUserCredits] = useRecoilState(userCreditsState);
  const [userItem, setUserItem] = useRecoilState(userState);

  const [admealCoins, setAdmealCoins] = useState(userCredits!.admeal_token);
  const [dishCoins, setDishCoins] = useState(userCredits!.dish_token);
  const [isAccountModalVisible, setIsAccountModalVisible] = useState<boolean>(false);
  const [isDeleteAccountModalVisible, setIsDeleteAccountModalVisible] =
    useState<boolean>(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState<boolean>(false);
  const [isMiniProfile, setIsMiniProfile] = useState<boolean>(false);

  blockHardBackPress();

  const createUser = async () => {
    const userRef = firestore()
      .collection("user_data")
      .doc(userItem?.user.uid)
      .collection("user_info");

    await userRef.doc("credits").set(
      {
        admeal_token: 0,
        dish_token: 0
      },
      { merge: false }
    );

    // dont update if user already exists
    await userRef.doc("auth").set(
      {
        admin: false,
        black_listed: false,
        created_at: firestore.FieldValue.serverTimestamp(),
        creator: false,
        device_id: "",
        email: userItem?.user.email
      },
      { merge: false }
    );
    console.log("user created");
  };

  useEffect(() => {
    if (userCredits?.admeal_token === null || userCredits?.admeal_token === undefined) {
      console.log("user", userCredits);
      createUser();
    } else {
      setAdmealCoins(userCredits?.admeal_token);
      setDishCoins(userCredits?.dish_token);
    }
  }, [userCredits]);

  const { isOpen, open, close, provider, isConnected, address } = useWalletConnectModal();
  useEffect(() => {
    address && console.log(address);
  }, [address]);

  const trancuateWalletAddress = () => {
    return `${address?.slice(0, 9)}...${address?.slice(-9)}`;
  };

  const copyWalletAddress = async () => {
    await Clipboard.setStringAsync(address?.toString()!);
    await Clipboard.getStringAsync().then((res) => {
      console.log(res);
    });
  };

  const handleSend = () => {};

  const handleReceive = () => {};

  return (
    <View className="h-full bg-[#E0E0E0]">
      <MotionLinearGradient
        initial={{ height: !isMiniProfile ? 421 : 195 }}
        animate={{ height: isMiniProfile ? 195 : 421 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400
        }}
        animateProps={{
          colors: ["#9F87FF", "#3A13D6"],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 1 }
        }}
        style={[
          {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 9
            },
            shadowOpacity: 0.48,
            shadowRadius: 11.95,

            elevation: 18,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24
          }
        ]}
        className={`w-full rounded-b-3xl `}>
        <View className="flex-row items-center justify-between">
          <GoBackButton navigation={navigation} color="white" />
          <View className="flex-1 flex-row"></View>
          {isConnected ? <ReconnectWalletButton /> : <ConnectWalletButton />}
        </View>
        {/* // profile */}
        <View className="h-[76px] w-full flex-row items-center space-x-4 p-5 pt-10">
          <Image
            className="rounded-full"
            style={{ width: 50, height: 50 }}
            source={{ uri: userItem?.additionalUserInfo.profile.picture, method: "POST" }}
          />
          <View className="h-[50px]">
            <Text className="font-[Poppins-600] text-base text-white">
              Hello, {userItem?.additionalUserInfo.profile.given_name}
            </Text>
            <Text className="pt-2 font-[Poppins-400] text-xs text-white">
              {userItem?.additionalUserInfo.profile.email}
            </Text>
          </View>
        </View>
        {!isMiniProfile && (
          <Motion.View
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 p-5">
            <Text className="font-[Poppins-400] text-base text-white">
              {isConnected ? "Wallet Address" : "Wallet not Connected"}
            </Text>
            <View className="flex-row items-center">
              <Text className="pr-2.5 font-[Poppins-400] text-xs text-white">
                {address ? trancuateWalletAddress() : ""}
              </Text>
              <TouchableOpacity onPress={copyWalletAddress}>
                {address && <FileIcon />}
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center space-x-2">
              {/* balance */}
              <DishCoinLogo size={20} scale={0.85} />
              <View className="flex-row items-baseline ">
                <Text className="font-[Poppins-700] text-[32px] leading-[48px] text-white">
                  {isConnected ? dishCoins : "0"}
                </Text>
                <Text className="font-[Poppins-700] text-xl text-white">.00</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-10 pt-2">
                {/* Buttons */}
                <View className="flex-col items-center justify-center">
                  <TouchableOpacity
                    onPress={handleSend}
                    className=" h-[56px] w-[56px] flex-row items-center justify-center rounded-full bg-black/30">
                    <ArrowTopRight />
                  </TouchableOpacity>
                  <Text className="pt-2 font-[Poppins-400] text-xs text-white/30">
                    Send
                  </Text>
                </View>
                <View className="flex-col items-center justify-center">
                  <TouchableOpacity
                    onPress={handleReceive}
                    className=" h-[56px] w-[56px] flex-row items-center justify-center rounded-full bg-black/30">
                    <ArrowBottom className="opacity-30" />
                  </TouchableOpacity>
                  <Text className="pt-2 font-[Poppins-400] text-xs text-white/30">
                    Receive
                  </Text>
                </View>
              </View>
              <View className="flex-col items-center justify-center pt-4">
                <TouchableOpacity
                  onPress={() => setIsAccountModalVisible(!isAccountModalVisible)}
                  className=" h-[56px] w-[56px] flex-row items-center justify-center rounded-full bg-white/50">
                  <GearIcon />
                </TouchableOpacity>
                <Text className="pt-2 font-[Poppins-400] text-xs text-white">
                  Account
                </Text>
              </View>
            </View>
          </Motion.View>
        )}
        <TouchableOpacity
          onPress={() => setIsMiniProfile(!isMiniProfile)}
          className={`${
            isMiniProfile ? "rotate-90" : "-rotate-90"
          } flex-row items-center justify-center pl-4`}>
          <AntDesign name="stepforward" size={24} color="#A393EB" />
        </TouchableOpacity>
      </MotionLinearGradient>
      <ScrollView>
        <View className="p-5">
          <Text className="pb-3 font-[Poppins-600] text-base text-[#212B36]">Tokens</Text>
          <View className="h-[56px] flex-row items-center justify-between rounded-xl bg-white px-4">
            <DishCoinLogo size={24} scale={1} />
            <Text className="flex-1 pl-4 font-[Poppins-600] text-sm text-[#212B36]">
              DISH
            </Text>
            <Text className="font-[Poppins-600] text-sm text-[#212B36]">
              {dishCoins}.00
            </Text>
          </View>
          <View className="mt-2 h-[56px] flex-row items-center justify-between rounded-xl bg-white px-4">
            <AdmealCoinLogo size={24} scale={1} />
            <Text className="flex-1 pl-4 font-[Poppins-600] text-sm text-[#212B36]">
              ADM
            </Text>
            <Text className="font-[Poppins-600] text-sm text-[#212B36]">
              {admealCoins}.00
            </Text>
          </View>
        </View>

        <NftWalletSection />
      </ScrollView>

      {/* account modal */}
      <CustomModal
        navigation={navigation}
        isVisible={isAccountModalVisible}
        isAccountProfileModal={true}
        close={() => setIsAccountModalVisible(false)}
        height="h-[228px]"
        setIsLogoutModalVisible={() => {
          setIsLogoutModalVisible(!isLogoutModalVisible);
          setIsAccountModalVisible(!isAccountModalVisible);
        }}
        setIsDeleteAccountModalVisible={() => {
          setIsDeleteAccountModalVisible(!isDeleteAccountModalVisible);
          setIsAccountModalVisible(!isAccountModalVisible);
        }}
      />

      {/* logout modal */}
      <CustomModal
        navigation={navigation}
        isVisible={isLogoutModalVisible}
        title="Sign out"
        desc="Leave the application, all data will be saved."
        close={() => setIsLogoutModalVisible(false)}
        buttonLogic="signOut"
        height={"h-[274px]"}
      />

      {/* delete account modal */}
      <CustomModal
        navigation={navigation}
        isVisible={isDeleteAccountModalVisible}
        title="Account Deletion Request"
        desc="Please note that by deleting your account, all personal data associated with it will be permanently removed from our systems."
        close={() => setIsDeleteAccountModalVisible(false)}
        buttonLogic="deleteAccount"
        height={"h-[346px]"}
      />
    </View>
  );
};

export default Wallet;
