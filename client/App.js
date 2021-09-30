import React from "react";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Cookie_400Regular } from "@expo-google-fonts/cookie";
import { LogBox, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import Navigator from "./Navigation/Navigator";
import authReducer from "./store/reducers/auth-reducer";
import userRedcuer from "./store/reducers/user-reducer";
import leaderboardReducer from "./store/reducers/leaderboard-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userRedcuer,
  leaderboard: leaderboardReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

LogBox.ignoreAllLogs();

export default function App() {
  const [loadedFonts] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Cookie_400Regular,
  });

  if (!loadedFonts) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <StatusBar />
        <Navigator />
      </Provider>
    );
  }
}

// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { AdMobInterstitial, AdMobBanner, AdMobRewarded } from "expo-ads-admob";

// const App = () => {
  // const bannerID = "ca-app-pub-3940256099942544/6300978111";
  // const interstitialAdID = "ca-app-pub-3940256099942544/1033173712";

  // React.useEffect(() => {
  //   (async () => {
  //     AdMobInterstitial.setAdUnitID(interstitialAdID);
  //     // await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
  //     // await AdMobInterstitial.showAdAsync();
  //     await AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/5224354917"); // Test ID, Replace with your-admob-unit-id
  //     await AdMobRewarded.requestAdAsync();
  //     await AdMobRewarded.showAdAsync();
  //   })();
  // }, []);

//   return (
//     <View>
      // <AdMobBanner
      //   bannerSize="largeBanner"
      //   adUnitID={bannerID}
      //   servePersonalizedAds={false}
      // />
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({});
