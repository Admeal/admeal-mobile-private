import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import PriceTag from "./PriceTag";
import { useRef } from "react";

function NFTcard({
  description = "lorem ipsum",
  nft_name = "test",
  token_reward = 40,
  item = {}
}) {
  const video = useRef(null);

  const handleItemPress = () => {};

  const stringContains = (substring: string) => {
    return nft_name.indexOf(substring) > -1;
  };

  const getNftMediaUri = () => {
    if (stringContains("Noodle NFT")) {
      return "https://firebasestorage.googleapis.com/v0/b/admeal-firebase.appspot.com/o/nft_media%2Fnoodle_nft.mp4?alt=media&token=35c08850-1a2b-42cd-bccb-44dc371d1b5f";
    }

    if (stringContains("ARNFT")) {
      return "https://firebasestorage.googleapis.com/v0/b/admeal-firebase.appspot.com/o/nft_media%2Framen_nft_2160px_1.mp4?alt=media&token=66f3d122-cbbd-4ae3-a005-c8f41e33de3f";
    }

    if (stringContains("Romanesco")) {
      return "https://firebasestorage.googleapis.com/v0/b/admeal-firebase.appspot.com/o/nft_media%2Fharvest_romanesco_725.png?alt=media&token=8eb64d39-79b5-417e-9f08-62a34754dfb6";
    }

    return "https://firebasestorage.googleapis.com/v0/b/admeal-firebase.appspot.com/o/nft_media%2Fnoodle_nft.mp4?alt=media&token=35c08850-1a2b-42cd-bccb-44dc371d1b5f";
  };

  const getTypeOfMedia = () => {
    if (stringContains("Noodle NFT") || stringContains("ARNFT")) {
      return (
        <Video
          ref={video}
          source={{
            uri: getNftMediaUri()
          }}
          className=" h-[42vw] w-[42vw] flex-col justify-between rounded-2xl border border-[#919EAB] bg-black shadow-2xl"
          resizeMode={ResizeMode.COVER}
          isLooping={true}
          shouldPlay={true}
        />
      );
    }

    if (stringContains("Romanesco")) {
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
            uri: getNftMediaUri(),
            method: "POST"
          }}></ImageBackground>
      );
    }
  };

  return (
    <TouchableOpacity className="mr-2 rounded-2xl shadow-2xl" onPress={handleItemPress}>
      <View className="py-3 ">
        {getTypeOfMedia()}

        <Text className="pt-1 font-[Poppins-600] text-sm text-[#212B36]">{nft_name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default NFTcard;
