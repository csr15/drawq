import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import constants from "../constants/constants";

const TextButton = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        props.style,

        props.isLoading ? { opacity: 0.7 } : { opacity: 1 },
      ]}
      onPress={props.clickHandler}
    >
      <Text style={{ ...styles.title, ...props.titleStyle }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 3,
    backgroundColor: "transparent",
  },
  title: {
    fontFamily: constants.p_5,
    fontSize: 14,
    color: constants.primary,
  },
});
