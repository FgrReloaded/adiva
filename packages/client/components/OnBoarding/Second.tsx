import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

import { Text } from '../nativewindui/Text';

export const PersonalInfoStep = () => {
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
  });

  return (
    <View className="mt-20 space-y-4">
      <Text className="mb-4 text-center text-xl font-bold text-black">Tell us about yourself</Text>
      <View className="space-y-6 px-6">
        <View>
          <Text className="mb-1 mt-2 text-base font-semibold text-gray-800">Age</Text>
          <TextInput
            className="rounded-2xl border border-indigo-100 bg-white p-4 text-base shadow-sm focus:border-indigo-500"
            placeholder="Enter your age"
            keyboardType="numeric"
            value={formData.age}
            onChangeText={(text) => setFormData({ ...formData, age: text })}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-1 mt-2 text-base font-semibold text-gray-800">Height (cm)</Text>
          <TextInput
            className="rounded-2xl border-2 border-indigo-100 bg-white p-4 text-base shadow-sm focus:border-indigo-500"
            placeholder="Enter your height"
            keyboardType="numeric"
            value={formData.height}
            onChangeText={(text) => setFormData({ ...formData, height: text })}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-1 mt-2 text-base font-semibold text-gray-800">Weight (kg)</Text>
          <TextInput
            className="rounded-2xl border-2 border-indigo-100 bg-white p-4 text-base shadow-sm focus:border-indigo-500"
            placeholder="Enter your weight"
            keyboardType="numeric"
            value={formData.weight}
            onChangeText={(text) => setFormData({ ...formData, weight: text })}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
    </View>
  );
};
