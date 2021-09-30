import React from "react";
import { StyleSheet, Text, View, Modal, Dimensions } from "react-native";

import constants from "../constants/constants";
import PrimaryButton from "./PrimaryButton";
import TextButton from "./TextButton";

const SelectMode = (props) => {
  return (
    <Modal visible={props.show} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.title}>Select Game Mode</Text>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="EASY"
              style={{
                backgroundColor: constants.accent,
                flex: 1,
                marginHorizontal: 5,
              }}
              clickHandler={() => props.clickHandler("easy")}
            />
            <PrimaryButton
              title="HARD"
              style={{ flex: 1, marginHorizontal: 10 }}
              clickHandler={() => props.clickHandler("hard")}
            />
          </View>
          <Text style={styles.steps}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ipsum
            eveniet saepe dolor expedita, sit, quibusdam facilis eos quae
            recusandae nam maiores impedit suscipit ad sequi labore perferendis
            vero harum minus quisquam iure, quis mollitia nihil! Praesentium
            quam sequi excepturi?
          </Text>
          <TextButton title="CANCEL" textStyle={{fontSize: 12}} clickHandler={props.close} />
        </View>
      </View>
    </Modal>
  );
};

export default SelectMode;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modal: {
    maxWidth: Dimensions.get("window").width,
    backgroundColor: constants.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: constants.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 15,
    paddingBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: constants.black,
    fontFamily: constants.p_5,
    marginBottom: 7,
    paddingLeft: 15,
    textAlign: "center",
  },
  steps: {
    fontFamily: constants.p_4,
    color: constants.text,
    textAlign: "justify",
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 10,
  },
});
