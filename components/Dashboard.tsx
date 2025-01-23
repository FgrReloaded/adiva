import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const SPACING = 16;

const ProgressBar = ({ progress, color }) => {
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { backgroundColor: color + '20' }]}>
        <View
          style={[
            styles.progress,
            {
              backgroundColor: color,
              width: `${progress}%`,
            },
          ]}
        />
      </View>
    </View>
  );
};

const MetricCard = ({ title, value, icon, color, trend, description, progress }) => {
  return (
    <TouchableOpacity style={styles.cardTouchable}>
      <LinearGradient
        colors={['#FFFFFF', color + '10']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <MaterialCommunityIcons name={icon} size={24} color={color} />
          </View>
          {trend && (
            <View
              style={[
                styles.trendContainer,
                {
                  backgroundColor: trend > 0 ? '#E6F4EA' : '#FCE8E8',
                },
              ]}>
              <Text
                style={[
                  styles.trendText,
                  {
                    color: trend > 0 ? '#137333' : '#C5221F',
                  },
                ]}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </Text>
            </View>
          )}
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.description}>{description}</Text>
          {progress && <ProgressBar progress={progress} color={color} />}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const HealthMetricsDashboard = () => {
  const metrics = [
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
    {
      title: 'Cycle Tracking',
      value: 'Day 14',
      icon: 'calendar-heart',
      color: '#F46B7A',
      trend: null,
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
    {
      title: 'Activity Level',
      value: '6,832',
      icon: 'run',
      color: '#63C5B4',
      trend: 12,
      description: 'Steps - Meeting daily goal',
      progress: 68,
    },
    {
      title: 'Nutrition',
      value: '1,850 cal',
      icon: 'food-apple',
      color: '#9B6B9E',
      trend: 5,
      description: 'Balanced macros achieved',
      progress: 90,
    },
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
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.metricsContainer}>
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: SPACING,
    paddingTop: SPACING * 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
  },
  metricsContainer: {
    padding: SPACING,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cardTouchable: {
    marginBottom: SPACING,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: 160,
  },
  card: {
    borderRadius: 16,
    padding: SPACING,
    backgroundColor: '#FFFFFF',
    height: 220
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 12,
  },
  trendContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  progressContainer: {
    height: 6,
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 3,
  },
});

export default HealthMetricsDashboard;
