import { Text, View } from "react-native";
import { Motion } from "@legendapp/motion";
import { FontAwesome } from "@expo/vector-icons";

const spinner = () => {
  return (
    <Motion.View
      animate={{
        rotate: 360
      }}
      transition={{
        // duration: 1,
        loop: Infinity,
        stiffness: 100,
        type: "spring"
      }}>
      <FontAwesome name="spinner" size={24} color="black" />
    </Motion.View>
  );
};

export default spinner;
