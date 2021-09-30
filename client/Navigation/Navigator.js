import React from "react";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionPresets,
} from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import CrackerNavIcon from "../assets/svg/CrackerNavIcon";
import ReplacerNavIcon from "../assets/svg/ReplacerNavIcon";
import constants from "../constants/constants";
import Cracker from "../screens/Cracker";
import Replacer from "../screens/Replacer";
import Sigin from "../screens/Signin";
import Signup from "../screens/Signup";
import Startup from "../screens/Startup";
import CrackerGame from "../screens/CrackerGame";
import ViewLeaderboard from "../screens/ViewLeaderboard";
import Test from "../screens/Test";
import ReplacerGame from "../screens/ReplacerGame";

const defaultNavConfig = {
  defaultNavigationOptions: {
    cardStyle: {
      backgroundColor: "#ffffff",
    },
    headerShown: false,
    ...TransitionPresets.SlideFromRightIOS,
    gestureEnabled: true,
    cardOverlayEnabled: true,
  },
};

const CrackerStack = createStackNavigator(
  {
    Cracker: Cracker,
    CrackerGame: CrackerGame,
    ViewLeaderboard: {
      screen: ViewLeaderboard,
      navigationOptions: {
        headerShown: true,
        headerStyle: {
          shadowOffset: { width: 0, height: 0 },
          elevation: 0,
        },
      },
    },
  },
  {
    ...defaultNavConfig,
    navigationOptions: (navData) => {
      let tabBarVisible = true;

      if (navData.navigation.state.index > 0) {
        tabBarVisible = false;
      }

      return {
        tabBarVisible: tabBarVisible,
      };
    },
  }
);

const ReplacerStack = createStackNavigator(
  {
    Replacer: Replacer,
    ReplacerGame: ReplacerGame,
    ViewLeaderboard: {
      screen: ViewLeaderboard,
      navigationOptions: {
        headerShown: true,
        headerStyle: {
          shadowOffset: { width: 0, height: 0 },
          elevation: 0,
        },
      },
    },
  },
  {
    ...defaultNavConfig,
    navigationOptions: (navData) => {
      let tabBarVisible = true;

      if (navData.navigation.state.index > 0) {
        tabBarVisible = false;
      }

      return {
        tabBarVisible: tabBarVisible,
      };
    },
  }
);

const AuthStack = createStackNavigator(
  {
    Signin: {
      screen: Sigin,
    },
    Signup: {
      screen: Signup,
    },
  },
  defaultNavConfig
);

const MainNavigator = createBottomTabNavigator(
  {
    Cracker: {
      screen: CrackerStack,
      navigationOptions: () => {
        return {
          tabBarIcon: ({ focused }) => (
            <>
              <CrackerNavIcon focused={focused} />
              <Text
                style={{
                  fontFamily: constants.p_5,
                  color: focused
                    ? constants.light_black
                    : constants.bottom_nav_icon,
                  fontSize: 12,
                  marginTop: 5,
                }}
              >
                Cracker
              </Text>
            </>
          ),
        };
      },
    },
    Replacer: {
      screen: ReplacerStack,
      navigationOptions: () => {
        return {
          tabBarIcon: ({ focused }) => (
            <>
              <ReplacerNavIcon focused={focused} />
              <Text
                style={{
                  fontFamily: constants.p_5,
                  color: focused
                    ? constants.light_black
                    : constants.bottom_nav_icon,
                  fontSize: 12,
                  marginTop: 5,
                }}
              >
                Replacer
              </Text>
            </>
          ),
        };
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      tabStyle: {
        backgroundColor: constants.bottom_nav_bg,
        marginTop: -Dimensions.get("window").height / 40,
        paddingVertical: 10,
        paddingTop: 15,
      },
      style: {
        borderTopWidth: 0,
      },
    },
  }
);

const AuthFlowNavigator = createSwitchNavigator({
  Startup: Startup,
  Auth: AuthStack,
  Main: MainNavigator,
});

export default createAppContainer(AuthFlowNavigator);
