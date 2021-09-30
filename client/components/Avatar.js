import React from "react";
import { StyleSheet, Text, View } from "react-native";

import constants from "../constants/constants";

const Avatar = (props) => {
  return (
    <View
      style={[
        styles.container,
        { width: props.width ? props.width : 40 },
        { height: props.height ? props.height : 40 },
      ]}
    >
      <Text style={[styles.title, props.style]}>{props.title[0]}</Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    backgroundColor: constants.avatar_gradient_one,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: constants.p_7,
    lineHeight: 30,
    color: constants.primary,
    textTransform: "uppercase"
  },
});
