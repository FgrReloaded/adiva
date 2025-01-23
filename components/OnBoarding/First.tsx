import { Icon } from '@roninoss/icons';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';

import { Text } from '../nativewindui/Text';

import { cn } from '~/lib/cn';

const HealthFocusStep = () => {
  const [selectedFocus, setSelectedFocus] = useState([]);

  const focusAreas = [
    {
      id: 'general-wellness',
      title: 'General Wellness',
      description: 'Focus on overall health and well-being',
      icon: 'heart',
    },
    {
      id: 'fitness',
      title: 'Fitness Tracking',
      description: 'Monitor workouts and physical activity',
      icon: 'dumbbell',
    },
    {
      id: 'nutrition',
      title: 'Nutrition Monitoring',
      description: 'Track diet and eating habits',
      icon: 'food-apple',
    },
    {
      id: 'sleep',
      title: 'Sleep Quality',
      description: 'Monitor and improve sleep patterns',
      icon: 'moon',
    }
  ];

  const toggleSelection = (id) => {
    setSelectedFocus((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <ScrollView className="flex-1">
      <View className="mt-5 space-y-4 px-4 pb-6">
        <View className="space-y-2">
          <Text className="text-center text-xl font-bold text-gray-900">
            Select Your Health Focus Areas
          </Text>
        </View>

        <View className="mt-6 flex flex-col gap-4 w-full">
          {focusAreas.map((area) => (
            <TouchableOpacity
              key={area.id}
              onPress={() => toggleSelection(area.id)}
              className={cn(
                'flex-row items-center rounded-3xl border border-gray-200 p-4 active:bg-violet-50',
                selectedFocus.includes(area.id) && 'border-violet-600 bg-violet-50'
              )}>
              <View
                className={cn(
                  'mr-4 h-12 w-12 items-center justify-center rounded-full',
                  selectedFocus.includes(area.id) ? 'bg-violet-200' : 'bg-violet-100'
                )}>
                <Icon
                  name={area.icon}
                  size={24}
                  color="#4630EB"
                  ios={{ renderingMode: 'hierarchical' }}
                />
              </View>
              <View className="flex-1">
                <Text
                  className={cn(
                    'text-lg font-semibold',
                    selectedFocus.includes(area.id) ? 'text-violet-900' : 'text-gray-800'
                  )}>
                  {area.title}
                </Text>
                <Text className="text-sm text-gray-600">{area.description}</Text>
              </View>
              <Checkbox
                style={{ height: 24, width: 24, borderRadius: 10 }}
                value={selectedFocus.includes(area.id)}
                onValueChange={() => toggleSelection(area.id)}
                color={selectedFocus.includes(area.id) ? '#4630EB' : undefined}
              />
            </TouchableOpacity>
          ))}
        </View>

        {selectedFocus.length > 0 && (
          <View className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-4">
            <Text className="text-sm text-violet-700">
              {selectedFocus.length} area{selectedFocus.length !== 1 ? 's' : ''} selected
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HealthFocusStep;
