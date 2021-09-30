import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import UserCard from "../components/UserCard";
import TextButton from "../components/TextButton";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";

import constants from "../constants/constants";
import HowToPlay from "../components/HowToPlay";
import Profile from "../components/Profile";
import { fetchReplacerLeaderboard } from "../store/actions/leaderboard-action";
import { useDispatch, useSelector } from "react-redux";
import SelectMode from "../components/SelectMode";
import UsercardSkeleton from "../components/UsercardSkeleton";

const Replacer = (props) => {
  const [showHowtoPlay, setShowHowtoPlay] = useState(false);
  const [isReplacerLoading, setisReplacerLoading] = useState(false);
  const [selectMode, setSelectMode] = useState(false);

  const replacerLeaderboard = useSelector(
    (state) => state.leaderboard.replacerList
  );

  useEffect(() => {
    fetchReplacerList();
  }, []);

  const dispatch = useDispatch();
  const fetchReplacerList = () => {
    dispatch(fetchReplacerLeaderboard(5))
      .then((_) => setisReplacerLoading(false))
      .catch((_) => setisReplacerLoading(false));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            Replacer
          </Text>
          <Profile navigation={props.navigation} />
        </View>
        <View style={{ marginVertical: 20 }}>
          <View style={styles.leaderboard_container}>
            <View style={styles.section_header}>
              <Text style={styles.section_title}>Leader Board</Text>
              <Text style={styles.mode}>EASY</Text>
            </View>
            <TextButton
              title="VIEW ALL"
              titleStyle={{ fontSize: 12, color: constants.black }}
              style={{ paddingVertical: 0, paddingRight: 10, paddingBottom: 7 }}
              clickHandler={() =>
                props.navigation.navigate("ViewLeaderboard", {
                  gameType: "replacer",
                  mode: "easy",
                })
              }
            />
          </View>
          {replacerLeaderboard ? (
            <FlatList
              horizontal
              data={replacerLeaderboard.easy}
              refreshing={isReplacerLoading}
              onRefresh={fetchReplacerList}
              keyExtractor={(key, index) => key + index}
              style={styles.user_card_container}
              renderItem={({ item }) => {
                return <UserCard easyMode data={item} gameType="replacer" />;
              }}
            />
          ) : (
            <FlatList
              horizontal
              data={Array.from({ length: 5 })}
              keyExtractor={(key, index) => key + index}
              style={styles.user_card_container}
              renderItem={(_) => {
                return <UsercardSkeleton />;
              }}
            />
          )}
        </View>
        <View style={{ marginVertical: 20 }}>
          <View style={styles.leaderboard_container}>
            <View style={styles.section_header}>
              <Text style={styles.section_title}>Leader Board</Text>
              <Text style={{ ...styles.mode, color: constants.primary }}>
                HARD
              </Text>
            </View>
            <TextButton
              title="VIEW ALL"
              titleStyle={{ fontSize: 12, color: constants.black }}
              style={{ paddingVertical: 0, paddingRight: 10, paddingBottom: 7 }}
              clickHandler={() =>
                props.navigation.navigate("ViewLeaderboard", {
                  gameType: "replacer",
                  mode: "hard",
                })
              }
            />
          </View>
          {replacerLeaderboard ? (
            <FlatList
              horizontal
              data={replacerLeaderboard.hard}
              refreshing={isReplacerLoading}
              onRefresh={fetchReplacerList}
              keyExtractor={(key, index) => key + index}
              style={styles.user_card_container}
              renderItem={({ item }) => {
                return <UserCard hardMode data={item} gameType="replacer" />;
              }}
            />
          ) : (
            <FlatList
              horizontal
              data={Array.from({ length: 5 })}
              keyExtractor={(key, index) => key + index}
              style={styles.user_card_container}
              renderItem={(_) => {
                return <UsercardSkeleton />;
              }}
            />
          )}
        </View>
        <PrimaryButton
          title="Start Game"
          style={{ marginHorizontal: 10, marginTop: 15 }}
          clickHandler={() => setSelectMode(true)}
        />
        <SecondaryButton
          title="How to play?"
          style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 40 }}
          clickHandler={() => setShowHowtoPlay(true)}
        />
      </ScrollView>
      <HowToPlay
        show={showHowtoPlay}
        closeModal={() => setShowHowtoPlay(false)}
      />
      <SelectMode
        show={selectMode}
        clickHandler={(mode) => {
          props.navigation.navigate("ReplacerGame", { mode: mode });
          setSelectMode(false);
        }}
        close={() => setSelectMode(false)}
      />
    </View>
  );
};

export default Replacer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 25,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: constants.black,
    fontFamily: constants.p_7,
    width: "80%",
  },
  user_card_container: {
    paddingLeft: 15,
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
    color: constants.accent,
    fontFamily: constants.p_3,
    marginLeft: 10,
    marginBottom: 7.5,
  },
  leaderboard_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  how_to_play_container: {
    marginTop: 40,
  },
  steps_container: {
    paddingHorizontal: 15,
  },
  steps: {
    fontFamily: constants.p_4,
    color: constants.text,
    marginBottom: 10,
    textAlign: "justify",
  },
});
