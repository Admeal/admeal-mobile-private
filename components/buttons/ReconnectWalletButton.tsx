import { Text, TouchableOpacity, View } from "react-native";
import {
  IProvider,
  IProviderMetadata,
  useWalletConnectModal,
  WalletConnectModal
} from "@walletconnect/modal-react-native";

import RefreshIcon from "../../assets/icons/refreshIcon";

const projectId = "06d916f645bb5c057ea26a1d1f6fcb60";

const providerMetadata = {
  name: "admeal-mobile",
  description: "nft-cooking",
  url: "https://your-project-website.com/",
  icons: ["https://your-project-logo.com/"],
  redirect: {
    native: "yourproject://",
    universal: "https://your-project-website.com/"
  }
};

const ReconnectWalletButton = () => {
  const { address, close, isConnected, isOpen, open, provider } = useWalletConnectModal();

  return (
    <>
      <TouchableOpacity
        onPress={() => open()}
        className="flex-row items-center pt-12 space-x-2 px-7">
        <Text className={`pr-2 font-[Poppins-400] text-base text-white`}>
          Switch Wallet
        </Text>
        <RefreshIcon />
      </TouchableOpacity>
      <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
    </>
  );
};

export default ReconnectWalletButton;
