import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import UserCard from "../components/UserCard";
import TextButton from "../components/TextButton";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { AdMobInterstitial, AdMobBanner } from "expo-ads-admob";

import constants from "../constants/constants";
import HowToPlay from "../components/HowToPlay";
import SelectMode from "../components/SelectMode";
import Profile from "../components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrackerLeaderboard } from "../store/actions/leaderboard-action";
import UsercardSkeleton from "../components/UsercardSkeleton";

const Cracker = (props) => {
  const [showHowtoPlay, setShowHowtoPlay] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [isCrackerLoading, setIsCrackerLoading] = useState(false);

  const crackerLeaderboard = useSelector((state) => state.leaderboard);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchCrackerList();
    AdMobInterstitial.setAdUnitID(constants.interstitialAdID);
  }, []);

  const fetchCrackerList = () => {
    dispatch(fetchCrackerLeaderboard(5))
      .then((_) => setIsCrackerLoading(false))
      .catch((_) => setIsCrackerLoading(false));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            Cracker
          </Text>
          <Profile navigation={props.navigation} />
        </View>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={constants.bannerID}
          servePersonalizedAds={false}
        />
        <View style={{ marginVertical: 10 }}>
          <View style={styles.leaderboard_container}>
            <View style={styles.section_header}>
              <Text style={styles.section_title}>Leader Board</Text>
              <Text style={styles.mode}>EASY</Text>
            </View>
            <TextButton
              title="VIEW ALL"
              clickHandler={() =>
                props.navigation.navigate("ViewLeaderboard", {
                  gameType: "cracker",
                  mode: "easy",
                })
              }
              titleStyle={{ fontSize: 12, color: constants.black }}
              style={{ paddingVertical: 0, paddingRight: 10, paddingBottom: 7 }}
            />
          </View>
          {crackerLeaderboard.crackerList ? (
            <FlatList
              horizontal
              data={crackerLeaderboard.crackerList.easy}
              refreshing={isCrackerLoading}
              onRefresh={fetchCrackerList}
              keyExtractor={(key, index) => key + index}
              style={styles.user_card_container}
              renderItem={({ item }) => {
                return (
                  <UserCard
                    easyMode
                    data={item}
                    gameType="cracker"
                    width={100}
                    height={100}
                  />
                );
              }}
            />
          ) : (
            <FlatList
              horizontal
              data={Array.from({ length: 5 })}
              keyExtractor={(key, index) => key + index}
              style={styles.user_card_container}
              renderItem={(_) => {
                return <UsercardSkeleton width={100} height={100} />;
              }}
            />
          )}
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.leaderboard_container}>
            <View style={styles.section_header}>
              <Text style={styles.section_title}>Leader Board</Text>
              <Text style={{ ...styles.mode, color: constants.primary }}>
                HARD
              </Text>
            </View>
            <TextButton
              title="VIEW ALL"
              clickHandler={() =>
                props.navigation.navigate("ViewLeaderboard", {
                  gameType: "cracker",
                  mode: "hard",
                })
              }
              titleStyle={{ fontSize: 12, color: constants.black }}
              style={{ paddingVertical: 0, paddingRight: 10, paddingBottom: 7 }}
            />
          </View>
          {crackerLeaderboard.crackerList ? (
            <FlatList
              horizontal
              data={crackerLeaderboard.crackerList.hard}
              refreshing={isCrackerLoading}
              onRefresh={fetchCrackerList}
              keyExtractor={(key, index) => key + index.toString()}
              style={styles.user_card_container}
              renderItem={({ item }) => {
                return (
                  <UserCard
                    hardMode
                    data={item}
                    gameType="cracker"
                    width={100}
                    height={100}
                  />
                );
              }}
            />
          ) : (
            <FlatList
              horizontal
              data={Array.from({ length: 5 })}
              keyExtractor={(key, index) => key + index}
              style={styles.user_card_container}
              renderItem={(_) => {
                return <UsercardSkeleton width={100} height={100} />;
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
          props.navigation.navigate("CrackerGame", { mode: mode });
          setSelectMode(false);
        }}
        close={() => setSelectMode(false)}
      />
    </View>
  );
};

export default Cracker;

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
    paddingHorizontal: 15,
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
});
