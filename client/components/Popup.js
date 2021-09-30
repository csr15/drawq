import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants/constants";

const Popup = (props) => {
  return (
    <Modal visible={true} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Ionicons
            name="ios-alert-circle"
            color={constants.error}
            size={24}
            style={{
              textAlign: "center",
              marginTop: 15,
            }}
          />

          <Text style={styles.message}>{props.message}</Text>
          <TouchableOpacity style={styles.button} onPress={props.onClick}>
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
  },
  modal: {
    maxWidth: Dimensions.get("window").width / 1.5,
    backgroundColor: constants.white,
    borderRadius: 15,
    shadowColor: constants.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    marginVertical: 15,
    marginHorizontal: 15,
    fontFamily: constants.p_4,
    fontSize: 14,
    textAlign: "center",
    color: constants.black,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: constants.light_grey,
  },
  buttonText: {
    color: constants.text,
    fontFamily: constants.p_5,
    fontSize: 14,
  },
});
