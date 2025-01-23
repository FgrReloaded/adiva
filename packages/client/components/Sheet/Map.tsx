import { Ionicons } from '@expo/vector-icons';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';

import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';

const ToiletFinderSheet = forwardRef(({ }, ref) => {
  const bottomSheetModalRef = useSheetRef();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loaded, error] = useFonts({
    Poppins: require('../../assets/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: 'Public Toilet 1',
      address: 'Public Toilet',
      distance: '300m',
      rating: 4.0,
      isAccessible: true,
      hasBabyChange: true,
      isOpen24Hours: true,
      lastCleaned: '30 mins ago',
      coordinate: {
        latitude: 26.2033751,
        longitude: 91.6935123,
      },
    },
    {
      id: 2,
      name: 'Public Toilet 2',
      address: 'Public Toilet',
      distance: '450m',
      rating: 3.8,
      isAccessible: true,
      hasBabyChange: false,
      isOpen24Hours: true,
      lastCleaned: '1 hour ago',
      coordinate: {
        latitude: 26.2048969,
        longitude: 91.6857321,
      },
    },
    {
      id: 3,
      name: 'Public Toilet 3',
      address: 'Public Toilet',
      distance: '280m',
      rating: 4.2,
      isAccessible: true,
      hasBabyChange: true,
      isOpen24Hours: false,
      lastCleaned: '45 mins ago',
      coordinate: {
        latitude: 26.1608988,
        longitude: 91.7575553,
      },
    },
    {
      id: 4,
      name: 'Public Toilet 4',
      address: 'Public Toilet',
      distance: '350m',
      rating: 4.5,
      isAccessible: true,
      hasBabyChange: true,
      isOpen24Hours: true,
      lastCleaned: '20 mins ago',
      coordinate: {
        latitude: 26.1829049,
        longitude: 91.7415736,
      },
    },
    {
      id: 5,
      name: 'Public Toilet 5',
      address: 'Public Toilet',
      distance: '500m',
      rating: 3.9,
      isAccessible: false,
      hasBabyChange: true,
      isOpen24Hours: true,
      lastCleaned: '2 hours ago',
      coordinate: {
        latitude: 26.1500392,
        longitude: 91.7754132,
      },
    },
    {
      id: 6,
      name: 'Public Toilet 6',
      address: 'Public Toilet',
      distance: '320m',
      rating: 4.1,
      isAccessible: true,
      hasBabyChange: false,
      isOpen24Hours: true,
      lastCleaned: '1.5 hours ago',
      coordinate: {
        latitude: 26.2028116,
        longitude: 91.6838358,
      },
    },
    {
      id: 7,
      name: 'Public Toilet 7',
      address: 'Public Toilet',
      distance: '400m',
      rating: 4.3,
      isAccessible: true,
      hasBabyChange: true,
      isOpen24Hours: false,
      lastCleaned: '25 mins ago',
      coordinate: {
        latitude: 26.1788182,
        longitude: 91.7248851,
      },
    },
    {
      id: 8,
      name: 'Public Toilet 8',
      address: 'Public Toilet',
      distance: '550m',
      rating: 3.7,
      isAccessible: true,
      hasBabyChange: false,
      isOpen24Hours: true,
      lastCleaned: '50 mins ago',
      coordinate: {
        latitude: 26.1590405,
        longitude: 91.6716502,
      },
    },
    {
      id: 9,
      name: 'Public Toilet 9',
      address: 'Public Toilet',
      distance: '600m',
      rating: 4.0,
      isAccessible: true,
      hasBabyChange: true,
      isOpen24Hours: true,
      lastCleaned: '15 mins ago',
      coordinate: {
        latitude: 26.1308205,
        longitude: 91.7991124,
      },
    },
    {
      id: 10,
      name: 'Public Toilet 10',
      address: 'Public Toilet',
      distance: '420m',
      rating: 4.4,
      isAccessible: true,
      hasBabyChange: true,
      isOpen24Hours: false,
      lastCleaned: '40 mins ago',
      coordinate: {
        latitude: 26.1811473,
        longitude: 91.7403057,
      },
    },
    {
      id: 11,
      name: 'Public Toilet 11',
      address: 'Public Toilet',
      distance: '480m',
      rating: 3.6,
      isAccessible: false,
      hasBabyChange: true,
      isOpen24Hours: true,
      lastCleaned: '1.2 hours ago',
      coordinate: {
        latitude: 26.1220686,
        longitude: 91.7994103,
      },
    },
    {
      id: 12,
      name: 'Public Toilet 12',
      address: 'Public Toilet',
      distance: '380m',
      rating: 4.2,
      isAccessible: true,
      hasBabyChange: false,
      isOpen24Hours: true,
      lastCleaned: '35 mins ago',
      coordinate: {
        latitude: 26.1823981,
        longitude: 91.740904,
      },
    },
    {
      id: 13,
      name: 'Public Toilet 13',
      address: 'Public Toilet',
      distance: '520m',
      rating: 4.1,
      isAccessible: true,
      hasBabyChange: true,
      isOpen24Hours: true,
      lastCleaned: '55 mins ago',
      coordinate: {
        latitude: 26.178945,
        longitude: 91.7302329,
      },
    },
    {
      id: 14,
      name: 'Public Toilet 14',
      address: 'Public Toilet',
      distance: '470m',
      rating: 3.9,
      isAccessible: true,
      hasBabyChange: false,
      isOpen24Hours: false,
      lastCleaned: '1.8 hours ago',
      coordinate: {
        latitude: 26.1289696,
        longitude: 91.7970089,
      },
    },
    {
      id: 15,
      name: 'Public Toilet 15',
      address: 'Public Toilet',
      distance: '440m',
      rating: 4.0,
      isAccessible: true,
      hasBabyChange: true,
      isOpen24Hours: true,
      lastCleaned: '45 mins ago',
      coordinate: {
        latitude: 26.1289696,
        longitude: 91.7970089,
      },
    },
  ]);

  const openSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  useImperativeHandle(ref, () => ({
    openSheet,
  }));

  const filters = [
    { id: 'All', label: 'All Facilities' },
    { id: 'Accessible', label: 'Wheelchair Access' },
    { id: 'BabyChange', label: 'Baby Change' },
    { id: '24Hours', label: '24/7 Access' },
  ];

  const renderRatingStars = (rating: number) => {
    return (
      <View className="flex-row items-center">
        <Ionicons name="star" size={16} color="#F59E0B" />
        <Text className="ml-1 text-sm text-gray-600">{rating}</Text>
      </View>
    );
  };

  return (
    <Sheet
      ref={bottomSheetModalRef}
      snapPoints={[400, 600]}
      backgroundStyle={{
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      }}>
      <BottomSheetView className="flex-1">
        <View className="flex-1">
          <View className="border-b border-gray-100 px-6 py-4">
            <Text style={{ fontFamily: 'Poppins' }} className="text-2xl font-bold text-gray-900">
              Nearby Facilities
            </Text>
            <Text
              style={{ fontFamily: 'Poppins' }}
              className="mt-1 text-base font-medium text-gray-500">
              Clean and accessible restrooms near you
            </Text>
          </View>

          <View className="bg-white">
            <ScrollView
              horizontal
              className="px-6 py-4"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  onPress={() => setSelectedFilter(filter.id)}
                  className={`mr-3 rounded-full px-5 py-2.5 ${selectedFilter === filter.id ? 'bg-indigo-600' : 'bg-gray-100'
                    }`}>
                  <Text
                    style={{ fontFamily: 'Poppins' }}
                    className={`text-sm font-semibold ${selectedFilter === filter.id ? 'text-white' : 'text-gray-700'
                      }`}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <ScrollView
            className="flex-1 bg-gray-50"
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}>
            {facilities.map((facility) => (
              <TouchableOpacity
                key={facility.id}
                className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <Text
                      style={{ fontFamily: 'Poppins' }}
                      className="text-lg font-bold text-gray-900">
                      {facility.name}
                    </Text>
                    <Text
                      style={{ fontFamily: 'Poppins' }}
                      className="mt-1 text-base text-gray-600">
                      {facility.address}
                    </Text>
                  </View>
                  <View className="flex-row items-center rounded-full bg-indigo-50 px-3 py-1">
                    <Ionicons name="location-outline" size={16} color="#4F46E5" />
                    <Text
                      style={{ fontFamily: 'Poppins' }}
                      className="ml-1 text-sm font-semibold text-indigo-600">
                      {facility.distance}
                    </Text>
                  </View>
                </View>

                <View className="mt-4 flex-row items-center">
                  <View className="flex-row items-center rounded-full bg-yellow-50 px-3 py-1">
                    {renderRatingStars(facility.rating)}
                  </View>
                  <View className="ml-4 flex-row items-center rounded-full bg-gray-50 px-3 py-1">
                    <Ionicons name="time-outline" size={16} color="#6B7280" />
                    <Text
                      style={{ fontFamily: 'Poppins' }}
                      className="ml-1 text-sm font-medium text-gray-600">
                      {facility.lastCleaned}
                    </Text>
                  </View>
                </View>

                <View className="mt-4 flex-row flex-wrap gap-2">
                  {facility.isAccessible && (
                    <View className="flex-row items-center rounded-full bg-green-50 px-3 py-1.5">
                      <Ionicons name="accessibility-outline" size={16} color="#059669" />
                      <Text
                        style={{ fontFamily: 'Poppins' }}
                        className="ml-1 text-sm font-medium text-green-700">
                        Accessible
                      </Text>
                    </View>
                  )}
                  {facility.isOpen24Hours && (
                    <View className="flex-row items-center rounded-full bg-purple-50 px-3 py-1.5">
                      <Ionicons name="time" size={16} color="#7C3AED" />
                      <Text
                        style={{ fontFamily: 'Poppins' }}
                        className="ml-1 text-sm font-medium text-purple-700">
                        24/7
                      </Text>
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  className="mt-4 flex-row items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
                  activeOpacity={0.7}>
                  <Text
                    style={{ fontFamily: 'Poppins' }}
                    className="text-sm font-semibold text-indigo-600">
                    View Details
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#4F46E5" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BottomSheetView>
    </Sheet>
  );
});

export default ToiletFinderSheet;
