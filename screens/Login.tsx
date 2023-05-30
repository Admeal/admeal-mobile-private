import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import AdmealLogoBig from "../assets/icons/admealLogoBig";
import AppleLogo from "../assets/icons/appleLogo";
import GoogleLogo from "../assets/icons/googleLogo";

const Login = () => {
  const { request, promptAsync, user }: any = useAuth();

  return (
    <View className="items-center h-screen space-y-4 bg-white">
      <AdmealLogoBig className="my-28" />
      <TouchableOpacity
        onPress={() => {
          promptAsync();
        }}
        disabled={!request}
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
