import * as React from "react";
import Svg, { Rect } from "react-native-svg";

import constants from "../../../constants/constants";

function Square(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0  64 64"
      fill={props.color ? props.color : "#ffba08"}
    >
      <Rect class="a" width="64" height="64" rx="10" />
    </Svg>
  );
}

export default Square;
