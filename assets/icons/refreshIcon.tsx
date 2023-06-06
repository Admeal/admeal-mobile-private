import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

const RefreshIcon = () => {
  return (
    <Svg fill="none" width={12} height={12}>
      <Path
        fill="white"
        d="M9.767 2.233A5.305 5.305 0 0 0 6 .667 5.326 5.326 0 0 0 .673 6 5.326 5.326 0 0 0 6 11.333c2.487 0 4.56-1.7 5.153-4H9.767A3.994 3.994 0 0 1 6 10c-2.207 0-4-1.793-4-4s1.793-4 4-4c1.107 0 2.093.46 2.813 1.187L6.667 5.333h4.666V.667L9.767 2.233Z"
      />
    </Svg>
  );
};

export default RefreshIcon;
