import Svg, { Rect, Path } from "react-native-svg";

const BackArrowIcon = () => (
  <Svg fill="none">
    <Rect width={24} height={24} fill="#919EAB" fillOpacity={0.24} rx={12} />
    <Path
      fill="#fff"
      d="M8.923 12c0 .225.079.416.242.588l4.72 5.04a.63.63 0 0 0 .49.218c.393 0 .702-.33.702-.766a.806.806 0 0 0-.212-.548L10.61 12l4.254-4.532a.835.835 0 0 0 .212-.555c0-.429-.309-.76-.702-.76a.63.63 0 0 0-.49.219l-4.72 5.04a.845.845 0 0 0-.242.588Z"
    />
  </Svg>
);
export default BackArrowIcon;
