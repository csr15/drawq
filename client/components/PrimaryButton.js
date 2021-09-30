import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import constants from "../constants/constants";

const PrimaryButton = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        props.style,
        props.isLoading ? { opacity: 0.7 } : { opacity: 1 },
      ]}
      disabled={props.isLoading}
      onPress={props.clickHandler}
    >
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 3,
    marginVertical: 10,
    backgroundColor: constants.primary,
  },
  title: {
    fontFamily: constants.p_5,
    color: constants.white,
    fontSize: 14,
    textTransform: "capitalize",
  },
});
