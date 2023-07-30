import { View, Text, TouchableOpacity } from "react-native";
import {
  WalletConnectModal,
  useWalletConnectModal,
  IProviderMetadata,
  IProvider
} from "@walletconnect/modal-react-native";
import RefreshIcon from "../../assets/icons/refreshIcon";

const projectId = "06d916f645bb5c057ea26a1d1f6fcb60";

const providerMetadata: IProviderMetadata = {
  name: "admeal-mobile",
  description: "nft-cooking",
  url: "https://your-project-website.com/",
  icons: ["https://your-project-logo.com/"],
  redirect: {
    native: "yourproject://",
    universal: "https://your-project-website.com/"
  }
};

const ReconnectWalletButton = ({ navigation, color }: any) => {
  const { isOpen, open, close, provider, isConnected, address } = useWalletConnectModal();

  const handleReconnect = () => {
    // isConnected && close();
    console.log("isConnected", isConnected);
    setTimeout(() => {
      open();
    }, 100);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => open()}
        className="flex-row items-center pt-12 space-x-2 px-7">
        <Text className={`pr-2 font-[Poppins-400] text-base ${!color && "text-white"}`}>
          Switch Wallet
        </Text>
        <RefreshIcon />
      </TouchableOpacity>
      <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
    </>
  );
};

export default ReconnectWalletButton;
