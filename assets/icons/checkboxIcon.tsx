import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const CheckboxIcon = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Path
      fill="#54D62C"
      fillRule="evenodd"
      d="M14.444 11.685a10 10 0 1 1 11.112 16.63 10 10 0 0 1-11.112-16.63Zm1.111 14.966a8 8 0 1 0 8.89-13.305 8 8 0 0 0-8.89 13.305Zm3.365-5.261 3.78-5h-.01a1.006 1.006 0 1 1 1.6 1.22l-4.57 6a1 1 0 0 1-1.58.01l-2.43-3.11a1.001 1.001 0 1 1 1.58-1.23l1.63 2.11Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CheckboxIcon;
