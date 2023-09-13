import { ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import useNFTs from "../hooks/useNFTs";
import NFTcard from "./NFTcard";

const NftWalletSection = () => {
  const [personalHarvestCollection, setPersonalHarvestCollection] = useState<any>(null);
  const [personalNoodlesCollection, setPersonalNoodlesCollection] = useState<any>(null);
  const [personalRamensCollection, setPersonalRamensCollection] = useState<any>(null);
  const { getAllNFTs, getHarvestNFTs, getNoodleNFTs, getRamenNFTs } = useNFTs();

  const harvestCollection = getHarvestNFTs();
  const noodleCollection = getNoodleNFTs();
  const ramenCollection = getRamenNFTs();

  useEffect(() => {
    console.log("harvestCollection triggered");
    setTimeout(() => {
      personalHarvestCollection === null &&
        harvestCollection.then((res) => {
          res !== undefined && setPersonalHarvestCollection(res);
          console.log("res", res);
          return res;
        });
    }, 20000);
  }, [harvestCollection]);

  useEffect(() => {
    console.log("noodleCollection triggered");
    setTimeout(() => {
      personalNoodlesCollection === null &&
        noodleCollection.then((res) => {
          res !== undefined && setPersonalNoodlesCollection(res);
          console.log("res", res);
          return res;
        });
    }, 20000);
  }, [noodleCollection]);

  useEffect(() => {
    console.log("ramenCollection triggered");
    setTimeout(() => {
      personalRamensCollection === null &&
        ramenCollection.then((res) => {
          res !== undefined && setPersonalRamensCollection(res);
          console.log("res", res);
          return res;
        });
    }, 20000);
  }, [ramenCollection]);

  return (
    <>
      <View className="relative">
        <Text className="px-5 py-3 font-[Poppins-600] text-base text-[#212B36]">
          NFTs
        </Text>

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
              className="relative space-y-4 px-5">
              {personalNoodlesCollection?.ownedNfts?.map((item: any, index: number) => (
                <NFTcard
                  description={item.description}
                  key={index}
                  nft_name={item.name}
                  item={item}
                />
              ))}
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
              className="relative space-y-4 px-5">
              {personalRamensCollection?.ownedNfts?.map((item: any, index: number) => (
                <NFTcard
                  item={item}
                  key={index}
                  description={item.description}
                  nft_name={item.name}
                />
              ))}
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
              className="relative space-y-4 px-5">
              {personalHarvestCollection?.ownedNfts?.map((item: any, index: number) => (
                <NFTcard
                  item={item}
                  key={index}
                  description={item.description}
                  nft_name={item.name}
                />
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </>
  );
};

export default NftWalletSection;
