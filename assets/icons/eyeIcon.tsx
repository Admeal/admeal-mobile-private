import Svg, { SvgProps, Path } from "react-native-svg";
const EyeIcon = (props: SvgProps) => (
  <Svg width={15} height={11} fill="none" {...props}>
    <Path
      stroke="#FF1E00"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.5 5.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    />
    <Path
      stroke="#FF1E00"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1.139 5.5a6.67 6.67 0 0 1 12.723 0 6.67 6.67 0 0 1-12.723 0Z"
    />
  </Svg>
);
export default EyeIcon;
