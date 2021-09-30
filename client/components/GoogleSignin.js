import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Google from "expo-google-app-auth";

import SecondaryButton from "./SecondaryButton";
import Popup from "./Popup";

import { googleAuthHandler } from "../store/actions/auth-action";

const GoogleSignin = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertError, setIsAlertError] = useState("");

  const dispatch = useDispatch();
  const signin = async () => {
    setIsLoading(true);
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId:
          "648215447188-0e7fqg2irr4g6h4rhp20tq9lj228rplp.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        setIsLoading(false);
        dispatch(googleAuthHandler(result.user))
          .then(() => {
            setIsLoading(false);
            props.navigation.navigate("Main");
          })
          .catch(() => {
            setIsLoading(false);
            setIsAlertError(
              "Something went wrong on signin with google, Please try againg"
            );
          });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsAlertError(
        "Something went wrong on signin with google, Please try againg"
      );
    }
  };
  return (
    <>
      <SecondaryButton
        title="Signin with google"
        isLoading={isLoading}
        clickHandler={signin}
      />

      {isAlertError ? (
        <Popup message={isAlertError} onClick={() => setIsAlertError("")} />
      ) : null}
    </>
  );
};

export default GoogleSignin;
