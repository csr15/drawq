import * as React from "react";
import Svg, { G, Circle } from "react-native-svg";
import constants from "../../constants/constants";

function ReplacerNavIcon(props) {
  let color = props.focused ? constants.light_black : constants.bottom_nav_icon;

  return (
    <Svg viewBox="0 0 30 30" width="20" height="20" fill={color}>
      <G transform="translate(-195.326 -629.326)">
        <Circle
          class="a"
          cx="4"
          cy="4"
          r="4"
          transform="translate(195.326 629.326)"
        />
        <Circle
          class="a"
          cx="4"
          cy="4"
          r="4"
          transform="translate(205.326 629.326)"
        />
        <Circle
          class="a"
          cx="4"
          cy="4"
          r="4"
          transform="translate(205.326 639.326)"
        />
        <Circle
          class="a"
          cx="4"
          cy="4"
          r="4"
          transform="translate(215.326 639.326)"
        />
        <Circle
          class="a"
          cx="4"
          cy="4"
          r="4"
          transform="translate(215.326 629.326)"
        />
        <Circle
          class="a"
          cx="4"
          cy="4"
          r="4"
          transform="translate(195.326 639.326)"
        />
        <Circle
          class="a"
          cx="4"
          cy="4"
          r="4"
          transform="translate(195.326 649.326)"
        />
        <Circle
          class="a"
          cx="4"
          cy="4"
          r="4"
          transform="translate(205.326 649.326)"
        />
        <Circle
          class="a"
          cx="4"
          cy="4"
          r="4"
          transform="translate(215.326 649.326)"
        />
      </G>
    </Svg>
  );
}

export default ReplacerNavIcon;
