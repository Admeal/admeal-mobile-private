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
  rotateFrom?: number;
  rotateTo?: number;
};

const MinMaxButton = ({
  color = "#A393EB",
  horizontalPosition,
  isMini,
  rotateFrom = 90,
  rotateTo = 270,
  setIsMini,
  verticalPosition
}: MinMaxButtonProps) => {
  return (
    <Motion.View
      initial={{
        rotate: isMini ? `${rotateFrom}deg` : `${rotateFrom}deg`
      }}
      animate={{
        rotate: isMini ? `${rotateFrom}deg` : `${rotateFrom}deg`
      }}
      transition={transition("spring", 25, 400)}
      className={`absolute ${horizontalPosition} ${verticalPosition} `} //flex-row items-center justify-center pl-4
    >
      <TouchableOpacity
        className="flex-row items-center justify-center w-10 h-10 rounded-full"
        onPress={() => setIsMini(!isMini)}>
        <AntDesign name="stepforward" size={24} color={color} />
      </TouchableOpacity>
    </Motion.View>
  );
};

export default MinMaxButton;
