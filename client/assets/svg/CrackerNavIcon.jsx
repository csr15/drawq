import * as React from "react";
import Svg, { G, Path, Ellipse } from "react-native-svg";
import constants from "../../constants/constants";

function CrackerNavIcon(props) {
  let color = props.focused ? constants.light_black : constants.bottom_nav_icon;

  return (
    <Svg viewBox="0 0 30 30" width="20" height="20">
      <G transform="translate(-121 -575)">
        <Path
          d="M14.779,0A14.779,14.779,0,0,1,29.558,14.779c0,4.2-8.97-3.576-13.594,1.047s2.774,13.732-1.185,13.732A14.779,14.779,0,0,1,14.779,0Z"
          transform="translate(121 575)"
          fill={color}
        />
        <Ellipse
          class="a"
          cx="5"
          cy="4.5"
          rx="5"
          ry="4.5"
          transform="translate(136 590.326)"
          fill={color}
        />
      </G>
    </Svg>
  );
}

export default CrackerNavIcon;
