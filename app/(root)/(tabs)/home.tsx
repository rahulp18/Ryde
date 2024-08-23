import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { Ride } from "@/types/type";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { setDestinationLocation, setUserLocation } = useLocationStore();
  const { user } = useUser();
  const [hasPermission, setHasPermission] = useState(false);

  const {
    data: recentRides,
    loading,
    error,
  } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
    router.push("/(auth)/sign-in");
  };
  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);

    router.push("/(root)/find-ride");
  };

  return (
    <SafeAreaView className="bg-general-500 flex-1">
      <FlatList
        data={recentRides?.slice(0, 5)}
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
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center gap-1 justify-between my-5">
              <Text
                className="text-xl font-JakartaExtraBold capitalize"
                numberOfLines={1}
              >
                Welcome {user?.firstName}
                👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>
            {/* Google text input */}
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your current Location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
}
