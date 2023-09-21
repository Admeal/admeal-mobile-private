import { TouchableOpacity } from "react-native-gesture-handler";
import { Motion } from "@legendapp/motion";

import transition from "../../hooks/transitionAnimation";

import { AntDesign } from "@expo/vector-icons";

type MinMaxButtonProps = {
  color?: string;
  isMini: boolean;
  setIsMini: (isMini: boolean) => void;
  verticalPosition: string;
  horizontalPosition: string;
  rotateFrom?: string;
  rotateTo?: string;
};

const MinMaxButton = ({
  color = "#A393EB",
  horizontalPosition,
  isMini,
  rotateFrom = "90deg",
  rotateTo = "270deg",
  setIsMini,
  verticalPosition
}: MinMaxButtonProps) => {
  return (
    <Motion.View
      initial={{
        rotate: isMini ? rotateFrom : rotateTo
      }}
      animate={{
        rotate: isMini ? rotateFrom : rotateTo
      }}
      transition={transition("spring", 25, 400)}
      className={`absolute ${horizontalPosition} ${verticalPosition} `} //flex-row items-center justify-center pl-4
    >
      <TouchableOpacity
        className="h-10 w-10 flex-row items-center justify-center rounded-full"
        onPress={() => setIsMini(!isMini)}>
        <AntDesign name="stepforward" size={24} color={color} />
      </TouchableOpacity>
    </Motion.View>
  );
};

export default MinMaxButton;
