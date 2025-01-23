import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');

const SpecialtyButton = ({
  icon,
  label,
  isSelected,
  onPress,
}: {
  icon: string;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.specialtyButton} onPress={onPress}>
    <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
      <Ionicons name={icon as any} size={24} color={isSelected ? '#fff' : '#5B85D9'} />
    </View>
    <Text
      style={[
        styles.specialtyLabel,
        isSelected && styles.selectedSpecialtyLabel,
        { fontFamily: 'Poppins' },
      ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const DayButton = ({
  day,
  date,
  isSelected,
  onPress,
}: {
  day: string;
  date: string;
  isSelected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.dayButton, isSelected && styles.selectedDayButton]}
    onPress={onPress}>
    <Text style={[styles.dayText, isSelected && styles.selectedDayText, { fontFamily: 'Poppins' }]}>
      {day}
    </Text>
    <Text
      style={[styles.dateText, isSelected && styles.selectedDateText, { fontFamily: 'Poppins' }]}>
      {date}
    </Text>
  </TouchableOpacity>
);

const DoctorCard = ({
  name,
  specialty,
  rating,
  sessions,
  experience,
  image,
  fee,
}: {
  name: string;
  specialty: string;
  rating: string;
  sessions: string;
  experience: string;
  image: any;
  fee: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [loaded, error] = useFonts({
    Poppins: require('../assets/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <Animated.View style={[styles.doctorCard, expanded && styles.expandedCard]}>
      <TouchableOpacity
        style={styles.doctorInfo}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.9}>
        <View style={styles.doctorDetails}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={[styles.ratingText, { fontFamily: 'Poppins' }]}>{rating}</Text>
          </View>
          <Text
            style={[styles.specialty, expanded && { color: '#fff' }, { fontFamily: 'Poppins' }]}>
            {specialty}
          </Text>
          <Text
            style={[styles.doctorName, expanded && { color: '#fff' }, { fontFamily: 'Poppins' }]}>
            {name}
          </Text>
          <Text style={[styles.sessions, expanded && { color: '#fff' }, { fontFamily: 'Poppins' }]}>
            {sessions} Sessions
          </Text>
          <View style={styles.additionalInfo}>
            <Text
              style={[styles.experience, expanded && { color: '#fff' }, { fontFamily: 'Poppins' }]}>
              {experience} Years Experience
            </Text>
            <Text style={[styles.fee, { fontFamily: 'Poppins' }]}>₹{fee}/Session</Text>
          </View>
        </View>
        <Image source={image} style={styles.doctorImage} />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.availabilityContainer}>
          <Text style={[styles.availabilityText, { fontFamily: 'Poppins' }]}>
            Available Time Slots
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 9 }).map((_, index) => (
              <DayButton
                key={index}
                day={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'][index]}
                date={String(17 + index)}
                isSelected={selectedDay === index}
                onPress={() => setSelectedDay(index)}
              />
            ))}
          </ScrollView>

          <View style={styles.timeSlots}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['9:00 AM', '10:30 AM', '2:00 PM', '4:30 PM', '6:00 PM'].map((time, index) => (
                <TouchableOpacity key={index} style={styles.timeSlot}>
                  <Text style={[styles.timeSlotText, { fontFamily: 'Poppins' }]}>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.bookButton}>
            <Text style={[styles.bookButtonText, { fontFamily: 'Poppins' }]}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

const Doctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(0);

  const doctors = [
    {
      name: 'Dr. William James',
      specialty: 'Neurologist',
      rating: '4.8',
      sessions: '896',
      experience: '15',
      fee: '1500',
      image: require('../assets/doctor.png'),
    },
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: '4.9',
      sessions: '1250',
      experience: '12',
      fee: '2000',
      image: require('../assets/doctor.png'),
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Orthopedist',
      rating: '4.7',
      sessions: '756',
      experience: '10',
      fee: '1800',
      image: require('../assets/doctor.png'),
    },
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Doctors', headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { fontFamily: 'Poppins' }]}>Hello Nitish 👋</Text>
            <Text style={[styles.subtitle, { fontFamily: 'Poppins' }]}>Find your specialist</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.specialtiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { icon: 'brain', label: 'Neurologist' },
              { icon: 'heart', label: 'Cardiologist' },
              { icon: 'body', label: 'Orthopedist' },
              { icon: 'fitness', label: 'Pulmonologist' },
              { icon: 'medical', label: 'Dentist' },
              { icon: 'eye', label: 'Ophthalmologist' },
            ].map((specialty, index) => (
              <SpecialtyButton
                key={index}
                {...specialty}
                isSelected={selectedSpecialty === index}
                onPress={() => setSelectedSpecialty(index)}
              />
            ))}
          </ScrollView>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.doctorsContainer}>
          <View style={styles.topDoctorsHeader}>
            <Text style={[styles.topDoctorsTitle, { fontFamily: 'Poppins' }]}>Top Doctors</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { fontFamily: 'Poppins' }]}>See All</Text>
            </TouchableOpacity>
          </View>

          {doctors.map((doctor, index) => (
            <DoctorCard key={index} {...doctor} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F4FF',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  specialtiesContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  specialtyButton: {
    alignItems: 'center',
    marginRight: 1,
    padding: 8,
    borderRadius: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedIconContainer: {
    backgroundColor: '#5B85D9',
  },
  specialtyLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedSpecialtyLabel: {
    color: '#5B85D9',
  },
  topDoctorsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  topDoctorsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  seeAllText: {
    color: '#5B85D9',
    fontWeight: '600',
  },
  doctorsContainer: {
    padding: 16,
    gap: 16,
  },
  doctorCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  expandedCard: {
    backgroundColor: '#5B85D9',
  },
  doctorInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  doctorDetails: {
    flex: 1,
    marginRight: 16,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  specialty: {
    color: '#666',
    marginTop: 4,
    fontSize: 14,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  sessions: {
    color: '#666',
    fontSize: 14,
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 16,
  },
  experience: {
    color: '#666',
    fontSize: 14,
  },
  fee: {
    color: '#5B85D9',
    fontWeight: '600',
    fontSize: 14,
  },
  availabilityContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
  },
  availabilityText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1A1A1A',
  },
  dayButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 16,
    alignItems: 'center',
    marginRight: 8,
    width: 48,
  },
  selectedDayButton: {
    backgroundColor: '#5B85D9',
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 4,
  },
  selectedDateText: {
    color: '#fff',
  },
  selectedDayText: {
    color: '#fff',
  },
  timeSlots: {
    marginTop: 16,
  },
  timeSlot: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  timeSlotText: {
    color: '#1A1A1A',
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#5B85D9',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Doctors;
