import React from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";

import constants from "../constants/constants";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import TextButton from "./TextButton";
import UserCard from "./UserCard";

const GameOver = (props) => {
  return (
    <View style={styles.game_finish}>
      <View style={styles.score_board}>
        <Text style={styles.score_title}>You are rocking!</Text>
        <Text style={styles.score}>{props.currentScore}</Text>
        {props.score < props.currentScore ? (
          <Text style={styles.score_board_highscore_text}>
            Hurray!!!! New Level
          </Text>
        ) : (
          <View style={styles.score_board_highscore}>
            <Text style={styles.score_board_highscore_text}>
              Highest Level: {props.score}
            </Text>
          </View>
        )}
        <View style={styles.button_container}>
          <SecondaryButton
            title="Quit"
            style={{ flex: 1, marginHorizontal: 10 }}
            clickHandler={() => props.navigation.navigate(props.gameType)}
          />
          <PrimaryButton
            title="Restart"
            style={{ flex: 1, marginHorizontal: 10 }}
            clickHandler={props.restartHandler}
          />
        </View>
      </View>
      <View style={styles.more_container}>
        <View style={styles.leaderboard_container}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>Leader Board</Text>
            <Text
              style={[
                styles.mode,
                props.mode === "easy"
                  ? { color: constants.accent }
                  : { color: constants.primary },
              ]}
            >
              {props.mode}
            </Text>
          </View>
          <TextButton
            title="VIEW ALL"
            titleStyle={{ fontSize: 12, color: constants.black }}
            style={{
              paddingVertical: 0,
              paddingRight: 10,
              paddingBottom: 7,
            }}
          />
        </View>
        <FlatList
          horizontal
          data={props.leaderboardData}
          keyExtractor={(item, index) => "key" + index}
          style={styles.user_card_container}
          renderItem={({ item }) => {
            return (
              <UserCard
                hardMode={props.mode === "hard"}
                easyMode={props.mode === "easy"}
                data={item}
                gameType={props.gameType}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  game_finish: {
    flex: 1,
  },
  score_board: {
    height: "65%",
    justifyContent: "center",
  },
  score_title: {
    fontSize: 16,
    fontFamily: constants.p_4,
    color: constants.black,
    textAlign: "center",
    justifyContent: "center",
  },
  score: {
    fontSize: 55,
    fontFamily: constants.p_7,
    color: constants.black,
    textAlign: "center",
  },
  score_board_highscore: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: constants.text,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1000,
    marginHorizontal: Dimensions.get("window").width / 3.5,
    marginBottom: 15,
  },
  score_board_highscore_text: {
    fontFamily: constants.p_4,
    color: constants.text,
    fontSize: 12,
    textAlign: "center",
  },
  button_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  section_header: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  section_title: {
    fontSize: 18,
    color: constants.black,
    fontFamily: constants.p_5,
    marginBottom: 10,
    paddingLeft: 15,
  },
  mode: {
    fontSize: 10,
    fontFamily: constants.p_3,
    marginLeft: 10,
    marginBottom: 7.5,
  },
  leaderboard_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  user_card_container: {
    paddingLeft: 15,
    // alignItems: "center",
  },
  more_container: {
    height: "35%",
    paddingTop: 15,
    backgroundColor: constants.game_screen_bg,
    // justifyContent: "center",
  },
});
