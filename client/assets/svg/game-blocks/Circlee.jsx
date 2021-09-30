import * as React from "react";
import Svg, { Circle } from "react-native-svg";

import constants from "../../../constants/constants";

function Circlee(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 63 63"
      fill={props.color ? props.color : "#4361ee"}
    >
      <Circle class="a" cx="31.5" cy="31.5" r="31.5" />
    </Svg>
  );
}

export default Circlee;
