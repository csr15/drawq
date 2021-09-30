import React, { useEffect } from "react";
import { AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";

import Loader from "../components/Loader";

import { fetchUserDetailshHandler } from "../store/actions/user-action";

const Startup = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userDetails = await AsyncStorage.getItem("userDetails");
      const transformedData = JSON.parse(userDetails);

      if (!userDetails) {
        props.navigation.navigate("Auth");
        return;
      }
      props.navigation.navigate("Main");
      dispatch(fetchUserDetailshHandler(transformedData.uid));
    };

    tryLogin();
  }, []);
  return <Loader size="large" />;
};

export default Startup;
