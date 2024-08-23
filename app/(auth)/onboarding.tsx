import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { images } from "@/constants";

import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";

const Onboarding = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="h-[350px] w-full] ">
          <Image
            source={images.signUpCar}
            className="z-0 w-full h-[350px] object-contain"
          />
        </View>
        <View className="p-5 pt-0">
          <View>
            <Text className="text-2xl text-black font-JakartaBold  text-center">
              Let's Get Started
            </Text>
            <Text className="text-lg text-general-200 font-Jakarta  text-center">
              Sign up or log in to find out the best car for you
            </Text>
          </View>
          <CustomButton
            title="Sign Up"
            onPress={() => router.push("/(auth)/sign-up")}
            className="mt-6"
          />
          {/* OAuth */}
          <OAuth />
          <Link
            className="text-lg text-center text-general-200 mt-10"
            href={"/sign-in"}
          >
            <Text>Already have an account ?</Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
        {/* verification modal */}
      </View>
    </ScrollView>
  );
};

export default Onboarding;
