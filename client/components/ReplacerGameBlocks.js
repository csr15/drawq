import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from "react-native";

import Circlee from "../assets/svg/game-blocks/Circlee";
import Polygon from "../assets/svg/game-blocks/Polygon";
import Square from "../assets/svg/game-blocks/Square";
import Triangle from "../assets/svg/game-blocks/Triangle";
import constants from "../constants/constants";

const ReplacerGameBlocks = (props) => {
  return (
    <View style={styles.footer}>
      <Animated.View
        style={{
          ...styles.timer,
          width: props.animValue.interpolate({
            inputRange: [0, 100],
            outputRange: [Dimensions.get("window").width, 0],
          }),
        }}
      />
      <View style={styles.footer_container}>
        <TouchableOpacity onPress={() => props.clickHandler("polygon")} key={1}>
          <Polygon width={60} height={60} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.clickHandler("circle")} key={2}>
          <Circlee width={60} height={60} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.clickHandler("square")} key={3}>
          <Square width={60} height={60} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.clickHandler("triangle")}
          key={4}
        >
          <Triangle width={70} height={70} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReplacerGameBlocks;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: constants.white,
    height: "18%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "center",
    overflow: "hidden",
  },
  footer_container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  timer: {
    height: 5,
    backgroundColor: constants.grey,
    position: "absolute",
    top: 0,
    borderRadius: 100,
  },
});
