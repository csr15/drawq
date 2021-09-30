import React from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { AdMobInterstitial, AdMobBanner } from "expo-ads-admob";

import constants from "../constants/constants";
import PrimaryButton from "./PrimaryButton";
import TextButton from "./TextButton";

const HowToPlay = (props) => {
  React.useEffect(() => {
    AdMobInterstitial.setAdUnitID(constants.interstitialAdID);
  }, []);

  return (
    <Modal visible={props.show} animationType="slide">
      <View style={styles.how_to_play_container}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={constants.bannerID}
          servePersonalizedAds={false}
        />
        <Text style={styles.section_title}>How to play?</Text>
        <View style={styles.steps_container}>
          <Text style={styles.steps}>
            1. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
            odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
            Suspendisse urna nibh, viverra non, semper suscipit, posuere a,
            pede.
          </Text>

          <Text style={styles.steps}>
            2. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor
            mauris sit amet orci. Aenean dignissim pellentesque felis.
          </Text>

          <Text style={styles.steps}>
            3. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi,
            euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras
            consequat.
          </Text>

          <Text style={styles.steps}>
            4. Praesent dapibus, neque id cursus faucibus, tortor neque egestas
            auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam
            dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
          </Text>

          <Text style={styles.steps}>
            5. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
            consectetuer ligula vulputate sem tristique cursus. Nam nulla quam,
            gravida non, commodo a, sodales sit amet, nisi
          </Text>

          <PrimaryButton
            title="Start Game"
            style={{ marginTop: 15 }}
            clickHandler={() => props.navigation.navigate("CrackerGame")}
          />
          <TextButton
            title="CLOSE"
            style={{ marginTop: 5, marginBottom: 40 }}
            clickHandler={props.closeModal}
          />
        </View>
      </View>
    </Modal>
  );
};

export default HowToPlay;

const styles = StyleSheet.create({
  how_to_play_container: {
    // marginTop: 40,
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
  section_title: {
    fontSize: 18,
    color: constants.black,
    fontFamily: constants.p_5,
    marginBottom: 10,
    paddingLeft: 15,
    marginTop: 20
  },
});
