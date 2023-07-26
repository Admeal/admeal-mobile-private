import { useState, useEffect } from "react";
import { TextInput, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [searchSubmitValue, setSearchSubmitValue] = useState<string>("");

  const handleEndEditing = () => {
    setSearchSubmitValue(search);
    setSearch("");
  };

  return (
    <View className="relative flex-row items-center">
      <TextInput
        value={search}
        onEndEditing={handleEndEditing}
        onChange={(e) => setSearch(e.nativeEvent.text)}
        className="absolute z-10 pr-4 text-sm text-right rounded right-1 "></TextInput>
      <FontAwesome name="search" size={16} color="black" className="" />
    </View>
  );
};

export default Search;
