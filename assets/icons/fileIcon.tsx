import Svg, { Path } from "react-native-svg";
const FileIcon = () => (
  <Svg width={16} height={16} fill="none">
    <Path
      fill="#fff"
      d="M6.528 12.5a2.364 2.364 0 0 1-2.361-2.361V4.444h-.972c-.843 0-1.528.685-1.528 1.528v7.5A1.53 1.53 0 0 0 3.195 15h6.944a1.53 1.53 0 0 0 1.528-1.528V12.5H6.528Z"
      opacity={0.48}
    />
    <Path
      fill="#fff"
      d="M13.889 2.63c0-.9-.684-1.63-1.528-1.63H6.528C5.684 1 5 1.73 5 2.63v7.407c0 .9.684 1.63 1.528 1.63h5.833c.844 0 1.528-.73 1.528-1.63V2.63Z"
    />
  </Svg>
);
export default FileIcon;
