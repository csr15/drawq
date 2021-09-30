import * as React from "react";
import Svg, {  Path } from "react-native-svg";

import constants from "../../../constants/constants";

function Polygon(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 174.5 166.568"
      fill={props.color ? props.color : constants.primary}
    >
      <Path d="M81.358,4.3a10,10,0,0,1,11.784,0l75.505,55.059a10,10,0,0,1,3.622,11.16l-28.855,89.133a10,10,0,0,1-9.514,6.92H40.6a10,10,0,0,1-9.514-6.92L2.231,70.515a10,10,0,0,1,3.622-11.16Z" />
    </Svg>
  );
}

export default Polygon;
