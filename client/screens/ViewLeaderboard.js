import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AdMobInterstitial, AdMobBanner } from "expo-ads-admob";

import UserCard from "../components/UserCard";
import constants from "../constants/constants";
import {
  fetchCrackerLeaderboard,
  fetchReplacerLeaderboard,
} from "../store/actions/leaderboard-action";

const ViewLeaderboard = (props) => {
  const [limit, setLimit] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [gameType, setGameType] = useState("");
  const [mode, setMode] = useState("");

  const state = useSelector((state) => {
    return {
      cracker: state.leaderboard.crackerList,
      replacer: state.leaderboard.replacerList,
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const gameType = props.navigation.getParam("gameType");
    if (gameType === "cracker") {
      fetchCrackerList();
    } else {
      fetchReplacerList();
    }
    setGameType(gameType);
    setMode(props.navigation.getParam("mode"));
    AdMobInterstitial.setAdUnitID(constants.interstitialAdID);
  }, []);

  const fetchCrackerList = () => {
    setIsLoading(true);
    dispatch(fetchCrackerLeaderboard(limit))
      .then((_) => setIsLoading(false))
      .catch((_) => setIsLoading(false));
  };

  const fetchReplacerList = () => {
    setIsLoading(true);
    dispatch(fetchReplacerLeaderboard(limit))
      .then((_) => setIsLoading(false))
      .catch((_) => setIsLoading(false));
  };

  return (
    <View>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={constants.bannerID}
        servePersonalizedAds={false}
      />
      {gameType === "cracker" ? (
        <FlatList
          numColumns={2}
          data={mode === "easy" ? state.cracker.easy : state.cracker.hard}
          refreshing={isLoading}
          onRefresh={fetchCrackerList}
          keyExtractor={(key, index) => key + index}
          style={styles.user_card_container}
          renderItem={({ item }) => {
            return (
              <View style={styles.card_container}>
                <UserCard
                  hardMode={mode === "hard"}
                  easyMode={mode === "easy"}
                  data={item}
                  gameType={gameType}
                />
              </View>
            );
          }}
        />
      ) : (
        <FlatList
          numColumns={2}
          data={mode === "easy" ? state.replacer.easy : state.replacer.hard}
          refreshing={isLoading}
          onRefresh={fetchReplacerList}
          keyExtractor={(key, index) => key + index}
          style={styles.user_card_container}
          renderItem={({ item }) => {
            return (
              <View style={styles.card_container}>
                <UserCard
                  hardMode={mode === "hard"}
                  easyMode={mode === "easy"}
                  data={item}
                  gameType={gameType}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default ViewLeaderboard;

const styles = StyleSheet.create({
  card_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});

ViewLeaderboard.navigationOptions = (navData) => {
  return {
    headerShow: true,
    headerTitle: () => (
      <Text
        style={{
          fontSize: 16,
          fontFamily: constants.p_7,
          textTransform: "capitalize",
          color: constants.light_black,
        }}
      >
        {navData.navigation.getParam("gameType")}
      </Text>
    ),
  };
};
