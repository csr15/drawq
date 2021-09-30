import * as React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

import constants from "../../../constants/constants";

function Triangle(props) {
  return (
      <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 73 63"
        fill={props.color ? props.color : "#06d6a0"}
        >
        <Path d="M32.174,7.467a5,5,0,0,1,8.653,0L68.651,55.493A5,5,0,0,1,64.325,63H8.675a5,5,0,0,1-4.326-7.507Z" />
      </Svg>
  );
}

export default Triangle;
