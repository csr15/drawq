import React from "react";
import { ActivityIndicator, View } from "react-native";
import constants from "../constants/constants";

const Loader = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        size={props.size}
        color={props.color ? props.color : constants.primary}
      />
    </View>
  );
};

export default Loader;
