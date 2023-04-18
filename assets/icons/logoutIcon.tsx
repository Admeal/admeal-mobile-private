import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const LogoutIcon = ({ size = 24, stroke = "#8491A5", ...props }) => (
  <Svg width={size} height={size} fill="none" {...props}>
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeWidth={2}
      d="m15.535 4.618-.385.898.385-.898-4.747-2.035a2 2 0 0 0-1.576 0L4.464 4.618a2 2 0 0 0-1.196 2.086l.446 3.57a7 7 0 0 0 2.465 4.51l2.54 2.117a2 2 0 0 0 2.561 0l2.541-2.117a7 7 0 0 0 2.465-4.51l.446-3.57a2 2 0 0 0-1.197-2.086Z"
    />
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeWidth={2}
      d="m7.5 10 2.069 2.069a.5.5 0 0 0 .77-.077L13.334 7.5"
    />
  </Svg>
);
export default LogoutIcon;
