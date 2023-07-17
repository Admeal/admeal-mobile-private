import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext } from "react";
import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/dataAtom";

const AuthContext = createContext({});

WebBrowser.maybeCompleteAuthSession();

const config = {
  androidClientId:
    "830854626619-ngo8mmt726er8eb3kn8ql47tijf1h7ob.apps.googleusercontent.com",
  iosClientId: "830854626619-mtvvvmboi9jlcapq41kinrtuu8s5vuu9.apps.googleusercontent.com",
  expoClientId:
    "830854626619-khnen5os8dcjb7j1viq0t02djision2a.apps.googleusercontent.com",
  webClientId: "830854626619-8tpal2893jtodq4daugsmm6rmsj3lrsb.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"]
};

export const AuthProvider = ({ children }: any) => {
  const [userList, setUserList] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useState(null);
  // getUserEndpoint();

  // const [request, response, promptAsync] = Google.useAuthRequest(config);

  // useEffect(() => {
  //   handleSignInWithGoogle();
  // }, [response]);

  // const handleSignInWithGoogle = async () => {
  //   const user = await AsyncStorage.getItem("@user");
  //   if (!user) {
  //     if (response && response.type === "success") {
  //       await getUserInfo(response?.authentication?.accessToken);
  //     }
  //   } else {
  //     setUserInfo(JSON.parse(user));
  //   }
  // };

  // const getUserInfo = async (token: any) => {
  //   if (!token) return;
  //   try {
  //     const response = await fetch(`https://www.googleapis.com/userinfo/v2/me?`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     const user = await response.json();
  //     await AsyncStorage.setItem("@user", JSON.stringify(user));
  //     setUserInfo(user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const logout = async () => {
    await AsyncStorage.removeItem("@user");
    setUserInfo(null);
  };
  console.log("userInfo", userInfo);
  return (
    <AuthContext.Provider
      value={{
        user: userInfo,
        // request,
        // response,
        config,
        logout
        // promptAsync
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
