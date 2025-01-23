import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Text } from 'expo-dynamic-fonts';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const HealthEducation = () => {
  const exerciseVideos = [
    {
      id: '1',
      title: 'Pelvic Floor Workout',
      duration: '10m',
      level: 'Beginner',
      calories: '250',
      image: require('../assets/exercise-1.jpg'),
    },
    {
      id: '2',
      title: 'Period Hygiene: Tampons...',
      duration: '2m',
      level: 'All Levels',
      image: require('../assets/exercise-2.jpg'),
    },
  ];

  const exercises = [
    {
      id: '1',
      duration: '10m',
      level: 'Beginner',
      calories: '250',
      image: require('../assets/p02.jpg'),
    },
    {
      id: '2',
      title: 'What is a tampon, how to use it?',
      duration: '5m',
      level: 'All Levels',
      image: require('../assets/temp.jpg'),
    },
  ];
  const pelvicExercise = [
    {
      id: '1',
      title: 'Yoga For PERIOD CRAMP Relief ',
      duration: '10m',
      level: 'Beginner',
      calories: '250',
      image: require('../assets/p-1.jpg'),
    },
    {
      id: '2',
      title: 'Period Hygiene: Tampons...',
      duration: '2m',
      level: 'All Levels',
      image: require('../assets/p02.jpg'),
    },
  ];

  const healthBlogs = [
    {
      id: '1',
      title: 'How to make a Period Kit',
      readTime: '5 min',
      category: ['Menstrual Hygiene'],
      author: 'Dr. Sarah Chen',
    },
    {
      id: '2',
      title: 'Importance of regular Gynaecological check-ups',
      readTime: '4 min',
      category: ['Awareness', 'Menstrual Health'],
      author: 'Dr. Michael Brown',
    },
  ];

  const dailyTips = [
    {
      id: '1',
      title: 'Hydration',
      description: 'Drink 8 glasses of water daily',
      icon: 'water-outline',
    },
    {
      id: '2',
      title: 'Hand Washing',
      description: 'Wash hands for 20 seconds',
      icon: 'hand-wash-outline',
    },
  ];
  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text font="Poppins" style={styles.greeting}>
          Welcome back,
        </Text>
        <Text font="PoppinsBold" style={styles.username}>
          Health & Hygiene
        </Text>
        <Text font="PoppinsBold" style={styles.username}>
          Education
        </Text>
      </View>
      <TouchableOpacity style={styles.profileButton}>
        <LinearGradient colors={['#4F46E5', '#3730A3']} style={styles.profileGradient}>
          <MaterialCommunityIcons name="account" size={24} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderExerciseVideos = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text font="PoppinsBold" style={styles.sectionTitle}>
          Recommendations
        </Text>
        <TouchableOpacity>
          <Text style={styles.seeAllButton}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.videoScroll}>
        {exerciseVideos.map((video) => (
          <TouchableOpacity key={video.id} style={styles.videoCard}>
            <Image source={video.image} style={styles.videoImage} resizeMode="cover" />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.videoGradient}>
              <View style={styles.videoInfo}>
                <Text font="PoppinsBold" style={styles.videoTitle}>
                  {video.title}
                </Text>
                <View style={styles.videoStats}>
                  <View style={styles.videoStat}>
                    <Ionicons name="time-outline" size={14} color="#FFFFFF" />
                    <Text style={styles.videoStatText}>{video.duration}</Text>
                  </View>
                  {video.calories && (
                    <View style={styles.videoStat}>
                      <FontAwesome5 name="fire" size={14} color="#FFFFFF" />
                      <Text style={styles.videoStatText}>{video.calories} cal</Text>
                    </View>
                  )}
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
  const renderExercise = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text font="PoppinsBold" style={styles.sectionTitle}>
          Hygiene Products Usage
        </Text>
        <TouchableOpacity>
          <Text style={styles.seeAllButton}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.videoScroll} className="flex flex-wrap justify-center">
        {exercises.map((video) => (
          <TouchableOpacity key={video.id} style={styles.card}>
            <Image source={video.image} style={styles.videoImage} resizeMode="cover" />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.videoGradient}>
              <View style={styles.videoInfo}>
                <Text font="PoppinsBold" style={styles.videoTitle}>
                  {video.title}
                </Text>
                <View style={styles.videoStats}>
                  <View style={styles.videoStat}>
                    <Ionicons name="time-outline" size={14} color="#FFFFFF" />
                    <Text style={styles.videoStatText}>{video.duration}</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
  const renderPelvicExercise = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text font="PoppinsBold" style={styles.sectionTitle}>
          Pelvic Health
        </Text>
        <TouchableOpacity>
          <Text style={styles.seeAllButton}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.videoScroll} className="flex flex-wrap justify-center">
        {pelvicExercise.map((video) => (
          <TouchableOpacity key={video.id} style={styles.card}>
            <Image source={video.image} style={styles.videoImage} resizeMode="cover" />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.videoGradient}>
              <View style={styles.videoInfo}>
                <View style={styles.videoStats}>
                  <View style={styles.videoStat}>
                    <Ionicons name="time-outline" size={14} color="#FFFFFF" />
                    <Text style={styles.videoStatText}>{video.duration}</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderHealthBlogs = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text font="PoppinsBold" style={styles.sectionTitle}>
          Latest Articles
        </Text>
        <TouchableOpacity>
          <Text style={styles.seeAllButton}>See All</Text>
        </TouchableOpacity>
      </View>
      {healthBlogs.map((blog) => (
        <TouchableOpacity key={blog.id} style={styles.blogCard}>
          <View style={styles.blogInfo}>
            <View
              style={{
                display: 'flex',
                gap: '6',
                flexDirection: 'row',
              }}>
              {blog.category.map((cat) => (
                <View style={styles.blogCategory}>
                  <Text style={styles.blogCategoryText}>{cat}</Text>
                </View>
              ))}
            </View>
            <Text font="PoppinsBold" style={styles.blogTitle}>
              {blog.title}
            </Text>
            <View style={styles.blogMeta}>
              <Text style={styles.blogAuthor}>{blog.author}</Text>
              <View style={styles.blogDot} />
              <Text style={styles.blogReadTime}>{blog.readTime} read</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#4F46E5" />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderDailyTips = () => (
    <View style={[styles.section, styles.tipsSection]}>
      <Text font="PoppinsBold" style={styles.sectionTitle}>
        Quick Health Tips
      </Text>
      <View style={styles.tipsContainer}>
        {dailyTips.map((tip) => (
          <View key={tip.id} style={styles.tipCard}>
            <LinearGradient colors={['#4F46E5', '#3730A3']} style={styles.tipIconContainer}>
              <MaterialCommunityIcons name={tip.icon} size={24} color="#FFFFFF" />
            </LinearGradient>
            <Text font="PoppinsBold" style={styles.tipTitle}>
              {tip.title}
            </Text>
            <Text style={styles.tipDescription}>{tip.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {renderHeader()}
          {renderExerciseVideos()}
          {renderExercise()}
          {renderPelvicExercise()}
          {renderHealthBlogs()}
          {renderDailyTips()}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 4,
  },
  username: {
    fontSize: 24,
    color: '#1E293B',
  },
  profileButton: {
    borderRadius: 40,
    overflow: 'hidden',
  },
  profileGradient: {
    padding: 12,
    borderRadius: 40,
  },
  progressCard: {
    margin: 20,
    borderRadius: 24,
    padding: 24,
  },
  progressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  progressStats: {
    fontSize: 16,
    color: '#E2E8F0',
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    width: 200,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressLabel: {
    fontSize: 12,
    color: '#E2E8F0',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1E293B',
  },
  seeAllButton: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '600',
  },
  videoScroll: {
    paddingLeft: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  videoCard: {
    width: width * 0.7,
    height: 200,
    borderRadius: 24,
    marginRight: 16,
    overflow: 'hidden',
    marginTop: 4,
  },
  card: {
    width: width * 0.4,
    height: 120,
    borderRadius: 24,
    marginRight: 16,
    overflow: 'hidden',
    marginTop: 4,
  },
  videoImage: {
    width: '100%',
    height: '100%',
  },
  videoGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  videoInfo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  videoTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  videoStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  videoStatText: {
    color: '#FFFFFF',
    marginLeft: 4,
    fontSize: 14,
  },
  blogCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  blogCategory: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  blogCategoryText: {
    color: '#4F46E5',
    fontSize: 12,
    fontWeight: '600',
  },
  blogInfo: {
    flex: 1,
    marginRight: 16,
  },
  blogTitle: {
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 8,
  },
  blogMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blogAuthor: {
    fontSize: 14,
    color: '#64748B',
  },
  blogDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 8,
  },
  blogReadTime: {
    fontSize: 14,
    color: '#64748B',
  },
  tipsSection: {
    marginBottom: 32,
  },
  tipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  tipCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  tipDescription: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});

export default HealthEducation;
