import { View, Text, TouchableOpacity } from "react-native";
import {
  WalletConnectModal,
  useWalletConnectModal
} from "@walletconnect/modal-react-native";
import RefreshIcon from "../../assets/icons/refreshIcon";

const projectId = "06d916f645bb5c057ea26a1d1f6fcb60";

const providerMetadata = {
  name: "admeal-mobile",
  description: "nft-cooking",
  url: "https://your-project-website.com/",
  icons: ["https://your-project-logo.com/"]
};

const ReconnectWalletButton = ({ navigation, color }: any) => {
  const { isOpen, open, close, provider, isConnected, address } = useWalletConnectModal();

  return (
    <>
      <TouchableOpacity
        onPress={open}
        className="flex-row items-center space-x-2 px-7 pt-12">
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
