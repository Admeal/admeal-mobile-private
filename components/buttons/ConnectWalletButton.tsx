import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import PlusIcon from "../../assets/icons/plusIcon";
import { Web3Modal, useWeb3Modal, Web3Button } from "@web3modal/react-native";
import { ethers } from "ethers";

const projectId = "06d916f645bb5c057ea26a1d1f6fcb60";

const providerMetadata = {
  name: "admeal-mobile",
  description: "nft-cooking",
  url: "https://your-project-website.com/",
  icons: ["https://your-project-logo.com/"]
};

const ConnectWalletButton = ({ navigation, color }: any) => {
  const { isOpen, open, close, provider, isConnected, address } = useWeb3Modal();

  return (
    <>
      <TouchableOpacity
        onPress={open}
        className="flex-row items-center pt-12 space-x-2 px-7">
        <Text className={`font-[Poppins-400] text-base ${!color && "text-white"}`}>
          Connect Wallet
        </Text>
        <PlusIcon fill={color} />
      </TouchableOpacity>
      <Web3Modal
        projectId={projectId}
        providerMetadata={providerMetadata}
        // sessionParams={}
        // key={}
        // relayUrl
      />
    </>
  );
};

export default ConnectWalletButton;