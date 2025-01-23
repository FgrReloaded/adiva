import { Icon } from '@roninoss/icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import HealthFocusStep from '~/components/OnBoarding/First';
import { FitnessGoalsStep } from '~/components/OnBoarding/Fourth';
import { PersonalInfoStep } from '~/components/OnBoarding/Second';
import { ActivityLevelStep } from '~/components/OnBoarding/Third';
import { Text } from '~/components/nativewindui/Text';

const HealthOnboarding = () => {
  const [step, setStep] = useState(1);
  const [loaded, error] = useFonts({
    Poppins: require('../assets/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <HealthFocusStep />;
      case 2:
        return <PersonalInfoStep />;
      case 3:
        return <ActivityLevelStep />;
      case 4:
        return <FitnessGoalsStep />;
    }
  };
  return (
    <>
      <Stack.Screen options={{ title: 'Health Profile', headerShown: false }} />
      <View className="flex-1 bg-white p-6 py-12">
        <View className="mb-8">
          <Text
            style={{ fontFamily: 'Poppins' }}
            className="text-center text-xl font-bold text-violet-700">
            Health Profile
          </Text>
          <Text style={{ fontFamily: 'Poppins' }} className="mt-2 text-center text-gray-600">
            Help us personalize your health journey by selecting your primary focus
          </Text>
        </View>

        {renderStep()}

        <View className="mt-8 flex-row justify-center gap-4 space-x-2">
          <View
            className={`h-2 w-2 rounded-full ${step === 1 ? 'bg-violet-600' : 'bg-gray-300'}`}
          />
          <View
            className={`h-2 w-2 rounded-full ${step === 2 ? 'bg-violet-600' : 'bg-gray-300'}`}
          />
          <View
            className={`h-2 w-2 rounded-full ${step === 3 ? 'bg-violet-600' : 'bg-gray-300'}`}
          />
          <View
            className={`h-2 w-2 rounded-full ${step === 4 ? 'bg-violet-600' : 'bg-gray-300'}`}
          />
        </View>

        <View className="mt-8 flex-row justify-between">
          <TouchableOpacity
            className="w-36 rounded-3xl border border-zinc-400 px-6 py-3"
            onPress={() => setStep(step - 1)}>
            <View className="flex-row gap-2">
              <Icon
                name="arrow-left"
                size={24}
                color="#000"
                ios={{ renderingMode: 'hierarchical' }}
              />
              <Text className="text-black">Back</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-36 rounded-3xl bg-violet-600 px-6 py-3"
            onPress={() => setStep(step + 1)}>
            <View className="flex-row gap-2">
              <Text className="text-white">Continue</Text>
              <Icon
                name="arrow-right"
                size={24}
                color="#fff"
                ios={{ renderingMode: 'hierarchical' }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default HealthOnboarding;
