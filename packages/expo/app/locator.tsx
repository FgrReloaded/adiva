import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { View, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import MapSheet from "~/components/sheet/map";
import { toiletMarkers } from "~/data/markers";
import { CustomMarker } from "~/components/map/custom-marker";
import type { MarkerType, Region } from "~/types/map";

export default function Locator() {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 26.1918624,
    longitude: 91.7459607,
    latitudeDelta: 0.008,
    longitudeDelta: 0.009,
  });
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [isMapReady, setIsMapReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const mapSheet = useRef<{ openSheet: () => void }>(null);
  const [search, setSearch] = useState("");
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);

  const [destination] = useState({
    latitude: 27.6048624,
    longitude: 77.5944604,
  });

  const [origin] = useState({
    latitude: 27.6067624,
    longitude: 77.5963804,
  });

  const handleMapReady = () => setIsMapReady(true);

  const handleMapError = (error: any) => {
    console.error("Map loading error:", error);
    Alert.alert("Error", "Failed to load map properly. Please try again.");
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please enable location services to use this feature",
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

      mapRef.current?.animateToRegion(newRegion, 1000);
      setRegion(newRegion);
      setLocation(location);
    } catch (error) {
      console.error("Location error:", error);
      Alert.alert("Error", "Failed to get your location");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          Alert.alert(
            "Location Permission Required",
            "Please enable location services to use this feature",
          );
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation(currentLocation);

        const newRegion = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };

        setRegion(newRegion);

        if (mapRef.current && isMapReady) {
          mapRef.current.animateToRegion(newRegion, 1000);
        }
      } catch (error) {
        setErrorMsg("Error getting location");
        console.error("Location error:", error);
      }
    })();
  }, [isMapReady]);

  useEffect(() => {
    getLocation();
    mapSheet.current?.openSheet();
  }, []);

  const handleMarkerPress = (marker: MarkerType) => {
    setSelectedMarker(marker);
    mapSheet.current?.openSheet();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1">
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          className="w-full h-full"
          showsUserLocation
          initialRegion={region}
          onMapReady={handleMapReady}
          onError={handleMapError}
        >
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!}
            strokeWidth={4}
            strokeColor="blue"
          />
          {toiletMarkers.map((marker: any) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              onPress={() => handleMarkerPress(marker)}
            >
              <CustomMarker type={marker.type} />
            </Marker>
          ))}
        </MapView>

        <View className="absolute top-10 left-2.5 right-5 flex-row items-center gap-1">
          <Card className="flex-1">
            <View className="flex-row items-center">
              <Ionicons
                name="search"
                size={20}
                color="#666"
                className="absolute left-6 z-10"
              />
              <Input
                className="w-full rounded-xl bg-white px-4 py-3 pl-10 text-base"
                placeholder="Enter a location"
                value={search}
                onChangeText={setSearch}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </Card>
          <Button
            variant="outline"
            className="p-3 rounded-xl bg-white"
            onPress={() => {
              /* handle settings */
            }}
          >
            <Ionicons name="settings-outline" size={24} color="#666" />
          </Button>
        </View>

        <Button
          variant="default"
          className="absolute right-5 bottom-[12%] h-[50px] w-[50px] rounded-full bg-green-500"
          onPress={() => {
            /* handle add */
          }}
        >
          <Ionicons name="add" size={24} color="white" />
        </Button>

        <Button
          variant="default"
          className="absolute right-5 bottom-[5%] h-[50px] w-[50px] rounded-full bg-blue-500"
          onPress={getLocation}
        >
          <Ionicons name="locate" size={24} color="white" />
        </Button>

        <MapSheet ref={mapSheet} marker={selectedMarker} />
      </View>
    </>
  );
}
