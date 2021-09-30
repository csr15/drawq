import React, { useEffect, useRef } from "react";
import {
  Animated,
  BackHandler,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";

const UsercardSkeleton = () => {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    skeletonAnim();
  }, []);

  const skeletonAnim = () => {
    Animated.loop(
      Animated.timing(animValue, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  };

  return (
    <View style={styles.user_card}>
      <Animated.View
        style={[
          styles.avatar,
          {
            backgroundColor: animValue.interpolate({
              inputRange: [0, 1],
              outputRange: ["#e1e3e3", "#cfd4d4"],
            }),
          },
          {
            width: props.width ? props.width : 120,
            height: props.height ? props.height : 120,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.user_name,
          {
            backgroundColor: animValue.interpolate({
              inputRange: [0, 1],
              outputRange: ["#e1e3e3", "#cfd4d4"],
            }),
          },
        ]}
      />
    </View>
  );
};

export default UsercardSkeleton;

const styles = StyleSheet.create({
  user_card: {
    marginRight: 15,
    flex: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 25,
  },
  user_name: {
    width: 70,
    height: 5,
    borderRadius: 100,
    marginTop: 10,
  },
});
