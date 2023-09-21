import { Motion } from "@legendapp/motion";
import { FontAwesome } from "@expo/vector-icons";

const Spinner = () => {
  return (
    <Motion.View
      initial={{ rotate: "0deg" }}
      animate={{ rotate: "360deg" }}
      transition={{ easing: "linear", loop: 99, duration: 1000 }}>
      <FontAwesome name="spinner" size={28} color="white" />
    </Motion.View>
  );
};

export default Spinner;
