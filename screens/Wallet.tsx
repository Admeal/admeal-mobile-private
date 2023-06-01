import { View, Text, Image, ScrollView } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import useAuth from "../hooks/useAuth";
import GoBackButton from "../components/buttons/GoBackButton";
import ConnectWalletButton from "../components/buttons/ConnectWalletButton";
import DishCoinLogo from "../assets/icons/dishCoinLogo";
import AdmealCoinLogo from "../assets/icons/admealCoinLogo";
import NFTcard from "../components/NFTcard";
import ArrowTopRight from "../assets/icons/arrowTopRight";
import ArrowBottom from "../assets/icons/arrowBottom";

const Wallet = ({ navigation }: any) => {
  const [wallet, setWallet] = useState<boolean | null>(null); // [1]
  const { user } = useAuth();

  return (
    <View className="h-full bg-[#E0E0E0]">
      <LinearGradient
        colors={["#9F87FF", "#3A13D6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="h-[421px] w-full rounded-b-3xl bg-blue-600">
        <View className="flex-row items-center justify-between">
          <GoBackButton navigation={navigation} path="Home" />
          {wallet ? (
            <Text className="pr-4 pt-12 font-[Poppins-400] text-base text-white">
              Wallet Connected
            </Text>
          ) : (
            <ConnectWalletButton />
          )}
        </View>
        {/* // profile */}
        <View className="justify- h-[76px] w-full flex-row items-center space-x-4 p-5 pt-10">
          <Image
            className="rounded-full"
            style={{ width: 50, height: 50 }}
            source={{ uri: user?.picture }}
          />
          <View>
            <Text className="font-[Poppins-600] text-base font-semibold text-white">
              Hello, {user?.given_name}
            </Text>
            <Text className="font-[Poppins-400] text-xs font-semibold text-white">
              {user?.email}
            </Text>
          </View>
        </View>
        <View className="p-5 space-y-2">
          <Text className="font-[Poppins-400] text-base font-semibold text-white">
            Wallet Address
          </Text>
          <View className="flex-row items-center space-x-4">
            <Text className="font-[Poppins-400] text-xs font-semibold text-white">
              345456345...67fghjghj456m546
            </Text>
          </View>
          <View className="flex-row items-center space-x-2">
            {/* balance */}
            <DishCoinLogo size={20} scale={0.85} />
            <View className="flex-row items-baseline ">
              <Text className="font-[Poppins-700] text-[32px] font-semibold leading-[48px] text-white">
                {wallet ? "115" : "0"}
              </Text>
              <Text className="font-[Poppins-700] text-xl font-semibold text-white">
                .00
              </Text>
            </View>
          </View>
          <View className="flex-row items-center pt-8 space-x-10">
            <View className="flex-col items-center justify-center">
              <View className=" h-[56px] w-[56px] flex-row items-center justify-center rounded-full bg-black/30">
                <ArrowTopRight />
              </View>
              <Text className="pt-2 font-[Poppins-400] text-xs text-white/30">Send</Text>
            </View>
            <View className="flex-col items-center justify-center">
              <View className=" h-[56px] w-[56px] flex-row items-center justify-center rounded-full bg-black/30">
                <ArrowBottom className="opacity-30" />
              </View>
              <Text className="pt-2 font-[Poppins-400] text-xs text-white/30">
                Receive
              </Text>
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
              115.00
            </Text>
          </View>
          <View className="mt-2 h-[56px] flex-row items-center justify-between rounded-xl bg-white px-4">
            <AdmealCoinLogo size={24} scale={1} />
            <Text className="flex-1 pl-4 font-[Poppins-600] text-sm font-semibold text-[#212B36]">
              ADM
            </Text>
            <Text className="font-[Poppins-600] text-sm font-semibold text-[#212B36]">
              0.00
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
          <View className="absolute top-0 flex-row items-center justify-center w-full h-full bg-slate-400/50 ">
            <Text className="font-[Poppins-600] text-3xl text-[#212B36]">
              Coming Soon...
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Wallet;
