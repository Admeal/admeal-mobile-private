import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const MealsIcon = ({ size = 24, fill = "#8491A5", ...props }) => (
  <Svg width={size} height={size} fill="none" {...props}>
    <Path
      fill={fill}
      d="M11.333.5c.46 0 .834.373.834.833v.834h1.666c.92 0 1.667.746 1.667 1.666v10c0 .92-.746 1.667-1.667 1.667H2.167C1.247 15.5.5 14.754.5 13.833v-10c0-.92.746-1.666 1.667-1.666h1.666v-.834a.833.833 0 0 1 1.667 0v.834h5v-.834c0-.46.373-.833.833-.833Zm2.5 3.333H2.167v10h11.666v-10Zm-3.48 1.983a.833.833 0 0 1 1.179 1.178l-4.119 4.119a.842.842 0 0 1-1.19 0L4.46 9.351a.833.833 0 0 1 1.178-1.178L6.818 9.35l3.535-3.535Z"
    />
  </Svg>
);
export default MealsIcon;
