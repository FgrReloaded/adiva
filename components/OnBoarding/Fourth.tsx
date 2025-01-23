import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { Text } from '../nativewindui/Text';
import { cn } from '~/lib/cn';
import { Icon } from '@roninoss/icons';
import Checkbox from 'expo-checkbox';

export const FitnessGoalsStep = () => {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const goals = [
    {
      title: 'Weight Loss',
      description: 'Reduce body weight and fat percentage',
      icon: 'scale',
    },
    {
      title: 'Muscle Gain',
      description: 'Build strength and muscle mass',
      icon: 'arm-flex',
    },
    {
      title: 'Endurance',
      description: 'Improve cardiovascular fitness',
      icon: 'heart-pulse',
    },
    {
      title: 'Flexibility',
      description: 'Enhance mobility and flexibility',
      icon: 'yoga',
    },
  ];

  const toggleGoal = (index: number) => {
    setSelectedGoals((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      return [...prev, index];
    });
  };

  return (
    <ScrollView>
      <View className="mt-10 space-y-4">
        <Text className="mb-4 text-center text-xl font-bold text-black">
          What are your fitness goals?
        </Text>
        <Text className="mb-4 text-center text-sm text-gray-600">Select all that apply</Text>
        <View className="flex flex-col gap-4">
          {goals.map((goal, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleGoal(index)}
              className={cn(
                'flex-row items-center rounded-3xl border border-gray-200 p-4 hover:border-violet-600 active:bg-violet-50',
                selectedGoals.includes(index) && 'border-violet-600 bg-violet-100'
              )}>
              <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-violet-100">
                <Icon
                  name={goal.icon}
                  size={24}
                  color="#4630EB"
                  ios={{ renderingMode: 'hierarchical' }}
                />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">{goal.title}</Text>
                <Text className="text-sm text-gray-600">{goal.description}</Text>
              </View>
              <Checkbox
                style={{ height: 24, width: 24, borderRadius: 10 }}
                value={selectedGoals.includes(index)}
                onValueChange={() => toggleGoal(index)}
                color={selectedGoals.includes(index) ? '#4630EB' : undefined}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
