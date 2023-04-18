import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const back = ({ size = 24, fill = "#fff", ...props }) => (
  <Svg width={size} height={size} fill="none" {...props}>
    <Path
      fill={fill}
      d="M8.535.515.05 9l8.485 8.485 1.415-1.414L2.878 9 9.95 1.929 8.535.515Z"
    />
  </Svg>
);
export default back;
