import Svg, { SvgProps, Path } from "react-native-svg";
const ArrowBottom = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none">
    <Path fill="#8A71ED" d="m16 8-1.41-1.41L9 12.17V0H7v12.17L1.42 6.58 0 8l8 8 8-8Z" />
  </Svg>
);
export default ArrowBottom;
