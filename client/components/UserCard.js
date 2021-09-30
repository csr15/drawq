import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants/constants";
import Avatar from "./Avatar";

const UserCard = (props) => {
  return (
    <View style={[styles.user_card, props.style]}>
      {props.data &&
      //  TODO: 'Remove props.data &&'
      props.data.avatar ? (
        <Image
          source={{
            uri: props.data.avatar,
          }}
          style={[
            styles.avatar,
            {
              width: props.width ? props.width : 120,
              height: props.height ? props.height : 120,
            },
          ]}
        />
      ) : (
        <Avatar
          title={props.data.userName}
          width={props.width ? props.width : 120}
          height={props.height ? props.height : 120}
          style={{ fontSize: 40, lineHeight: 50 }}
        />
      )}
      <Text style={styles.user_name} numberOfLines={1}>
        {props.data.userName}
      </Text>
      <View style={styles.user_card_footer}>
        <Ionicons name="md-trophy-outline" style={styles.icon} />
        <Text style={styles.high_score}>
          {props.gameType === "Cracker"
            ? props.data.highScore.cracker.score
            : props.data.highScore.replacer.level}
        </Text>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  user_card: {
    marginRight: 20,
    flex: 1,
  },
  avatar: {
    resizeMode: "cover",
    borderRadius: 25,
  },
  user_name: {
    fontSize: 14,
    color: constants.light_black,
    fontFamily: constants.p_5,
    marginTop: 10,
    lineHeight: 18,
  },
  user_card_footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 14,
    color: constants.grey,
  },
  high_score: {
    fontSize: 12,
    color: constants.grey,
    fontFamily: constants.p_5,
    marginLeft: 5,
    marginTop: 2,
  },
});
