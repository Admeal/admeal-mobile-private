import Svg, { SvgProps, Path } from "react-native-svg";
const ClockIcon = ({ size = 24, fill = "#000", ...props }) => (
  <Svg width={size} height={size} fill="none" {...props}>
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M12 18.65A6.649 6.649 0 1 1 12 5.351 6.649 6.649 0 0 1 12 18.649ZM12 4a8 8 0 1 1-.002 16.002A8 8 0 0 1 12 4Zm0 2.704a.676.676 0 0 0-.676.677v4.613a.676.676 0 0 0 .197.485l3.267 3.266a.67.67 0 0 0 .955 0 .676.676 0 0 0 0-.955l-3.067-3.068V7.381A.676.676 0 0 0 12 6.704Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ClockIcon;
