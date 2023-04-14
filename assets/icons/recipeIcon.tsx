import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const RecipeIcon = ({ size = 24, fill = "#fff", ...props }) => (
  <Svg width={size} height={size} fill="none" {...props}>
    <Path
      fill={fill}
      d="M9.5.667c.57 0 1.072.285 1.373.721l.07.112H12c.879 0 1.599.68 1.662 1.542l.005.125v10a4.167 4.167 0 0 1-3.986 4.162l-.18.004H2c-.88 0-1.6-.68-1.663-1.542l-.005-.124v-12.5c0-.879.68-1.599 1.543-1.662L2 1.5h1.056c.266-.46.746-.78 1.303-.827L4.5.667h5Zm-6.667 2.5H2v12.5h7.5a2.5 2.5 0 0 0 2.5-2.5v-10h-.833c0 .92-.746 1.666-1.667 1.666h-5c-.92 0-1.667-.746-1.667-1.666ZM7 10.667a.833.833 0 0 1 .097 1.66L7 12.334H4.5a.833.833 0 0 1-.097-1.66l.097-.006H7Zm2.5-3.334A.833.833 0 1 1 9.5 9h-5a.833.833 0 1 1 0-1.667h5Zm0-5h-5v.834h5v-.834Z"
    />
  </Svg>
);
export default RecipeIcon;
