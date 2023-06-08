import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const CookCountIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none">
    <Path
      stroke="#949494"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
      d="M1 7.192h14M5.9 2.468v2.473m3.5-3.297V4.94m3.5-2.473v2.473m1.4 7.453V7.192H4.5v5.202c0 .655.221 1.284.615 1.748.394.464.928.724 1.485.724h5.6c.557 0 1.091-.26 1.485-.724.394-.464.615-1.093.615-1.748Z"
    />
  </Svg>
);
export default CookCountIcon;
