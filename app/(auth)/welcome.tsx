import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        className="w-full flex justify-end items-end p-5"
        onPress={() => router.replace("/(auth)/onboarding")}
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center p-5 justify-center">
            <Image
              resizeMode="contain"
              source={item.image}
              className="w-full h-[300px]"
            />
            <View className=" flex flex-row items-center justify-between w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className=" text-md  text-[#858585] mx-10 mt-3  font-JakartaSemiBold text-center">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/onboarding")
            : swiperRef.current?.scrollBy(1)
        }
        title={isLastSlide ? "Get started" : "Next"}
        className="w-11/12 mt-10 mb-5"
      />
    </SafeAreaView>
  );
};

export default Welcome;
