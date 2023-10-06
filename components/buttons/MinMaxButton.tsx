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
        rotate: isMini ? `${rotateFrom}deg` : `${rotateTo}deg`
      }}
      animate={{
        rotate: isMini ? `${rotateFrom}deg` : `${rotateTo}deg`
      }}
      transition={{
        // ...transition("spring", 300, 7)
        // duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 7
      }}
      className={`absolute z-10 ${horizontalPosition} ${verticalPosition} `} //flex-row items-center justify-center pl-4
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
