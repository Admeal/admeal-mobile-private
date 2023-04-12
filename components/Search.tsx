import { useState, useEffect } from "react";
import { TextInput, View, Text, SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Search = () => {
  const [searchSubmitValue, setSearchSubmitValue] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const handleEndEditing = () => {
    setSearchSubmitValue(search);
    setSearch("");
  };

  return (
    <SafeAreaView className="relative flex-row items-center">
      <TextInput
        value={search}
        onEndEditing={handleEndEditing}
        onChange={(e) => setSearch(e.nativeEvent.text)}
        className="absolute right-1 z-10 rounded pr-4 text-right text-sm "></TextInput>
      <FontAwesome name="search" size={16} color="black" className="" />
    </SafeAreaView>
  );
};

export default Search;
