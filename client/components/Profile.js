import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Avatar from "./Avatar";
import constants from "../constants/constants";
import Loader from "./Loader";
import SecondaryButton from "./SecondaryButton";
import Popup from "./Popup";
import {
  fetchUserDetailshHandler,
  updateAvatarHandler,
  deleteAvatarHandler
} from "../store/actions/user-action";

const CustomAvatar = ({
  userDetails,
  clickHandler,
  style,
  isLoading,
  isModal,
}) => {
  return userDetails.avatar ? (
    <TouchableOpacity onPress={!isModal && clickHandler} disabled={isLoading}>
      <Image
        source={{ uri: userDetails.avatar }}
        style={[styles.avatar, style]}
      />
      {isLoading && isModal ? (
        <ActivityIndicator
          size="small"
          color={constants.primary}
          style={styles.loader}
        />
      ) : null}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={clickHandler}>
      <Avatar
        title={userDetails.userName}
        width={isModal ? 100 : 0}
        height={isModal ? 100 : 0}
      />
    </TouchableOpacity>
  );
};

const Profile = (props) => {
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [isAlertError, setIsAlertError] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);

  const userDetails = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    if (userDetails === "") {
      AsyncStorage.getItem("userDetails")
        .then((userDetails) => {
          const transformedData = JSON.parse(userDetails);
          dispatch(fetchUserDetailshHandler(transformedData.uid));
        })
        .catch((err) => {
          console.log(err);
          setIsAlertError(
            "Something went wrong on fetching user details, Please try againg"
          );
        });
    }
  }, []);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA);
    if (result.status !== "granted") {
      setIsAlertError("You need to grant camera permissions to use this app.");
      return false;
    }
    return true;
  };

  const dispatch = useDispatch();
  const changeAvatarHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    if (!image.cancelled) {
      setIsImageUploading(true);
      let newFile = {
        uri: image.uri,
        type: `test/${image.uri.split(".")[1]}`,
        name: `test.${image.uri.split(".")[1]}`,
      };

      const imageURL = await cloudinaryUpload(newFile);
      dispatch(
        updateAvatarHandler({ uid: userDetails._id, imageURL: imageURL })
      )
        .then((_) => {
          setIsImageUploading(false);
        })
        .catch((_) => {
          setIsImageUploading(false);
          setIsAlertError(
            "Problem occured while updating avatar on server, Please try again"
          );
        });
    }
  };

  const cloudinaryUpload = async (photo) => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "demo-project");
    data.append("cloud_name", "csrfamily");

    try {
      const result = await fetch(
        "https://api.cloudinary.com/v1_1/csrfamily/image/upload",
        {
          body: data,
          method: "POST",
        }
      );

      const transformedData = await result.json();
      return transformedData.secure_url;
    } catch (error) {
      setIsImageUploading(false);
      setIsAlertError(
        "Problem occured while uploading avatar on server, Please try again"
      );
      return false;
    }
  };

  const logoutHandler = () => {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
      .then(() => {
        dispatch({ type: "LOGOUT" });
        props.navigation.navigate("Startup");
      });
  };

  return (
    <View style={styles.container}>
      {userDetails ? (
        <CustomAvatar
          userDetails={userDetails}
          clickHandler={() => setShowMoreDetails(true)}
        />
      ) : (
        <Loader />
      )}

      <Modal visible={showMoreDetails} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            {userDetails ? (
              <>
                <View
                  style={{
                    marginTop: -50,
                    alignItems: "center",
                  }}
                >
                  <CustomAvatar
                    userDetails={userDetails}
                    style={{ width: 100, height: 100 }}
                    isLoading={isImageUploading}
                    isModal
                  />
                </View>
                <Text style={styles.user_name}>{userDetails.userName}</Text>
              </>
            ) : (
              <Loader size="large" />
            )}
            <View style={styles.options_container}>
              <TouchableOpacity
                style={styles.options}
                onPress={changeAvatarHandler}
              >
                <Text style={styles.options_text}>Change Avatar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() => dispatch(deleteAvatarHandler(userDetails._id))}
              >
                <Text style={styles.options_text}>Delete Avatar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() =>
                  Linking.openURL(
                    `mailto:ragulcs15@gmail.com?subject=From ${userDetails.userName}&body=I'm interested to collaborate with you.`
                  )
                }
              >
                <Text style={styles.options_text}>Contact Developer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() =>
                  Linking.openURL(
                    `mailto:ragulcs15@gmail.com?subject=Report a problem&body=I came across a problem on Drawq App.`
                  )
                }
              >
                <Text style={styles.options_text}>Report a problem</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.options} onPress={logoutHandler}>
                <Text style={styles.options_text}>Logout</Text>
              </TouchableOpacity>
              <SecondaryButton
                title="CLOSE"
                style={{ marginTop: 0 }}
                clickHandler={() => setShowMoreDetails(false)}
              />
            </View>
          </View>
        </View>
        {isAlertError ? (
          <Popup message={isAlertError} onClick={() => setIsAlertError("")} />
        ) : null}
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: constants.light_grey,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: constants.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  user_name: {
    fontFamily: constants.p_7,
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  options_container: {
    marginTop: 10,
  },
  options: {
    borderTopWidth: 1,
    borderTopColor: constants.light_grey,
    paddingVertical: 20,
  },
  options_text: {
    fontFamily: constants.p_5,
    color: constants.text,
    fontSize: 14,
  },
  loader: {
    position: "absolute",
    top: 40,
    left: 40,
  },
});
