import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

const ProgressBar = ({ progress, color }) => (
  <View className="mt-2 h-1.5">
    <View className="flex-1 overflow-hidden rounded" style={{ backgroundColor: color + '20' }}>
      <View
        className="h-full rounded"
        style={{
          backgroundColor: color,
          width: `${progress}%`,
        }}
      />
    </View>
  </View>
);

const MetricCard = ({ title, value, icon, color, trend, description, progress }) => (
  <TouchableOpacity className="w-[48%] rounded-2xl shadow-md">
    <LinearGradient
      colors={['#FFFFFF', color + '10']}
      className="h-48 rounded-2xl bg-white p-4"
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      {/* Header */}
      <View className="mb-2 flex-row items-center justify-between">
        <View className="rounded-xl p-2" style={{ backgroundColor: color + '20' }}>
          <MaterialCommunityIcons name={icon} size={20} color={color} />
        </View>
        {trend && (
          <View
            className="rounded-lg px-2 py-0.5"
            style={{
              backgroundColor: trend > 0 ? '#E6F4EA' : '#FCE8E8',
            }}>
            <Text
              className="text-xs font-semibold"
              style={{
                color: trend > 0 ? '#137333' : '#C5221F',
              }}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View className="flex-1 justify-between">
        <View>
          <Text className="mb-1 text-sm font-medium text-gray-700">{title}</Text>
          <Text className="text-xl font-bold text-gray-900">{value}</Text>
          <Text className="text-xs text-gray-600">{description}</Text>
        </View>
        {progress && <ProgressBar progress={progress} color={color} />}
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const HealthMetricsDashboard = () => {
  // Group metrics by category
  const metrics = {
    primaryMetrics: [
      {
        title: 'Overall Health',
        value: '92%',
        icon: 'heart-plus',
        color: '#4CAF50',
        trend: 3,
        description: 'Excellent condition',
        progress: 92,
      },
      {
        title: 'Sleep Quality',
        value: '7h 45m',
        icon: 'moon-waning-crescent',
        color: '#4B9EF4',
        trend: 8,
        description: 'Deep sleep improved',
        progress: 85,
      },
    ],
    tracking: [
      {
        title: 'Cycle Tracking',
        value: 'Day 14',
        icon: 'calendar-heart',
        color: '#F46B7A',
        description: 'Ovulation window',
        progress: 50,
      },
      {
        title: 'Stress Level',
        value: 'Low',
        icon: 'meditation',
        color: '#F4B162',
        trend: -15,
        description: 'Based on HRV analysis',
        progress: 75,
      },
    ],
    lifestyle: [
      {
        title: 'Activity Level',
        value: '6,832',
        icon: 'run',
        color: '#63C5B4',
        trend: 12,
        description: 'Steps - Meeting goal',
        progress: 68,
      },
      {
        title: 'Nutrition',
        value: '1,850 cal',
        icon: 'food-apple',
        color: '#9B6B9E',
        trend: 5,
        description: 'Balanced macros',
        progress: 90,
      },
    ],
    health: [
      {
        title: 'Iron Levels',
        value: '95 mg/L',
        icon: 'water',
        color: '#FF7043',
        trend: 2,
        description: 'Within optimal range',
        progress: 85,
      },
      {
        title: 'Mood Track',
        value: 'Positive',
        icon: 'emoticon-happy',
        color: '#9575CD',
        trend: 10,
        description: 'Based on daily logs',
        progress: 80,
      },
    ],
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        {/* Primary Metrics */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900">Today's Overview</Text>
          <View className="flex-row flex-wrap justify-between">
            {metrics.primaryMetrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </View>
        </View>

        {/* Tracking */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900">Tracking</Text>
          <View className="flex-row flex-wrap justify-between">
            {metrics.tracking.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </View>
        </View>

        {/* Lifestyle */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900">Lifestyle</Text>
          <View className="flex-row flex-wrap justify-between">
            {metrics.lifestyle.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </View>
        </View>

        {/* Health Indicators */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-gray-900">Health Indicators</Text>
          <View className="flex-row flex-wrap justify-between">
            {metrics.health.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HealthMetricsDashboard;
