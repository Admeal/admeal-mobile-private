import Svg, { SvgProps, Path } from "react-native-svg";

const PlusIcon = ({ size = 24, fill = "white", ...props }) => (
  <Svg width={16} height={17} fill="none" {...props}>
    <Path
      fill={fill}
      d="M15 7.5H9v-6a1 1 0 1 0-2 0v6H1a1 1 0 0 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2Z"
    />
  </Svg>
);
export default PlusIcon;
