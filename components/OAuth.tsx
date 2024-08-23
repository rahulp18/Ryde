import { View, Text, Image, Alert } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";
import { useOAuth } from "@clerk/clerk-expo";
import { googleOAuth } from "@/lib/auth";
import { router } from "expo-router";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);
    if (result.code === "session_exists" || result.code === "success") {
      Alert.alert("Success", "Session exists. Redirecting to home screen.");
      router.replace("/(root)/(tabs)/home");
    }
    Alert.alert(result.success ? "Success" : "Error", result.message);
  };
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg ">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        onPress={handleGoogleSignIn}
        title="Log In With Google"
        className="mt-5 w-full shadow-none"
        bgVariant="outline"
        textVariant="primary"
        IconLeft={() => (
          <Image source={icons.google} className="w-5 h-5 mx-2" />
        )}
      />
    </View>
  );
};

export default OAuth;
