import { Ionicons } from '@expo/vector-icons';
import { Text } from 'expo-dynamic-fonts';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Enhanced color palette for elegance
const COLORS = {
  primary: '#8B5CF6', // Rich purple
  secondary: '#DBEAFE', // Soft blue
  accent: '#F0ABFC', // Gentle pink
  success: '#34D399', // Mint green
  warning: '#FBBF24', // Warm yellow
  background: '#FFFFFF',
  surfaceLight: '#F9FAFB',
  text: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB',
};

// Mood options with icons and colors
const MOODS = [
  { id: 1, icon: 'happy-outline', label: 'Great', color: COLORS.success },
  { id: 2, icon: 'sad-outline', label: 'Low', color: COLORS.warning },
  { id: 3, icon: 'water-outline', label: 'Calm', color: COLORS.primary },
  { id: 4, icon: 'thunderstorm-outline', label: 'Stressed', color: COLORS.accent },
];

// Symptom options
const SYMPTOMS = [
  { id: 1, label: 'Cramps', icon: 'fitness-outline' },
  { id: 2, label: 'Headache', icon: 'medical-outline' },
  { id: 3, label: 'Fatigue', icon: 'bed-outline' },
  { id: 4, label: 'Bloating', icon: 'water-outline' },
];

const PeriodTracker = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [periodDates, setPeriodDates] = useState({});
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(0);


  const markedDates = {
    ...periodDates,
    [selectedDate]: {
      selected: true,
      selectedColor: COLORS.primary,
    },
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setPeriodDates((prev) => ({
      ...prev,
      [day.dateString]: {
        marked: true,
        dotColor: COLORS.accent,
      },
    }));
  };

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId) ? prev.filter((id) => id !== symptomId) : [...prev, symptomId]
    );
  };

  const CycleStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Text font="PoppinsBold" style={styles.statValue}>
          28
        </Text>
        <Text font="Poppins" style={styles.statLabel}>
          Cycle Days
        </Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.stat}>
        <Text font="PoppinsBold" style={styles.statValue}>
          5
        </Text>
        <Text font="Poppins" style={styles.statLabel}>
          Period Days
        </Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.stat}>
        <Text font="PoppinsBold" style={styles.statValue}>
          14
        </Text>
        <Text font="Poppins" style={styles.statLabel}>
          Until Next
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Tracker', headerShown: false }} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View style={styles.header}>
          <View>
            <Text font="PoppinsBold" style={styles.title}>
              Period Tracker
            </Text>
            <Text font="Poppins" style={styles.subtitle}>
              Track your cycle with ease
            </Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </Animated.View>
        <View>
          <Text
            style={{ fontFamily: 'Poppins' }}
            className="text-foreground/50 text-center text-sm font-semibold">
            Select Period Dates
          </Text>
        </View>

        <Animated.View style={styles.calendarContainer}>
          <Calendar
            theme={{
              calendarBackground: COLORS.background,
              textSectionTitleColor: COLORS.primary,
              selectedDayBackgroundColor: COLORS.primary,
              selectedDayTextColor: COLORS.background,
              todayTextColor: COLORS.primary,
              dayTextColor: COLORS.text,
              textDisabledColor: COLORS.textLight,
              dotColor: COLORS.accent,
              monthTextColor: COLORS.primary,
              indicatorColor: COLORS.primary,
              arrowColor: COLORS.primary,
            }}
            markedDates={markedDates}
            onDayPress={onDayPress}
            enableSwipeMonths
          />
        </Animated.View>

        <CycleStats />

        <View style={styles.moodSection}>
          <Text font="PoppinsBold" style={styles.sectionTitle}>
            How are you feeling?
          </Text>
          <View style={styles.moodGrid}>
            {MOODS.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodItem,
                  selectedMood === mood.id && { backgroundColor: mood.color + '20' },
                ]}
                onPress={() => setSelectedMood(mood.id)}>
                <Ionicons
                  name={mood.icon}
                  size={24}
                  color={selectedMood === mood.id ? mood.color : COLORS.textLight}
                />
                <Text
                  font="Poppins"
                  style={[styles.moodLabel, selectedMood === mood.id && { color: mood.color }]}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.symptomsSection}>
          <Text font="PoppinsBold" style={styles.sectionTitle}>
            Symptoms
          </Text>
          <View style={styles.symptomsGrid}>
            {SYMPTOMS.map((symptom) => (
              <TouchableOpacity
                key={symptom.id}
                style={[
                  styles.symptomItem,
                  selectedSymptoms.includes(symptom.id) && styles.symptomSelected,
                ]}
                onPress={() => toggleSymptom(symptom.id)}>
                <Ionicons
                  name={symptom.icon}
                  size={20}
                  color={selectedSymptoms.includes(symptom.id) ? COLORS.primary : COLORS.textLight}
                />
                <Text
                  font="Poppins"
                  style={[
                    styles.symptomLabel,
                    selectedSymptoms.includes(symptom.id) && styles.symptomLabelSelected,
                  ]}>
                  {symptom.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <LinearGradient
            colors={[COLORS.primary, '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}>
            <Text font="PoppinsBold" style={styles.saveButtonText}>Save Entry</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: 4,
  },
  settingsButton: {
    padding: 8,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 12,
  },
  calendarContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    margin: 16,
    backgroundColor: COLORS.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    margin: 16,
    padding: 16,
    borderRadius: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: COLORS.border,
  },
  moodSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 8,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: '23%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 16,
    padding: 8,
  },
  moodLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  symptomsSection: {
    paddingHorizontal: 16,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  symptomSelected: {
    backgroundColor: COLORS.primary + '20',
  },
  symptomLabel: {
    marginLeft: 6,
    color: COLORS.textLight,
    fontSize: 14,
  },
  symptomLabelSelected: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  saveButton: {
    margin: 16,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  gradient: {
    paddingVertical: 16,
  },
  saveButtonText: {
    color: COLORS.background,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PeriodTracker;
