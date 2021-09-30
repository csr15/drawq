//TODO: timer and animation limit to be efficient
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  AsyncStorage,
  FlatList,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import {
  updateHighScoreHandler,
  fetchUserDetailshHandler,
} from "../store/actions/user-action";
import { fetchCrackerLeaderboard } from "../store/actions/leaderboard-action";

import TextButton from "../components/TextButton";
import Square from "../assets/svg/game-blocks/Square";
import Triangle from "../assets/svg/game-blocks/Triangle";
import Polygon from "../assets/svg/game-blocks/Polygon";
import Circlee from "../assets/svg/game-blocks/Circlee";
import constants from "../constants/constants";
import Avatar from "../components/Avatar";
import UserCard from "../components/UserCard";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import Loader from "../components/Loader";
import CrackerGameBlocks from "../components/CrackerGameBlocks";
import GameOver from "../components/GameOver";

const CrackerGame = (props) => {
  const [mode, setMode] = useState(false);
  const [shapes] = useState(["polygon", "circle", "square", "triangle"]);
  const [currentShape, setCurrentShape] = useState("");
  const [score, setScore] = useState(0);
  const [didGameFinished, setDidGameFinished] = useState(false);

  const state = useSelector((state) => {
    return {
      userDetails: state.user.userDetails,
      crackerLeaderboard: state.leaderboard.crackerList,
    };
  });

  // useEffect for setting timer
  useEffect(() => {
    const timer = setTimeout(
      () => {
        elseHandler();
      },
      score > 10 ? 1000 : score > 5 ? 1500 : 2000
    );

    return () => {
      clearTimeout(timer);
    };
  });

  //useEffect for changing timer animation
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const bounceAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 100,
      duration: score > 10 ? 1000 : score > 5 ? 1500 : 2000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
    Animated.timing(bounceAnim, {
      toValue: 1,
      duration: 50,
      useNativeDriver: false,
      easing: Easing.bounce,
    }).start();
  }, [score, currentShape, didGameFinished]);

  //to change display shape
  let displayShape;
  if (currentShape === "polygon") {
    displayShape = (
      <Animated.View
        style={{
          transform: [
            {
              scale: bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        }}
      >
        <Polygon width={120} height={120} color={constants.primary} />
      </Animated.View>
    );
  } else if (currentShape === "square") {
    displayShape = (
      <Animated.View
        style={{
          transform: [
            {
              scale: bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        }}
      >
        <Square width={120} height={120} color={constants.primary} />
      </Animated.View>
    );
  } else if (currentShape === "triangle") {
    displayShape = (
      <Animated.View
        style={{
          transform: [
            {
              scale: bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        }}
      >
        <Triangle width={120} height={120} color={constants.primary} />
      </Animated.View>
    );
  } else if (currentShape === "circle") {
    displayShape = (
      <Animated.View
        style={{
          transform: [
            {
              scale: bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        }}
      >
        <Circlee width={120} height={120} color={constants.primary} />
      </Animated.View>
    );
  }

  // Initial useEffect to reset state
  useEffect(() => {
    setCurrentShape(shapes[Math.floor(Math.random() * 4)]);
    setMode(props.navigation.getParam("mode"));
    if (state.userDetails === "") {
      (async () => {
        const userDetails = await AsyncStorage.getItem("userDetails");
        const transformedData = JSON.parse(userDetails);
        dispatch(fetchUserDetailshHandler(transformedData.uid));
      })();
    }
  }, []);

  //fun to fetch cracker leaderboard
  const fetchCrackerList = () => {
    dispatch(fetchCrackerLeaderboard(5));
  };

  //fun to check selected shape is equal to displayed shape
  const dispatch = useDispatch();
  const checkShapeHandler = (shape) => {
    if (shape === currentShape) {
      setScore(score + 1);
      setCurrentShape(shapes[Math.floor(Math.random() * 4)]);
      fadeAnim.setValue(0);
      bounceAnim.setValue(0);
    } else {
      elseHandler();
    }
  };

  //fun for game over
  const elseHandler = () => {
    setDidGameFinished(true);
    fetchCrackerList();
    if (state.userDetails.highScore.cracker.score < score) {
      const data = {
        uid: state.userDetails._id,
        mode: mode,
        score: score,
      };
      dispatch(updateHighScoreHandler(data));
    }
  };

  //fun for restarting the game
  const restartGameHandler = () => {
    setDidGameFinished(false);
    dispatch(fetchUserDetailshHandler(state.userDetails._id));
    fadeAnim.setValue(0);
    setScore(0);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: didGameFinished
            ? constants.white
            : constants.game_screen_bg,
        },
      ]}
    >
      {state.userDetails ? (
        didGameFinished ? (
          <GameOver
            score={state.userDetails.highScore.cracker.score}
            currentScore={score}
            restartHandler={restartGameHandler}
            navigation={props.navigation}
            leaderboardData={
              mode === "easy"
                ? state.crackerLeaderboard.easy
                : state.crackerLeaderboard.hard
            }
            mode={mode}
            gameType="Cracker"
          />
        ) : (
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.user_container}>
                {state.userDetails.avatar ? (
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: state.userDetails.avatar,
                    }}
                  />
                ) : (
                  <Avatar title={state.userDetails.userName} />
                )}
                <View style={{ marginLeft: 7 }}>
                  <Text style={styles.user_name}>
                    {state.userDetails.userName}
                  </Text>
                  <View style={styles.high_score_container}>
                    <Ionicons style={styles.icon} name="md-trophy-outline" />
                    <Text style={styles.high_score}>
                      {state.userDetails.highScore.cracker.score}
                    </Text>
                  </View>
                </View>
              </View>
              <TextButton
                title="QUIT"
                titleStyle={{ color: constants.grey }}
                clickHandler={() => props.navigation.navigate("Cracker")}
              />
            </View>
            <View style={styles.body}>{displayShape}</View>
            {!didGameFinished && (
              <CrackerGameBlocks
                clickHandler={(block) => checkShapeHandler(block)}
                animValue={fadeAnim}
                mode={mode}
                score={score}
                currentShape={currentShape}
                bounceAnim={bounceAnim}
              />
            )}
          </View>
        )
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default CrackerGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
  },
  header: {
    height: "12%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: constants.white,
  },
  user_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 12,
  },
  user_name: {
    fontFamily: constants.p_5,
    color: constants.light_black,
    fontSize: 14,
    lineHeight: 18,
  },
  high_score_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  high_score: {
    fontFamily: constants.p_5,
    color: constants.grey,
    fontSize: 12,
    marginTop: 2,
  },
  icon: {
    color: constants.grey,
    fontSize: 14,
    marginRight: 5,
  },
  body: {
    height: "68%",
    justifyContent: "center",
    alignItems: "center",
  },
});

CrackerGame.navigationOptions = (navData) => {
  return {
    tabBarVisible: false,
  };
};
