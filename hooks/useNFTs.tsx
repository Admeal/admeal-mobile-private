import { useWalletConnectModal } from "@walletconnect/modal-react-native";

const useNFTs = () => {
  const { address } = useWalletConnectModal();

  const NOODLE_CONTRACT_ADDRESS = "0x1155b9F38BeB4fc275A22aE62DE984042A7aB1c9";
  const RAMEN_CONTRACT_ADDRESS = "0xa5740a8c6fd47eb6c2c17c3907b96272906689b4";
  const HARVEST_CONTRACT_ADDRESS = "0x2468472705be500fb9c184aa3284cc6b6e10f0cb";

  const getNFTs = async (contractAddresses: string[]) => {
    if (!address) return;
    const contractQuery =
      contractAddresses.length === 0
        ? ""
        : "&contractAddresses[]=" + contractAddresses.join("&contractAddresses[]=");
    const apiUrl = `https://polygon-mainnet.g.alchemy.com/nft/v3/1PiwpV2RG510eUggd7L8Rp_ZFiSzQsjL/getNFTsForOwner?owner=${address}${contractQuery}&withMetadata=true&pageSize=100`;
    try {
      const result = await fetch(apiUrl, {
        method: "GET",
        headers: { accept: "application/json" }
      });
      const response = await result.json();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllNFTs = async () => {
    return await getNFTs([
      NOODLE_CONTRACT_ADDRESS,
      RAMEN_CONTRACT_ADDRESS,
      HARVEST_CONTRACT_ADDRESS
    ]);
  };

  const getNoodleNFTs = async () => {
    return await getNFTs([NOODLE_CONTRACT_ADDRESS]);
  };

  const getRamenNFTs = async () => {
    return await getNFTs([RAMEN_CONTRACT_ADDRESS]);
  };

  const getHarvestNFTs = async () => {
    return await getNFTs([HARVEST_CONTRACT_ADDRESS]);
  };

  return {
    getAllNFTs,
    getNoodleNFTs,
    getRamenNFTs,
    getHarvestNFTs
  };
};

export default useNFTs;
