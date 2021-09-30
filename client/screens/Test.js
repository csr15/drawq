import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Circlee from "../assets/svg/game-blocks/Circlee";
import Polygon from "../assets/svg/game-blocks/Polygon";
import Square from "../assets/svg/game-blocks/Square";
import Triangle from "../assets/svg/game-blocks/Triangle";

const Test = () => {
  const [shapes] = useState(["polygon", "circle", "square", "triangle"]);
  const [selectedShape, setSelectedShape] = useState("");
  const [life, setLife] = useState(3);
  const [board] = useState([
    [
      shapes[Math.floor(Math.random() * 4)],
      shapes[Math.floor(Math.random() * 4)],
      shapes[Math.floor(Math.random() * 4)],
    ],
    [
      shapes[Math.floor(Math.random() * 4)],
      shapes[Math.floor(Math.random() * 4)],
      shapes[Math.floor(Math.random() * 4)],
    ],
    [
      shapes[Math.floor(Math.random() * 4)],
      shapes[Math.floor(Math.random() * 4)],
      shapes[Math.floor(Math.random() * 4)],
    ],
  ]);
  const [updatedBoard, setUpdatedBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  useEffect(() => {
    return () => {
      setUpdatedBoard([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
    };
  }, []);

  const checkPositionHandler = (outer, inner) => {
    if (board[outer][inner] === selectedShape) {
      const a = [...updatedBoard, (updatedBoard[outer][inner] = selectedShape)];
      a.pop();
      setUpdatedBoard(a);
    } else {
      if (life === 0) {
        console.log("Game over");
      } else {
        setLife(life - 1);
      }
    }
  };

  const boardPreview = (
    <FlatList
      numColumns={3}
      listKey={(item, index) => `_key${index.toString()}`}
      keyExtractor={(item, index) => `_key${index.toString()}`}
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
                    <TouchableOpacity onPress={() => setSelectedShape(item)}>
                      <Polygon width={100} height={100} />
                    </TouchableOpacity>
                  );
                } else if (item === "square") {
                  return (
                    <TouchableOpacity onPress={() => setSelectedShape(item)}>
                      <Square width={100} height={100} />
                    </TouchableOpacity>
                  );
                } else if (item === "triangle") {
                  return (
                    <TouchableOpacity onPress={() => setSelectedShape(item)}>
                      <Triangle width={100} height={100} />
                    </TouchableOpacity>
                  );
                } else if (item === "circle") {
                  return (
                    <TouchableOpacity onPress={() => setSelectedShape(item)}>
                      <Circlee width={100} height={100} />
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
      numColumns={3}
      keyExtractor={(index, key) => "key" + index}
      data={updatedBoard}
      listKey={(item, index) => `_key${index.toString()}`}
      keyExtractor={(item, index) => `_key${index.toString()}`}
      contentContainerStyle={{
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
      }}
      renderItem={(outerItem) => {
        return (
          <FlatList
            listKey={(item, index) => "D" + index.toString()}
            data={outerItem.item}
            listKey={(item, index) => `_key${index.toString()}`}
            keyExtractor={(item, index) => `_key${index.toString()}`}
            style={{
              backgroundColor: "red",
            }}
            renderItem={(innerItem) => {
              const { item } = innerItem;
              return (() => {
                if (item === "polygon") {
                  return (
                    <TouchableOpacity onPress={() => setSelectedShape(item)}>
                      <Polygon width={100} height={100} />
                    </TouchableOpacity>
                  );
                } else if (item === "square") {
                  return (
                    <TouchableOpacity onPress={() => setSelectedShape(item)}>
                      <Square width={100} height={100} />
                    </TouchableOpacity>
                  );
                } else if (item === "triangle") {
                  return (
                    <TouchableOpacity onPress={() => setSelectedShape(item)}>
                      <Triangle width={100} height={100} />
                    </TouchableOpacity>
                  );
                } else if (item === "circle") {
                  return (
                    <TouchableOpacity onPress={() => setSelectedShape(item)}>
                      <Circlee width={100} height={100} />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      style={styles.board_space}
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

  return <View>{boardPreview}</View>;
};

export default Test;

const styles = StyleSheet.create({
  board_space: {
    width: 100,
    height: 100,
    backgroundColor: "orange",
    marginVertical: 10,
    marginHorizontal: 5,
  },
});
