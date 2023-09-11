import {
  BackHandler,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { Motion } from "@legendapp/motion";
import { MotionLinearGradient } from "@legendapp/motion/linear-gradient-expo";

import { useWalletConnectModal } from "@walletconnect/modal-react-native";

import ConnectWalletButton from "../components/buttons/ConnectWalletButton";
import GoBackButton from "../components/buttons/GoBackButton";
import ReconnectWalletButton from "../components/buttons/ReconnectWalletButton";
import NFTcard from "../components/NFTcard";
import CustomModal from "../components/CustomModal";

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

import useNFTs from "../hooks/useNFTs";

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
  const [isfetchNfts, setIsfetchNfts] = useState<boolean>(false);
  const [personalHarvestCollection, setPersonalHarvestCollection] = useState<any>(null);
  const [personalNoodlesCollection, setPersonalNoodlesCollection] = useState<any>(null);
  const [personalRamensCollection, setPersonalRamensCollection] = useState<any>(null);

  const contractLoadingData = { _h: 0, _i: 0, _j: null, _k: null };

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
  const { getAllNFTs, getHarvestNFTs, getNoodleNFTs, getRamenNFTs } = useNFTs();

  const harvestCollection = getHarvestNFTs();
  const noodleCollection = getNoodleNFTs();
  const ramenCollection = getRamenNFTs();

  useEffect(() => {
    harvestCollection.then((res) => {
      personalHarvestCollection === null && setPersonalHarvestCollection(res);
      console.log("res", res);
      return res;
    });
  }, [harvestCollection]);

  useEffect(() => {
    noodleCollection.then((res) => {
      personalNoodlesCollection === null && setPersonalNoodlesCollection(res);
      console.log("res", res);
      return res;
    });
  }, [noodleCollection]);

  useEffect(() => {
    ramenCollection.then((res) => {
      personalRamensCollection === null && setPersonalRamensCollection(res);
      console.log("res", res);
      return res;
    });
  }, [ramenCollection]);

  // console.log("harvest", harvestCollection);
  // console.log("noodle", noodleCollection);
  // console.log("ramen", ramenCollection);

  // useEffect(() => {
  //   if (harvestCollection !== undefined && personalHarvestCollection?.length === 0) {
  //     harvestCollection &&
  //       harvestCollection?.ownedNfts?.length &&
  //       setPersonalHarvestCollection(harvestCollection?.ownedNfts);
  //   }
  //   console.log("harvest", harvestCollection);
  // }, [harvestCollection]);

  // useEffect(() => {
  //   if (noodleCollection !== undefined && personalNoodlesCollection?.length === 0) {
  //     noodleCollection &&
  //       noodleCollection?.ownedNfts?.length &&
  //       setPersonalNoodlesCollection(noodleCollection?.ownedNfts);
  //   }
  //   console.log("noodle", noodleCollection);
  // }, [noodleCollection]);

  // useEffect(() => {
  //   if (ramenCollection !== undefined && personalRamensCollection?.length === 0) {
  //     ramenCollection &&
  //       ramenCollection?.ownedNfts?.length &&
  //       setPersonalRamensCollection(ramenCollection?.ownedNfts);
  //   }
  //   console.log("ramen", ramenCollection);
  // }, [ramenCollection]);

  // harvestCollection?.then((res) => {
  //   if (res.ownedNfts?.length && !personalHarvestCollection?.ownedNfts.length) {
  //     setPersonalHarvestCollection(res.ownedNfts);
  //     console.log("harvest", res);
  //   }
  // });

  // noodleCollection?.then((res) => {
  //   if (res.ownedNfts?.length && !personalNoodlesCollection?.ownedNfts.length) {
  //     setPersonalNoodlesCollection(res.ownedNfts);
  //     console.log("noodle", res);
  //   }
  // });

  // ramenCollection?.then((res) => {
  //   if (res.ownedNfts?.length && !personalRamensCollection?.ownedNfts.length) {
  //     setPersonalRamensCollection(res.ownedNfts);
  //     console.log("ramen", res);
  //   }
  // });

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
            <Text className="font-[Poppins-600] text-base font-semibold text-white">
              Hello, {userItem?.additionalUserInfo.profile.given_name}
            </Text>
            <Text className="pt-2 font-[Poppins-400] text-xs font-semibold text-white">
              {userItem?.additionalUserInfo.profile.email}
            </Text>
          </View>
        </View>
        {!isMiniProfile && (
          <Motion.View
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 p-5">
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
          <View className="relative flex-row flex-wrap items-center justify-between space-y-4 px-5">
            <Text>{personalNoodlesCollection?.ownedNfts?.length} Noodles</Text>
            {personalNoodlesCollection?.ownedNfts?.map((item: any, index: number) => (
              <NFTcard key={index} description={item.description} nft_name={item.name} />
            ))}

            <Text>{personalRamensCollection?.ownedNfts?.length} Ramens</Text>

            {personalRamensCollection?.ownedNfts?.map((item: any, index: number) => (
              <NFTcard key={index} description={item.description} nft_name={item.name} />
            ))}

            <Text>{personalHarvestCollection?.ownedNfts?.length} Harvest</Text>
            {personalHarvestCollection?.ownedNfts?.map((item: any, index: number) => (
              <NFTcard key={index} description={item.description} nft_name={item.name} />
            ))}

            <NFTcard />
            <NFTcard />
            <NFTcard />
          </View>
        </View>
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
