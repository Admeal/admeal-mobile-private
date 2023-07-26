import {
  BackHandler,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useLayoutEffect, useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";

import { useWalletConnectModal } from "@walletconnect/modal-react-native";

import ConnectWalletButton from "../components/buttons/ConnectWalletButton";
import GoBackButton from "../components/buttons/GoBackButton";
import NextModalButton from "../components/buttons/NextModalButton";
import ReconnectWalletButton from "../components/buttons/ReconnectWalletButton";
import RedModalButton from "../components/buttons/RedModalButton";
import XCloseButton from "../components/buttons/XCloseButton";
import NFTcard from "../components/NFTcard";

import LoadingScreen from "./LoadingScreen";

import AdmealCoinLogo from "../assets/icons/admealCoinLogo";
import AdmealLogoSmall from "../assets/icons/admealLogoSmall";
import ArrowBottom from "../assets/icons/arrowBottom";
import ArrowTopRight from "../assets/icons/arrowTopRight";
import DishCoinLogo from "../assets/icons/dishCoinLogo";
import FileIcon from "../assets/icons/fileIcon";
import GearIcon from "../assets/icons/gearIcon";

import { useRecoilState } from "recoil";
import { userCreditsState, userState } from "../atoms/dataAtom";
import firestore from "@react-native-firebase/firestore";

const Wallet = ({ navigation }: GroupMealProps) => {
  const [userCredits, setUserCredits] = useRecoilState(userCreditsState);
  const [userItem, setUserItem] = useRecoilState(userState);

  const [admealCoins, setAdmealCoins] = useState(userCredits!.admeal_token);
  const [dishCoins, setDishCoins] = useState(userCredits!.dish_token);
  const [isAccountModalVisible, setIsAccountModalVisible] = useState<boolean>(false);
  const [isDeleteAccountModalVisible, setIsDeleteAccountModalVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState<boolean>(false);

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
    if (userCredits === null || userCredits === undefined) {
      console.log("user", userCredits);
      createUser();
    } else {
      setAdmealCoins(userCredits?.admeal_token);
      setDishCoins(userCredits?.dish_token);
    }
  }, [userCredits]);

  const { isOpen, open, close, provider, isConnected, address } = useWalletConnectModal();

  const trancuateWalletAddress = () => {
    return `${address?.slice(0, 9)}...${address?.slice(-9)}`;
  };

  const copyWalletAddress = async () => {
    await Clipboard.setStringAsync("hello world");
  };

  const handleSend = () => {};

  const handleReceive = () => {};

  const openAccountModal = () => {
    setIsAccountModalVisible(!isAccountModalVisible);
  };

  console.log(provider);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View className="h-full bg-[#E0E0E0]">
      <LinearGradient
        colors={["#9F87FF", "#3A13D6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 9
            },
            shadowOpacity: 0.48,
            shadowRadius: 11.95,

            elevation: 18
          }
        ]}
        className="h-[421px] w-full rounded-b-3xl bg-blue-600">
        <View className="flex-row items-center justify-between">
          <GoBackButton navigation={navigation} color="white" />
          <View className="flex-row flex-1"></View>
          {isConnected ? <ReconnectWalletButton /> : <ConnectWalletButton />}
        </View>
        {/* // profile */}
        <View className="justify- h-[76px] w-full flex-row items-center space-x-4 p-5 pt-10">
          <Image
            className="rounded-full"
            style={{ width: 50, height: 50 }}
            source={{ uri: userItem?.additionalUserInfo.profile.picture }}
          />
          <View className="h-[50px]">
            <Text className="font-[Poppins-600] text-base font-semibold text-white">
              Hello, {userItem?.additionalUserInfo.profile.given_name}
            </Text>
            <Text className="pt-2 font-[Poppins-400] text-xs font-semibold text-white">
              {userItem?.additionalUserInfo.profile.email}
            </Text>
          </View>
        </View>
        <View className="p-5 space-y-2">
          <Text className="font-[Poppins-400] text-base font-semibold text-white">
            {isConnected ? "Wallet Address" : "Wallet not Connected"}
          </Text>
          <View className="flex-row items-center">
            <Text className="pr-2.5 font-[Poppins-400] text-xs font-semibold text-white">
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
              <Text className="font-[Poppins-700] text-[32px] font-semibold leading-[48px] text-white">
                {isConnected ? dishCoins : "0"}
              </Text>
              <Text className="font-[Poppins-700] text-xl font-semibold text-white">
                .00
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center pt-8 space-x-10">
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
            <View className="flex-col items-center justify-center pt-8">
              <TouchableOpacity
                onPress={openAccountModal}
                className=" h-[56px] w-[56px] flex-row items-center justify-center rounded-full bg-white/50">
                <GearIcon />
              </TouchableOpacity>
              <Text className="pt-2 font-[Poppins-400] text-xs text-white">Account</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <ScrollView>
        <View className="p-5">
          <Text className="pb-3 font-[Poppins-600] text-base font-semibold text-[#212B36]">
            Tokens
          </Text>
          <View className="h-[56px] flex-row items-center justify-between rounded-xl bg-white px-4">
            <DishCoinLogo size={24} scale={1} />
            <Text className="flex-1 pl-4 font-[Poppins-600] text-sm font-semibold text-[#212B36]">
              DISH
            </Text>
            <Text className="font-[Poppins-600] text-sm font-semibold text-[#212B36]">
              {dishCoins}.00
            </Text>
          </View>
          <View className="mt-2 h-[56px] flex-row items-center justify-between rounded-xl bg-white px-4">
            <AdmealCoinLogo size={24} scale={1} />
            <Text className="flex-1 pl-4 font-[Poppins-600] text-sm font-semibold text-[#212B36]">
              ADM
            </Text>
            <Text className="font-[Poppins-600] text-sm font-semibold text-[#212B36]">
              {admealCoins}.00
            </Text>
          </View>
        </View>

        <View className="relative">
          <Text className="px-5 py-3 font-[Poppins-600] text-base text-[#212B36]">
            NFTs
          </Text>
          <View className="relative flex-row flex-wrap items-center justify-between px-5 space-y-4">
            <NFTcard />
            <NFTcard />
            <NFTcard />
            <NFTcard />
          </View>
          {/* <View className="absolute top-0 flex-row items-center justify-center w-full h-full bg-slate-400/50 ">
            <Text className="font-[Poppins-600] text-3xl text-[#212B36]">
              Coming Soon...
            </Text>
          </View> */}
        </View>
      </ScrollView>

      {/* account modal */}
      <Modal animationType="fade" transparent={true} visible={isAccountModalVisible}>
        <View className="flex-col items-center justify-center h-full bg-black/30">
          <View className="relative h-[228px] w-[90%] flex-col items-center justify-around rounded-2xl bg-white px-7">
            <XCloseButton cloceProp={() => setIsAccountModalVisible(false)} />
            <AdmealLogoSmall />
            <View className="flex-col items-center justify-center w-full -mt-48 space-y-5">
              <View className="flex-row items-center justify-between w-full">
                <Text className="font-[Poppins-600] text-base font-semibold text-[#212B36]">
                  Sign out
                </Text>
                <NextModalButton
                  functionality="signOut"
                  setIsLogoutModalVisible={() => {
                    setIsLogoutModalVisible(!isLogoutModalVisible);
                    setIsAccountModalVisible(!isAccountModalVisible);
                  }}
                />
              </View>
              <View className="flex-row items-center justify-between w-full">
                <Text className="font-[Poppins-600] text-base font-semibold text-[#212B36]">
                  Delete account
                </Text>
                <NextModalButton
                  functionality="deleteAccount"
                  setIsDeleteAccountModalVisible={() => {
                    setIsDeleteAccountModalVisible(!isDeleteAccountModalVisible);
                    setIsAccountModalVisible(!isAccountModalVisible);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* logout modal */}
      <Modal animationType="fade" transparent={true} visible={isLogoutModalVisible}>
        <View className="flex-col items-center justify-center h-full bg-black/30">
          <View className="relative h-[274px] w-[90%] flex-col items-center justify-around rounded-2xl bg-white px-7">
            <XCloseButton cloceProp={() => setIsLogoutModalVisible(false)} />
            <AdmealLogoSmall />
            <View className="space-y-4 -mt-52">
              <Text className="font-[Poppins-600] text-base font-semibold text-[#1D1B20]">
                Sign out
              </Text>
              <Text className="text-start font-[Poppins-400] text-base text-[#212B36]">
                Leave the application, all data will be saved.
              </Text>
            </View>
            <RedModalButton functionality="signOut" />
          </View>
        </View>
      </Modal>

      {/* delete account modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDeleteAccountModalVisible}>
        <View className="flex-col items-center justify-center h-full bg-black/30">
          <View className="relative h-[346px] w-[90%] flex-col items-center justify-around rounded-2xl bg-white px-7">
            <XCloseButton cloceProp={() => setIsDeleteAccountModalVisible} />
            <AdmealLogoSmall />
            <View className="space-y-4 -mt-72">
              <Text className="font-[Poppins-600] text-base font-semibold text-[#1D1B20]">
                Account Deletion Request
              </Text>
              <Text className="text-start font-[Poppins-400] text-base text-[#212B36]">
                Please note that by deleting your account, all personal data associated
                with it will be permanently removed from our systems.
              </Text>
            </View>
            <RedModalButton functionality="deleteAccount" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Wallet;
