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

const CrackerGameBlocks = (props) => {
  let blocks = [
    <TouchableOpacity
      onPress={() => props.clickHandler("polygon")}
      key="polygon"
    >
      <Polygon width={70} height={70} color={constants.primary} />
    </TouchableOpacity>,
    <TouchableOpacity onPress={() => props.clickHandler("circle")} key="circle">
      <Circlee width={70} height={70} color={constants.primary} />
    </TouchableOpacity>,
    <TouchableOpacity
      onPress={() => props.clickHandler("triangle")}
      key="triangle"
    >
      <Triangle width={70} height={70} color={constants.primary} />
    </TouchableOpacity>,
    <TouchableOpacity onPress={() => props.clickHandler("square")} key="square">
      <Square width={70} height={70} color={constants.primary} />
    </TouchableOpacity>,
  ];

  let randomEmptyBlocks = [
    <TouchableOpacity
      onPress={() => props.clickHandler("empty")}
      key="polygon"
    >
      <Polygon width={70} height={70} color={constants.light_black} />
    </TouchableOpacity>,
    <TouchableOpacity onPress={() => props.clickHandler("empty")} key="circle">
      <Circlee width={70} height={70} color={constants.light_black} />
    </TouchableOpacity>,
    <TouchableOpacity
      onPress={() => props.clickHandler("empty")}
      key="triangle"
    >
      <Triangle width={70} height={70} color={constants.light_black} />
    </TouchableOpacity>,
    <TouchableOpacity onPress={() => props.clickHandler("empty")} key="square">
      <Square width={70} height={70} color={constants.light_black} />
    </TouchableOpacity>,
  ];

  if (props.mode === "hard") {
    blocks = blocks.sort(() => Math.random() - 0.5);
  }

  //TODO: update limit
  if (props.score > 10) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * 4);
    } while (blocks[randomIndex].key === props.currentShape);
    blocks[randomIndex] = randomEmptyBlocks.filter(
      (el) => el.key === props.currentShape
    );
  }

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
      {props.mode === "easy" ? (
        <View style={styles.footer_container}>{blocks.map((el) => el)}</View>
      ) : (
        <View style={styles.footer_container}>{blocks.map((el) => el)}</View>
      )}
    </View>
  );
};

export default CrackerGameBlocks;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: constants.white,
    height: "20%",
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
  empty: {
    height: 70,
    width: 70,
    backgroundColor: constants.light_black,
    borderRadius: 5,
  },
});
