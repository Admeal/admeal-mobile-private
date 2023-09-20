import { ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import useNFTs from "../hooks/useNFTs";
import NFTcard from "./NFTcard";

const NftWalletSection = ({ address }: any) => {
  const [personalHarvestCollection, setPersonalHarvestCollection] = useState<any>(null);
  const [personalNoodlesCollection, setPersonalNoodlesCollection] = useState<any>(null);
  const [personalRamensCollection, setPersonalRamensCollection] = useState<any>(null);

  const { getHarvestNFTs, getNoodleNFTs, getRamenNFTs } = useNFTs();

  useEffect(() => {
    address &&
      setTimeout(() => {
        console.log("harvestCollection triggered");
        getHarvestNFTs().then((res) => {
          res !== undefined &&
            res !== personalHarvestCollection &&
            setPersonalHarvestCollection(res);
          console.log("res", res);
        });
      }, 2000);
  }, [address]);

  useEffect(() => {
    address &&
      setTimeout(() => {
        console.log("noodleCollection triggered");
        getNoodleNFTs().then((res) => {
          res !== undefined &&
            res !== personalNoodlesCollection &&
            setPersonalNoodlesCollection(res);
          console.log("res", res);
        });
      }, 2000);
  }, [address]);

  useEffect(() => {
    address &&
      setTimeout(() => {
        console.log("ramenCollection triggered");
        getRamenNFTs().then((res) => {
          res !== undefined &&
            res !== personalRamensCollection &&
            setPersonalRamensCollection(res);
          console.log("res", res);
        });
      }, 2000);
  }, [address]);

  return (
    <>
      <View className="relative">
        <Text className="px-5 py-3 font-[Poppins-600] text-base text-[#212B36]">
          NFTs
        </Text>

        {!address && (
          <Text className="px-5 py-3 font-[Poppins-600] text-2xl text-[#212B36]">
            Please login to your wallet
          </Text>
        )}

        {address &&
          personalHarvestCollection?.ownedNfts?.length === 0 &&
          personalNoodlesCollection?.ownedNfts?.length === 0 &&
          personalRamensCollection?.ownedNfts?.length === 0 && (
            <Text className="px-5 py-3 font-[Poppins-600] text-2xl text-[#212B36]">
              You don't have any NFTs yet
            </Text>
          )}

        {personalNoodlesCollection?.ownedNfts?.length && (
          <>
            <View className="flex-row items-center space-x-2">
              <Text className="px-5 font-[Poppins-500] text-base text-[#212B36]">
                Noodles Collection
              </Text>
              <Text className="rounded-full bg-gray-400/90 py-1 px-2.5 font-[Poppins-300] text-xs">
                {personalNoodlesCollection?.ownedNfts?.length}
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                alignItems: "center",
                flexDirection: "row",
                flexGrow: 1
              }}
              className="relative mx-5 space-y-4 pr-4">
              {personalNoodlesCollection?.ownedNfts?.map(
                (item: NftItemProps, index: number) => (
                  <NFTcard
                    description={item.description}
                    key={index}
                    nft_name={item.name}
                    item={item}
                  />
                )
              )}
            </ScrollView>
          </>
        )}

        {personalRamensCollection?.ownedNfts?.length && (
          <>
            <View className="flex-row items-center space-x-2">
              <Text className="px-5 font-[Poppins-500] text-base text-[#212B36]">
                Ramens Collection
              </Text>
              <Text className="rounded-full bg-gray-400/90 py-1 px-2.5 font-[Poppin-300]  text-xs">
                {personalRamensCollection?.ownedNfts?.length}
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                alignItems: "center",
                flexDirection: "row",
                flexGrow: 1
              }}
              className="relative mx-5 space-y-4 pr-4">
              {personalRamensCollection?.ownedNfts?.map(
                (item: NftItemProps, index: number) => (
                  <NFTcard
                    item={item}
                    key={index}
                    description={item.description}
                    nft_name={item.name}
                  />
                )
              )}
            </ScrollView>
          </>
        )}

        {personalHarvestCollection?.ownedNfts?.length && (
          <>
            <View className="flex-row items-center space-x-2">
              <Text className="px-5 font-[Poppins-500] text-base text-[#212B36]">
                Harvest Collection
              </Text>
              <Text className="rounded-full bg-gray-400/90 py-1 px-2.5 font-[Poppins-300] text-xs">
                {personalHarvestCollection?.ownedNfts?.length}
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                alignItems: "center",
                flexDirection: "row",
                flexGrow: 1
              }}
              className="relative mx-5 space-y-4 pr-4">
              {personalHarvestCollection?.ownedNfts?.map(
                (item: NftItemProps, index: number) => (
                  <NFTcard
                    item={item}
                    key={index}
                    description={item.description}
                    nft_name={item.name}
                  />
                )
              )}
            </ScrollView>
          </>
        )}
      </View>
    </>
  );
};

export default NftWalletSection;
