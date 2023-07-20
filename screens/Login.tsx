import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import AdmealLogoBig from "../assets/icons/admealLogoBig";
import AppleLogo from "../assets/icons/appleLogo";
import GoogleLogo from "../assets/icons/googleLogo";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/dataAtom";

const Login = () => {
  const [userItem, setUserItem] = useRecoilState(userState);

  const onGoogleButtonPress = async () => {
    GoogleSignin.configure({
      webClientId:
        "830854626619-8tpal2893jtodq4daugsmm6rmsj3lrsb.apps.googleusercontent.com"
    });
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then((user) => {
        console.log(typeof user);
        setUserItem(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View className="h-screen items-center space-y-4 bg-white">
      <AdmealLogoBig className="my-28" />
      <TouchableOpacity
        onPress={() =>
          onGoogleButtonPress().then(() => console.log("Await google auth!"))
        }
        // disabled={!request}
        className="h-[44px] w-[300px] flex-row items-center justify-between rounded-full border border-[#DBE2E9] px-5">
        <GoogleLogo />
        <Text className="font-[Poppins-600] text-base">Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity className="h-[44px] w-[300px] flex-row items-center justify-between rounded-full border border-[#DBE2E9] px-5">
        <AppleLogo />
        <Text className="font-[Poppins-600] text-base">Sign in with Apple</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
