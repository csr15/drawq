import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import constants from "../constants/constants";

const SecondaryButton = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        props.style,
        props.isLoading ? { opacity: 0.7 } : { opacity: 1 },
      ]}
      onPress={props.clickHandler}
      disabled={props.isLoading}
    >
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 3,
    marginVertical: 10,
    backgroundColor: constants.light_grey,
  },
  title: {
    fontFamily: constants.p_5,
    color: constants.text,
    fontSize: 14,
    textTransform: "capitalize",
  },
});
