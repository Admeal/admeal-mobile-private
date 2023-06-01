import Svg, { SvgProps, Path, G, Circle, Defs, ClipPath } from "react-native-svg";

const AdmealCoinLogo = ({ size = 16, scale = 1 }) => (
  <Svg width={size} height={size} fill="none">
    <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="#5C33FF" />
    <Path
      scale={scale}
      fill="#fff"
      fillRule="evenodd"
      d="M16.377 4.523v6.178h-.552.552v9.165a.916.916 0 1 1-1.833 0V10.7h.916-.916V6.379c-3.352.174-4.736 1.299-5.33 2.197a3.334 3.334 0 0 0-.551 1.876 1.868 1.868 0 0 0 .007.129l.008.056v5.93a.916.916 0 1 1-1.833 0V10.75a2.992 2.992 0 0 1-.015-.253 5.168 5.168 0 0 1 .854-2.933C8.78 5.91 11.053 4.523 15.46 4.523h.917Z"
      clipRule="evenodd"
    />
    <Path
      scale={scale}
      fill="#fff"
      fillRule="evenodd"
      d="M5.196 11.251c0-.506.41-.916.917-.916H17.11a.916.916 0 0 1 0 1.832H6.113a.917.917 0 0 1-.917-.916ZM5.205 13.689a.916.916 0 0 1 .925-.907l10.998.11a.916.916 0 1 1-.018 1.833l-10.998-.11a.917.917 0 0 1-.907-.926Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default AdmealCoinLogo;
