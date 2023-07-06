import { View, Text } from "react-native";

type IngredientItemProps = {
  ingredient: {
    measurement_units: string;
    measurement_value: number;
    name: string;
  };
};

const IngredientsItem = ({ ingredient }: IngredientItemProps) => {
  return (
    <View className="h-12 w-full flex-row items-center justify-between border-b border-[#E0E0E0]">
      <Text className=" font-[Poppins-400] text-xs text-[#6D6D6D]">
        {ingredient.name}
      </Text>
      <Text className="font-[Poppins-500] text-xs text-[#6D6D6D]">
        {ingredient.measurement_value}
        {ingredient.measurement_units}
      </Text>
    </View>
  );
};

export default IngredientsItem;
