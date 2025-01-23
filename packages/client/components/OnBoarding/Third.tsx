import { Icon } from '@roninoss/icons';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '../nativewindui/Text';

import { cn } from '~/lib/cn';
import Checkbox from 'expo-checkbox';

export const ActivityLevelStep = () => {
  const [selected, setSelected] = useState(null);

  const activityLevels = [
    {
      title: 'Sedentary',
      description: 'Little to no regular exercise',
      icon: 'sofa',
    },
    {
      title: 'Lightly Active',
      description: 'Light exercise 1-3 days/week',
      icon: 'walk',
    },
    {
      title: 'Moderately Active',
      description: 'Moderate exercise 3-5 days/week',
      icon: 'run',
    },
    {
      title: 'Very Active',
      description: 'Hard exercise 6-7 days/week',
      icon: 'dumbbell',
    },
  ];

  return (
    <View className="mt-10 space-y-4">
      <Text className="mb-4 text-center text-xl font-bold text-black">
        What's your activity level?
      </Text>
      <View className="flex flex-col gap-4">
        {activityLevels.map((level, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelected(index)}
            className={cn(
              'flex-row items-center rounded-3xl border border-gray-200 p-4 hover:border-violet-600 active:bg-violet-50',
              selected === index && 'border-violet-600 bg-violet-100'
            )}>
            <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-violet-100">
              <Icon
                name={level.icon}
                size={24}
                color="#4630EB"
                ios={{ renderingMode: 'hierarchical' }}
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">{level.title}</Text>
              <Text className="text-sm text-gray-600">{level.description}</Text>
            </View>
            <Checkbox
              style={{ height: 24, width: 24, borderRadius: 10 }}
              value={selected === index}
              onValueChange={() => setSelected(index)}
              color={selected === index ? '#4630EB' : undefined}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
