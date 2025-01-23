import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'expo-dynamic-fonts';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, ScrollView, Animated, TouchableOpacity, Pressable, ViewStyle } from 'react-native';

import HealthMetricsDashboard from '~/components/Dashboard';

const MenuItem = ({
  iconName,
  title,
  description,
  bgColor,
  onPress,
}: {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
  bgColor: string;
  onPress?: () => void;
}) => (
  <Pressable onPress={onPress} className={`mb-3 rounded-xl ${bgColor} p-4 active:opacity-80`}>
    <View className="flex-row items-center">
      <View className="mr-4 rounded-lg bg-white/20 p-2">
        <MaterialCommunityIcons name={iconName} size={24} color="white" />
      </View>
      <View className="flex-1">
        <Text font="Poppins" className="text-lg font-semibold text-white">
          {title}
        </Text>
        <Text font="Poppins" className="mt-1 text-sm text-white/80">
          {description}
        </Text>
      </View>
    </View>
  </Pressable>
);

const QuickAction = ({
  iconName,
  title,
  bgColor,
  onPress,
}: {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  bgColor: string;
  onPress?: () => void;
}) => (
  <Pressable onPress={onPress} className={`${bgColor} mx-1 flex-1 rounded-xl p-4`}>
    <View className="items-center">
      <MaterialCommunityIcons name={iconName} size={24} color="white" />
      <Text font="Poppins" className="mt-2 text-center text-sm text-white">
        {title}
      </Text>
    </View>
  </Pressable>
);
export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const LanguageButton = ({
    label,
    color,
    style,
  }: {
    label: string;
    color: string;
    style: ViewStyle;
  }) => (
    <View style={[style, { position: 'absolute', right: 0 }]}>
      <TouchableOpacity
        className={`h-12 w-20 items-center justify-center rounded-full ${color} shadow-lg`}
        onPress={() => {
          console.log(`Selected language: ${label}`);
          toggleMenu();
        }}>
        <Text className="text-sm font-bold text-white">{label}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView className="flex-1">
        <View className="bg-white px-6 pb-4 pt-12">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Text className="text-lg font-bold text-blue-600">JD</Text>
              </View>
              <View>
                <Text font="Poppins" className="text-2xl text-gray-800">
                  Hello, Pragya!
                </Text>
                <Text font="Poppins" className="text-gray-500">
                  Have a great day ahead
                </Text>
              </View>
            </View>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#666" />
          </View>
        </View>
        <View className="p-4">
          <View className="mb-4 rounded-2xl bg-white py-4">
            <View className="mb-4 flex-row items-center justify-between px-4">
              <Text font="Poppins" className="text-lg text-gray-800">
                Health Overview
              </Text>
              <Text font="Poppins" className="text-blue-500">
                Details →
              </Text>
            </View>
            <HealthMetricsDashboard />
          </View>
          <View className="mb-6 flex-row justify-between">
            <QuickAction
              onPress={() => router.push('/education')}
              iconName="book-education"
              title="Education"
              bgColor="bg-blue-500"
            />
            <QuickAction
              onPress={() => router.push('/scanner')}
              iconName="camera"
              title="AI Medicine Scanner"
              bgColor="bg-purple-500"
            />
          </View>
          <Text font="Poppins" className="mb-4 text-xl font-bold text-gray-800">
            Services
          </Text>
          <MenuItem
            iconName="map-marker-radius"
            title="CleanStop Finder"
            onPress={() => router.push('/locator')}
            description="Find clean washrooms nearby"
            bgColor="bg-emerald-500"
          />

          <MenuItem
            iconName="doctor"
            title="DoctorAccess Hub"
            description="Book appointments with experts"
            bgColor="bg-blue-500"
            onPress={() => router.push('/doctors')}
          />

          <MenuItem
            iconName="pill"
            title="PharmaReach"
            description="Order hygiene products"
            bgColor="bg-purple-500"
            onPress={() => router.push('/pharma')}
          />

          <MenuItem
            iconName="chat-processing"
            title="PureCare Assistant"
            description="Get personalized health advice"
            bgColor="bg-amber-500"
            onPress={() => router.push('/chatbot')}
          />

          <MenuItem
            iconName="chart-line"
            title="WellnessFlow"
            description="Track your health metrics"
            bgColor="bg-cyan-500"
            onPress={() => router.push('/tracker')}
          />
        </View>{' '}
      </ScrollView>

      <View className="absolute bottom-6 right-6">
        <View className={`${isOpen ? 'flex' : 'hidden'} mb-4`}>
          <LanguageButton label="English" color="bg-blue-500" style={{ bottom: 100 }} />
          <LanguageButton label="Hindi" color="bg-red-500" style={{ bottom: 50 }} />
          <LanguageButton label="অসমীয়া" color="bg-yellow-500" style={{ bottom: 0 }} />
        </View>
        <TouchableOpacity
          onPress={toggleMenu}
          className="h-14 w-14 items-center justify-center rounded-full bg-gray-800 shadow-lg">
          <Animated.View>
            <MaterialCommunityIcons name="phone" className="-rotate-12" size={24} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
