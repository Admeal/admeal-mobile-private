import Svg, { Path } from "react-native-svg";

const OptionsIcon = () => (
  <Svg width={18} height={12} fill="none">
    <Path
      fill="#212B36"
      fillRule="evenodd"
      d="M0 1c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H1C.45 0 0 .45 0 1Zm8 11h2c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1Zm6-5H4c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default OptionsIcon;
