import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { ScrollView, View } from "react-native";
import { Sheet, useSheetRef } from "~/components/sheet/sheet";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { facilities } from "~/data/facilities";

type Facility = {
  id: number;
  name: string;
  address: string;
  distance: string;
  rating: number;
  isAccessible: boolean;
  hasBabyChange: boolean;
  isOpen24Hours: boolean;
  lastCleaned: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

const RatingStars = ({ rating }: { rating: number }) => (
  <View className="flex-row items-center">
    <Ionicons name="star" size={16} color="#F59E0B" />
    <Text className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</Text>
  </View>
);

const FacilityCard = ({ facility }: { facility: Facility }) => (
  <Card className="mb-4 border-gray-100 bg-white shadow-sm">
    <CardContent className="p-5">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900">
            {facility.name}
          </Text>
          <Text className="mt-1 text-base text-gray-600">
            {facility.address}
          </Text>
        </View>
        <Badge
          variant="secondary"
          className="flex-row items-center bg-indigo-50"
        >
          <Ionicons name="location-outline" size={16} color="#4F46E5" />
          <Text className="ml-1 text-sm font-semibold text-indigo-600">
            {facility.distance}
          </Text>
        </Badge>
      </View>

      <View className="mt-4 flex-row items-center">
        <Badge variant="secondary" className="bg-yellow-50">
          <RatingStars rating={facility.rating} />
        </Badge>
        <Badge
          variant="secondary"
          className="ml-4 flex-row items-center bg-gray-50"
        >
          <Ionicons name="time-outline" size={16} color="#6B7280" />
          <Text className="ml-1 text-sm font-medium text-gray-600">
            {facility.lastCleaned}
          </Text>
        </Badge>
      </View>

      <View className="mt-4 flex-row flex-wrap gap-2">
        {facility.isAccessible && (
          <Badge
            variant="secondary"
            className="flex-row items-center bg-green-50"
          >
            <Ionicons name="accessibility-outline" size={16} color="#059669" />
            <Text className="ml-1 text-sm font-medium text-green-700">
              Accessible
            </Text>
          </Badge>
        )}
        {facility.isOpen24Hours && (
          <Badge
            variant="secondary"
            className="flex-row items-center bg-purple-50"
          >
            <Ionicons name="time" size={16} color="#7C3AED" />
            <Text className="ml-1 text-sm font-medium text-purple-700">
              24/7
            </Text>
          </Badge>
        )}
      </View>

      <Button
        variant="ghost"
        className="mt-4 flex-row items-center justify-between bg-gray-50 px-4 py-3"
      >
        <Text className="text-sm font-semibold text-indigo-600">
          View Details
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#4F46E5" />
      </Button>
    </CardContent>
  </Card>
);

interface FilterOption {
  id: string;
  label: string;
}

const filters: FilterOption[] = [
  { id: "All", label: "All Facilities" },
  { id: "Accessible", label: "Wheelchair Access" },
  { id: "BabyChange", label: "Baby Change" },
  { id: "24Hours", label: "24/7 Access" },
];

const ToiletFinderSheet = forwardRef<{ openSheet: () => void }, {}>(
  (_, ref) => {
    const bottomSheetRef = useSheetRef();
    const [selectedFilter, setSelectedFilter] = useState("All");

    const openSheet = () => {
      bottomSheetRef.current?.present();
    };

    useImperativeHandle(ref, () => ({
      openSheet,
    }));

    return (
      <Sheet ref={bottomSheetRef} snapPoints={["40%", "60%"]} index={0}>
        <BottomSheetView style={{ flex: 1 }}>
          <View className="flex-1">
            <View className="border-b border-gray-100 px-6 py-4">
              <Text className="text-2xl font-bold text-gray-900">
                Nearby Facilities
              </Text>
              <Text className="mt-1 text-base font-medium text-gray-500">
                Clean and accessible restrooms near you
              </Text>
            </View>

            <ScrollView
              horizontal
              className="px-6 py-4"
              showsHorizontalScrollIndicator={false}
            >
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={
                    selectedFilter === filter.id ? "default" : "secondary"
                  }
                  className="mr-3 rounded-full"
                  onPress={() => setSelectedFilter(filter.id)}
                >
                  <Text
                    className={
                      selectedFilter === filter.id
                        ? "text-white"
                        : "text-gray-700"
                    }
                  >
                    {filter.label}
                  </Text>
                </Button>
              ))}
            </ScrollView>

            <ScrollView
              className="flex-1 bg-gray-50 px-4"
              showsVerticalScrollIndicator={false}
            >
              {facilities.map((facility) => (
                <FacilityCard key={facility.id} facility={facility} />
              ))}
            </ScrollView>
          </View>
        </BottomSheetView>
      </Sheet>
    );
  },
);

ToiletFinderSheet.displayName = "ToiletFinderSheet";

export default ToiletFinderSheet;
