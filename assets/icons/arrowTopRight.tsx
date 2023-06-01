import Svg, { SvgProps, Path } from "react-native-svg";
const ArrowTopRight = (props: SvgProps) => (
  <Svg width={13} height={13} fill="none">
    <Path
      fill="#8A71ED"
      d="M13 1.05a1 1 0 0 0-1-1L4 0a1 1 0 0 0 0 2h5.56l-8.27 8.29a1 1 0 0 0 .325 1.639 1 1 0 0 0 1.095-.219L11 3.42V9a1 1 0 0 0 2 0V1.05Z"
    />
  </Svg>
);
export default ArrowTopRight;
