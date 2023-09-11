import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import PriceTag from "./PriceTag";
import { useRef, useState } from "react";

function NFTcard({ description = "lorem ipsum", nft_name = "test", token_reward = 40 }) {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  const handleItemPress = () => {};

  const getMedia = () => {
    switch (nft_name) {
      case "test":
        return (
          <ImageBackground
            style={[
              {
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 5
                },
                shadowOpacity: 0.36,
                shadowRadius: 5.68,

                elevation: 11
              }
            ]}
            className=" h-[42vw] w-[42vw] flex-col justify-between rounded-2xl border border-[#919EAB] bg-black shadow-2xl"
            borderRadius={16}
            source={{
              uri: "https://picsum.photos/200/300",
              method: "POST"
            }}>
            <PriceTag tokenName="ADMEAL" price={token_reward} />
          </ImageBackground>
        );
      case "Noodle NFT":
        return (
          <Video
            ref={video}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/admeal-firebase.appspot.com/o/nft_media%2Fnoodle_nft.mp4?alt=media&token=35c08850-1a2b-42cd-bccb-44dc371d1b5f"
            }}
            className=" h-[42vw] w-[42vw] flex-col justify-between rounded-2xl border border-[#919EAB] bg-black shadow-2xl"
            usePoster={true}
            resizeMode={ResizeMode.COVER}
            isLooping
          />
        );
      case "ARNFT":
        return "https://picsum.photos/200/300";
      case "Admeal Romanesco":
        return "https://picsum.photos/200/300";
      default:
        return "https://picsum.photos/200/300";
    }
  };

  return (
    <TouchableOpacity className="mr-2 rounded-2xl shadow-2xl" onPress={handleItemPress}>
      <View className="pt-2 pb-3">
        <Text className="font-[Poppins-600] text-sm text-[#212B36]">{nft_name}</Text>
        <Text className="truncate font-[Poppins-400] text-xs text-[#212B36]">
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default NFTcard;
