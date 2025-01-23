import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";

type Metric = {
  title: string;
  value: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  trend: number | null;
  description: string;
  progress: number;
};

const MetricCard = ({
  title,
  value,
  icon,
  color,
  trend,
  description,
  progress,
}: {
  title: string;
  value: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  trend?: number | null;
  description: string;
  progress: number;
}) => {
  return (
    <View className="w-[48%] mb-4">
      <LinearGradient
        colors={["#FFFFFF", `${color}15`]}
        className="rounded-3xl p-5 h-[180px]"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-4">
            <View
              className="p-2.5 rounded-2xl"
              style={{ backgroundColor: `${color}20` }}
            >
              <MaterialCommunityIcons name={icon} size={24} color={color} />
            </View>
            {trend !== null && trend !== undefined && (
              <View
                className={`px-2.5 py-1 rounded-full ${
                  trend > 0 ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    trend > 0 ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
                </Text>
              </View>
            )}
          </View>

          <View className="flex-1">
            <Text className="text-sm font-medium text-gray-600 mb-1">
              {title}
            </Text>
            <Text className="text-xl font-bold text-gray-900 mb-1">
              {value}
            </Text>
            <Text className="text-xs text-gray-500 mb-3">{description}</Text>
            {progress && (
              <View className="mt-auto">
                <Progress
                  value={progress}
                  className="h-1.5 bg-gray-100 rounded-full overflow-hidden"
                  indicatorClassName={`rounded-full`}
                  style={{ backgroundColor: color }}
                />
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const HealthMetricsDashboard = () => {
  const metrics: Metric[] = [
    {
      title: "Overall Health",
      value: "92%",
      icon: "heart-plus",
      color: "#4CAF50",
      trend: 3,
      description: "Excellent condition",
      progress: 92,
    },
    {
      title: "Sleep Quality",
      value: "7h 45m",
      icon: "moon-waning-crescent",
      color: "#4B9EF4",
      trend: 8,
      description: "Deep sleep improved",
      progress: 85,
    },
    {
      title: "Cycle Tracking",
      value: "Day 14",
      icon: "calendar-heart",
      color: "#F46B7A",
      trend: null,
      description: "Ovulation window",
      progress: 50,
    },
    {
      title: "Stress Level",
      value: "Low",
      icon: "meditation",
      color: "#F4B162",
      trend: -15,
      description: "Based on HRV analysis",
      progress: 75,
    },
    {
      title: "Activity Level",
      value: "6,832",
      icon: "run",
      color: "#63C5B4",
      trend: 12,
      description: "Steps - Meeting daily goal",
      progress: 68,
    },
    {
      title: "Nutrition",
      value: "1,850 cal",
      icon: "food-apple",
      color: "#9B6B9E",
      trend: 5,
      description: "Balanced macros achieved",
      progress: 90,
    },
    {
      title: "Iron Levels",
      value: "95 mg/L",
      icon: "water",
      color: "#FF7043",
      trend: 2,
      description: "Within optimal range",
      progress: 85,
    },
    {
      title: "Mood Track",
      value: "Positive",
      icon: "emoticon-happy",
      color: "#9575CD",
      trend: 10,
      description: "Based on daily logs",
      progress: 80,
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 pt-4 flex-row flex-wrap justify-between">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </View>
    </ScrollView>
  );
};

export default HealthMetricsDashboard;
