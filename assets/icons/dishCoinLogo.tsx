import Svg, { SvgProps, Path, G, Circle, Defs, ClipPath } from "react-native-svg";

const DishCoinLogo = ({ size = 16, scale = 1 }) => (
  // if defaule size is 16 then scale is 1 if 20 then 1.35

  <Svg width={size} height={size} fill="none">
    <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="#FF1E00" />
    <Path
      scale={scale}
      fill="#fff"
      fillRule="evenodd"
      d="M5.144 10.855c0-.465.377-.842.842-.842h6.401a.842.842 0 0 1 0 1.685H5.986a.842.842 0 0 1-.842-.843ZM6.83 13.55c0-.465.298-.842.666-.842h5.067c.369 0 .667.377.667.843 0 .465-.298.842-.667.842H7.496c-.368 0-.667-.377-.667-.842Z"
      clipRule="evenodd"
    />
    <Path
      scale={scale}
      fill="#fff"
      fillRule="evenodd"
      d="M10.873 15.404H9.188v4.716h.843c3.75 0 5.797-1.296 6.87-2.762a5.558 5.558 0 0 0 .913-1.96 4.991 4.991 0 0 0 .131-.86l.003-.061v-.033l-.82-.001h.82V9.964h-.82l.82-.001V9.93c0-.017 0-.038-.002-.063a4.992 4.992 0 0 0-.132-.86 5.557 5.557 0 0 0-.912-1.96c-1.073-1.466-3.12-2.762-6.871-2.762h-.843v4.717h1.685V5.996c2.74.172 4.035 1.18 4.67 2.047.362.497.544.993.635 1.365a3.307 3.307 0 0 1 .085.543l.001.018v4.468l-.001.02-.009.106c-.01.1-.032.25-.077.436-.09.371-.272.868-.635 1.364-.634.867-1.929 1.875-4.669 2.047v-3.006Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default DishCoinLogo;
