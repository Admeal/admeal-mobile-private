import { Text, ImageBackground, View, TouchableOpacity, Image } from "react-native";
import PriceTag from "./PriceTag";

function NFTcard({
  nft_name = "test",
  recipe_images = ["a"],
  token_reward = 40,
  description = "lorem ipsum"
}) {
  const handleItemPress = () => {};

  return (
    <TouchableOpacity className="mr-2 shadow-2xl rounded-2xl" onPress={handleItemPress}>
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
          uri: recipe_images[0]
        }}>
        <PriceTag tokenName="ADMEAL" price={token_reward} />
      </ImageBackground>
      <View className="pt-2 pb-3">
        <Text className="font-[Poppins-600] text-sm text-[#212B36]">{nft_name}</Text>
        <Text className="font-[Poppins-400] text-xs text-[#212B36]">{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default NFTcard;