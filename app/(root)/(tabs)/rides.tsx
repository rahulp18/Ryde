import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RideCard from "@/components/RideCard";

import { icons, images } from "@/constants";
import { useUser } from "@clerk/clerk-expo";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";

const Rides = () => {
  const { user } = useUser();

  const {
    data: recentRides,
    loading,
    error,
  } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);
  return (
    <SafeAreaView className="bg-general-500 flex-1">
      <FlatList
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col justify-center items-center h-full  ">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="no recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent routes found!</Text>
              </>
            ) : (
              <ActivityIndicator size={"small"} color={"#000"} />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <Text className="text-2xl font-JakartaBold my-5">All Rides</Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Rides;
