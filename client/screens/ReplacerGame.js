/*TODO: 
  1. timer and animation limit to be efficient
  2. define correct numbers of column for easy and hard type
  3. check Dimensional and correct it
  4. update game board component for hard game type also
  5. Reset timer and redefine proper time
*/
import React, { isValidElement, useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { fetchUserDetailshHandler } from "../store/actions/user-action";

import Circlee from "../assets/svg/game-blocks/Circlee";
import Polygon from "../assets/svg/game-blocks/Polygon";
import Square from "../assets/svg/game-blocks/Square";
import Triangle from "../assets/svg/game-blocks/Triangle";
import constants from "../constants/constants";
import TextButton from "../components/TextButton";
import GameOver from "../components/GameOver";
import ReplacerGameBlocks from "../components/ReplacerGameBlocks";
import Avatar from "../components/Avatar";

const ReplacerGame = (props) => {
  const [shapes] = useState(["polygon", "circle", "square", "triangle"]);
  const [selectedShape, setSelectedShape] = useState("");
  const [life, setLife] = useState();
  const [board, setBoard] = useState();
  const [didGameFinished, setDidGameFinished] = useState(false);
  const [level, setLevel] = useState(1);
  const [mode, setMode] = useState("");
  const [didGameStarted, setDidGameStarted] = useState(false);
  const [isAllFilled, setIsAllFilled] = useState(false);
  const [blockSize, setBlockSize] = useState(false);
  const [updatedBoard, setUpdatedBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const state = useSelector((state) => {
    return {
      userDetails: state.user.userDetails,
      replacerLeaderboard: state.leaderboard.replacerList,
    };
  });

  //fun to reset game board for different type of difficulty
  const resetGameBoard = () => {
    let arr = [];
    let x = [];

    if (props.navigation.getParam("mode") === "easy") {
      for (let i = 0; i < 3; i++) {
        let a = [];
        for (let j = 0; j < 3; j++) {
          a = [...a, shapes[Math.floor(Math.random() * 4)]];
        }
        arr.push(a);
      }
    } else {
      for (let i = 0; i < 4; i++) {
        let a = [];
        let b = [];
        for (let j = 0; j < 4; j++) {
          a = [...a, shapes[Math.floor(Math.random() * 4)]];
          b = [...b, ""];
        }
        arr.push(a);
        x.push(b);
        setUpdatedBoard(x);
      }
    }

    setBoard(arr);
  };

  const dispatch = useDispatch();
  //initial useEffect to run and fetch user details if it's not
  useEffect(() => {
    setMode(props.navigation.getParam("mode"));
    resetGameBoard();
    setBlockSize(
      props.navigation.getParam("mode") === "easy"
        ? Dimensions.get("window").width / 3.5
        : Dimensions.get("window").width / 6
    );
    if (state.userDetails === "") {
      (async () => {
        const userDetails = await AsyncStorage.getItem("userDetails");
        const transformedData = JSON.parse(userDetails);
        dispatch(fetchUserDetailshHandler(transformedData.uid));
      })();
    }
    return () => {
      setUpdatedBoard([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
    };
  }, []);

  //useEffect to run timer animation
  const anim = useRef(new Animated.Value(0)).current;
  // Initial value for opacity: 0
  // useEffect(() => {
  //   console.log(anim);
  //   if (life !== 0) {
  //     Animated.timing(anim, {
  //       toValue: Dimensions.get("window").width,
  //       duration: 10000,
  //       useNativeDriver: false,
  //     }).start();

  //     const timer = setTimeout(() => {
  //       elseHandler();
  //     }, 10000);

  //     () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [life]);

  //useEffect to check whether all empty blocks are filled to go to next level
  useEffect(() => {
    let arr = [];

    for (let i of updatedBoard) {
      arr = [...arr, ...i];
    }

    if (!arr.includes("")) {
      setIsAllFilled(true);
    }
  }, [updatedBoard]);

  //useEffect to change game level
  useEffect(() => {
    if (isAllFilled) {
      setDidGameStarted(false);
      setUpdatedBoard([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
      resetGameBoard();
      setIsAllFilled(false);
      fadeAnim.setValue(0);
      anim.setValue(0);
      setLevel(level + 1);
    }
  }, [isAllFilled]);

  //useEffect to for animation and setting timeout for game board preview
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 100,
      duration: mode === "easy" ? 4000 : 6000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
    const timer = setTimeout(
      () => {
        setDidGameStarted(true);
        setLife(3);
      },
      mode === "easy" ? 4000 : 6000
    );

    return () => {
      clearTimeout(timer);
    };
  }, [isAllFilled, board]);

  //fun to check selected shape and place are correct
  const checkPositionHandler = (outer, inner) => {
    if (selectedShape) {
      if (board[outer][inner] === selectedShape) {
        const a = [
          ...updatedBoard,
          (updatedBoard[outer][inner] = selectedShape),
        ];
        a.pop();
        setUpdatedBoard(a);
        setSelectedShape("");
      } else {
        elseHandler();
      }
    }
  };

  const elseHandler = () => {
    if (life === 1) {
      setSelectedShape("");
      setDidGameFinished(true);
      anim.setValue(0);
    } else {
      setLife(life - 1);
      setSelectedShape("");
      anim.setValue(0);
    }
  };

  //fun to restart the game from scratch
  const restartHandler = () => {
    setSelectedShape("");
    setDidGameFinished(false);
    setDidGameStarted(false);
    setUpdatedBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setIsAllFilled(false);
    setLevel(1);
    setLife(3);
    resetGameBoard();
    fadeAnim.setValue(0);
  };

  const boardPreview = (
    <FlatList
      numColumns={props.navigation.getParam("mode") === "easy" ? 3 : 4}
      key={mode}
      listKey={(_, index) => `_key${index.toString()}`}
      keyExtractor={(_, index) => `_key${index.toString()}`}
      contentContainerStyle={styles.center}
      data={board}
      renderItem={({ item }) => {
        return (
          <FlatList
            data={item}
            listKey={(item, index) => `_key${index.toString()}`}
            keyExtractor={(item, index) => `_key${index.toString()}`}
            renderItem={({ item }) => {
              return (() => {
                if (item === "polygon") {
                  return (
                    <TouchableOpacity
                      style={[
                        props.navigation.getParam("mode") === "hard"
                          ? styles.preview_game_board_block_hard
                          : styles.preview_game_board_block,
                        ,
                      ]}
                      onPress={() => setSelectedShape(item)}
                    >
                      <Polygon width={blockSize} height={blockSize} />
                    </TouchableOpacity>
                  );
                } else if (item === "square") {
                  return (
                    <TouchableOpacity
                      style={[
                        props.navigation.getParam("mode") === "hard"
                          ? styles.preview_game_board_block_hard
                          : styles.preview_game_board_block,
                        ,
                      ]}
                      onPress={() => setSelectedShape(item)}
                    >
                      <Square width={blockSize} height={blockSize} />
                    </TouchableOpacity>
                  );
                } else if (item === "triangle") {
                  return (
                    <TouchableOpacity
                      style={[
                        props.navigation.getParam("mode") === "hard"
                          ? styles.preview_game_board_block_hard
                          : styles.preview_game_board_block,
                        ,
                      ]}
                      onPress={() => setSelectedShape(item)}
                    >
                      <Triangle width={blockSize} height={blockSize} />
                    </TouchableOpacity>
                  );
                } else if (item === "circle") {
                  return (
                    <TouchableOpacity
                      style={[
                        props.navigation.getParam("mode") === "hard"
                          ? styles.preview_game_board_block_hard
                          : styles.preview_game_board_block,
                        ,
                      ]}
                      onPress={() => setSelectedShape(item)}
                    >
                      <Circlee width={blockSize} height={blockSize} />
                    </TouchableOpacity>
                  );
                }
              })();
            }}
          />
        );
      }}
    />
  );

  const gameBoard = (
    <FlatList
      numColumns={props.navigation.getParam("mode") === "easy" ? 3 : 4}
      keyExtractor={(index, key) => "key" + index}
      key={mode}
      data={updatedBoard}
      listKey={(_, index) => `_key${index.toString()}`}
      keyExtractor={(_, index) => `_key${index.toString()}`}
      contentContainerStyle={styles.center}
      renderItem={(outerItem) => {
        return (
          <FlatList
            listKey={(_, index) => "D" + index.toString()}
            data={outerItem.item}
            listKey={(_, index) => `_key${index.toString()}`}
            keyExtractor={(item, index) => `_key${index.toString()}`}
            contentContainerStyle={styles.center}
            renderItem={(innerItem) => {
              const { item } = innerItem;
              return (() => {
                if (item === "polygon") {
                  return (
                    <TouchableOpacity
                      style={
                        mode === "easy"
                          ? styles.game_board_block
                          : styles.game_board_block_hard
                      }
                      onPress={() => setSelectedShape(item)}
                    >
                      <Polygon width={blockSize} height={blockSize} />
                    </TouchableOpacity>
                  );
                } else if (item === "square") {
                  return (
                    <TouchableOpacity
                      style={
                        mode === "easy"
                          ? styles.game_board_block
                          : styles.game_board_block_hard
                      }
                      onPress={() => setSelectedShape(item)}
                    >
                      <Square width={blockSize} height={blockSize} />
                    </TouchableOpacity>
                  );
                } else if (item === "triangle") {
                  return (
                    <TouchableOpacity
                      style={
                        mode === "easy"
                          ? styles.game_board_block
                          : styles.game_board_block_hard
                      }
                      onPress={() => setSelectedShape(item)}
                    >
                      <Triangle width={blockSize} height={blockSize} />
                    </TouchableOpacity>
                  );
                } else if (item === "circle") {
                  return (
                    <TouchableOpacity
                      style={
                        mode === "easy"
                          ? styles.game_board_block
                          : styles.game_board_block_hard
                      }
                      onPress={() => setSelectedShape(item)}
                    >
                      <Circlee width={blockSize} height={blockSize} />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      style={
                        mode === "hard"
                          ? styles.empty_board_hard
                          : styles.empty_board
                      }
                      onPress={checkPositionHandler.bind(
                        this,
                        outerItem.index,
                        innerItem.index
                      )}
                    />
                  );
                }
              })();
            }}
          />
        );
      }}
    />
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            didGameFinished || !didGameStarted
              ? constants.white
              : constants.game_screen_bg,
        },
      ]}
    >
      {didGameFinished ? (
        <GameOver
          score={state.userDetails.highScore.replacer.level}
          currentScore={level}
          restartHandler={restartHandler}
          navigation={props.navigation}
          mode={mode}
          gameType="Replacer"
          leaderboardData={
            mode === "easy"
              ? state.replacerLeaderboard.easy
              : state.replacerLeaderboard.hard
          }
        />
      ) : (
        <View>
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
            <View style={styles.header_right}>
              <View style={styles.icon_container}>
                {Array.from({ length: life }).map((_, index) => (
                  <Ionicons key={index} name="heart" style={styles.icon} />
                ))}
              </View>
              <Text style={styles.level}>
                Level: <Text style={styles.level_count}>{level}</Text>
              </Text>
            </View>
          </View>
          {didGameStarted ? (
            <>
              <View style={styles.game_board}>{gameBoard}</View>
              <ReplacerGameBlocks
                animValue={anim}
                clickHandler={(block) => setSelectedShape(block)}
              />
            </>
          ) : (
            <View style={[styles.game_board, { height: "88%" }]}>
              <View style={styles.game_board_preview}>
                <Animated.View
                  style={{
                    height: "100%",
                    width: fadeAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: [Dimensions.get("window").width, 0],
                    }),
                    backgroundColor: constants.game_screen_bg,
                    position: "absolute",
                    zIndex: 0,
                    top: 0,
                    left: 0,
                  }}
                />
                {boardPreview}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ReplacerGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
  },
  game_board: {
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
  preview_game_board_block: {
    height: Dimensions.get("window").width / 3.3,
    width: Dimensions.get("window").width / 3.3,
    margin: Dimensions.get("window").width / 60,
    justifyContent: "center",
    alignItems: "center",
  },
  preview_game_board_block_hard: {
    height: Dimensions.get("window").width / 5,
    width: Dimensions.get("window").width / 5,
    margin: Dimensions.get("window").width / 45,
    justifyContent: "center",
    alignItems: "center",
  },
  game_board_block: {
    height: Dimensions.get("window").width / 3.3,
    width: Dimensions.get("window").width / 3.3,
    margin: Dimensions.get("window").width / 70,
    justifyContent: "center",
    alignItems: "center",
  },
  game_board_block_hard: {
    height: Dimensions.get("window").width / 5,
    width: Dimensions.get("window").width / 5,
    margin: Dimensions.get("window").width / 45,
    justifyContent: "center",
    alignItems: "center",
  },
  empty_board: {
    backgroundColor: constants.grey,
    height: Dimensions.get("window").width / 3.3,
    width: Dimensions.get("window").width / 3.3,
    margin: Dimensions.get("window").width / 70,
  },
  empty_board_hard: {
    backgroundColor: constants.grey,
    height: Dimensions.get("window").width / 5,
    width: Dimensions.get("window").width / 5,
    margin: Dimensions.get("window").width / 45,
  },
  game_board_preview: {
    flex: 1,
  },
  header_right: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  level: {
    color: constants.text,
    fontFamily: constants.p_4,
    lineHeight: 20,
  },
  level_count: {
    color: constants.text,
    fontFamily: constants.p_5,
  },
});
