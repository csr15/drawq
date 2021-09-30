import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import AuthScreenBg from "../assets/svg/AuthScreenBg";
import GoogleSignin from "../components/GoogleSignin";
import Input from "../components/Input";
import Popup from "../components/Popup";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import TextButton from "../components/TextButton";
import constants from "../constants/constants";

import * as actions from "../store/actions/auth-action.js";

const Sigin = (props) => {
  const [signinData, setSigninData] = useState({
    mail: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isMailNotValid, setIsMailNotValid] = useState(false);
  const [isAlertError, setIsAlertError] = useState("");

  const state = useSelector((state) => state.auth.signupData);

  useEffect(() => {
    setSigninData({
      ...signinData,
      mail: state.mail,
    });
  }, [state]);

  const mailHandler = () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (signinData.mail) {
      if (emailRegex.test(signinData.mail)) {
        setIsMailNotValid(false);
      } else {
        setIsMailNotValid(true);
      }
    }
  };

  const dispatch = useDispatch();
  const signinHandler = () => {
    if (
      signinData.mail !== "" &&
      signinData.password !== "" &&
      isMailNotValid === false
    ) {
      setIsLoading(true);
      dispatch(actions.signinHandler(signinData))
        .then(() => {
          setIsLoading(false);
          props.navigation.navigate("Main");
          dispatch({ type: "RESET_SIGNUP_DATA" });
        })
        .catch((err) => {
          setIsLoading(false);
          setIsAlertError("Username or password is wrong, Please try again");
        });
    } else {
      setIsAlertError("Please fill all the fields to continue");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container_bg}>
        <AuthScreenBg />
      </View>
      <View style={styles.auth_container}>
        <ScrollView>
          <Text style={styles.title}>DrawQ</Text>
          <View>
            <Input
              label="Email Id"
              input={{
                placeholder: "user@mail.com",
                autoCapitalize: "none",
                autoCompleteType: "off",
                keyboardType: "email-address",
                value: signinData.mail,
                onChangeText: (text) =>
                  setSigninData({ ...signinData, mail: text }),
                onBlur: mailHandler,
              }}
            />
            <Input
              label="Password"
              input={{
                placeholder: "xxxxx",
                autoCapitalize: "none",
                autoCompleteType: "off",
                secureTextEntry: true,
                value: signinData.password,
                onChangeText: (text) =>
                  setSigninData({ ...signinData, password: text }),
                onBlur: null,
              }}
            />
            <PrimaryButton
              title="Signin to my account"
              clickHandler={signinHandler}
              isLoading={isLoading}
            />
          </View>
          <GoogleSignin navigation={props.navigation} />
          <TextButton
            title="Create an account"
            color={constants.primary}
            clickHandler={() => props.navigation.navigate("Signup")}
          />
        </ScrollView>
      </View>

      {isAlertError ? (
        <Popup message={isAlertError} onClick={() => setIsAlertError("")} />
      ) : null}
    </ScrollView>
  );
};

export default Sigin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: constants.auth_bg,
  },
  container_bg: {
    position: "absolute",
    left: -Dimensions.get("window").width / 2,
    top: -Dimensions.get("window").width / 10,
  },
  auth_container: {
    backgroundColor: constants.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontFamily: constants.c_4,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 60,
    fontSize: 30,
  },
});
