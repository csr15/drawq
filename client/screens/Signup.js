import axios from "axios";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import AuthScreenBg from "../assets/svg/AuthScreenBg";
import GoogleSignin from "../components/GoogleSignin";
import Input from "../components/Input";
import Popup from "../components/Popup";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import TextButton from "../components/TextButton";
import constants from "../constants/constants";

import * as actions from "../store/actions/auth-action.js";

const Signup = (props) => {
  const [signupData, setSignupData] = useState({
    userName: "",
    mail: "",
    password: "",
  });
  const [isUserNameNotAvailable, setIsUserNameNotAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMailNotAvailable, setIsMailNotAvailable] = useState(false);
  const [isMailNotValid, setIsMailNotValid] = useState(false);
  const [isPasswordNotValid, setIsPasswordNotValid] = useState(false);
  const [isAlertError, setIsAlertError] = useState("");

  const checkUserNameHandler = async () => {
    if (signupData.userName !== "") {
      try {
        const { data } = await axios.post(
          `${constants.proxy}/auth/username_validation`,
          {
            userName: signupData.userName,
          }
        );

        if (data !== null) {
          setIsUserNameNotAvailable(true);
        } else {
          setIsUserNameNotAvailable(false);
        }
      } catch (error) {
        console.log(error);
        setIsAlertError(
          "Problem occured while checking user name, Please try again"
        );
      }
    }
  };

  const checkMailHandler = async () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (signupData.mail !== "") {
      if (emailRegex.test(signupData.mail)) {
        setIsMailNotValid(false);
        try {
          const { data } = await axios.post(
            `${constants.proxy}/auth/mail_validation`,
            {
              mail: signupData.mail,
            }
          );

          if (data !== null) {
            setIsMailNotAvailable(true);
          } else {
            setIsMailNotAvailable(false);
          }
        } catch (error) {
          console.log(error);
          setIsAlertError(
            "Problem occured while checking mail ID, Please try again"
          );
        }
      } else {
        setIsMailNotValid(true);
      }
    }
  };

  const passwordHandler = () => {
    if (signupData.password) {
      if (signupData.password.length < 8) {
        setIsPasswordNotValid(true);
      } else setIsPasswordNotValid(false);
    }
  };

  const dispatch = useDispatch();
  const signupHandler = () => {
    if (
      signupData.userName !== "" &&
      signupData.mail !== "" &&
      signupData.password !== "" &&
      isUserNameNotAvailable === false &&
      isMailNotAvailable === false &&
      isMailNotValid === false &&
      isPasswordNotValid === false
    ) {
      setIsLoading(true);
      dispatch(actions.signupHandler(signupData))
        .then(() => {
          setIsLoading(false);
          props.navigation.navigate("Signin");
        })
        .catch((err) => {
          setIsLoading(false);
          setIsAlertError(
            "Problem occured while creating an account, Please try again"
          );
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
              label="userName"
              error={isUserNameNotAvailable && "This username is not available"}
              input={{
                placeholder: "user@mail.com",
                autoCapitalize: "none",
                autoCompleteType: "off",
                onChangeText: (text) =>
                  setSignupData({ ...signupData, userName: text }),
                onBlur: checkUserNameHandler,
              }}
            />
            <Input
              label="Email Id"
              mailError={isMailNotValid && "Enter a valid mail ID"}
              error={isMailNotAvailable && "This mail ID is not available"}
              input={{
                placeholder: "user@mail.com",
                autoCapitalize: "none",
                autoCompleteType: "off",
                keyboardType: "email-address",
                onChangeText: (text) =>
                  setSignupData({ ...signupData, mail: text }),
                onBlur: checkMailHandler,
              }}
            />
            <Input
              label="Password"
              error={isPasswordNotValid && "Password length must be minimum 8"}
              input={{
                placeholder: "xxxxx",
                autoCapitalize: "none",
                autoCompleteType: "off",
                secureTextEntry: true,
                onChangeText: (text) =>
                  setSignupData({ ...signupData, password: text }),
                onBlur: passwordHandler,
              }}
            />
            <PrimaryButton
              title="Signin to my account"
              clickHandler={signupHandler}
              isLoading={isLoading}
            />
          </View>
          <GoogleSignin navigation={props.navigation} />
          <TextButton
            title="Already have an account?"
            color={constants.primary}
            clickHandler={() => props.navigation.navigate("Signin")}
          />
        </ScrollView>
      </View>
      {isAlertError ? (
        <Popup message={isAlertError} onClick={() => setIsAlertError("")} />
      ) : null}
    </ScrollView>
  );
};

export default Signup;

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
  spacer: {
    height: 1,
    backgroundColor: constants.light_grey,
    width: "100%",
    marginBottom: 20,
  },
});
