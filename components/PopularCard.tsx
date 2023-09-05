import { ImageBackground, Text, TouchableOpacity } from "react-native";

import PriceTag from "./PriceTag";

const PopularCard = ({ recipe, navigation }: GroupRecipesProps) => {
  return (
    <TouchableOpacity
      className="mr-2 rounded-2xl"
      onPress={() => navigation.navigate("RecipeDetails", { recipe })}>
      <ImageBackground
        className=" h-[130px] w-[96px] flex-col justify-between rounded-2xl border border-[#919EAB] bg-black shadow-2xl"
        borderRadius={16}
        source={{
          uri: recipe.recipe_images[0],
          method: "POST"
        }}>
        <PriceTag tokenName="DISH" price={recipe.token_reward} />
        <Text className="pb-2 pl-2 font-[Poppins-400] text-xs font-bold text-white">
          {recipe.recipe_name}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default PopularCard;
