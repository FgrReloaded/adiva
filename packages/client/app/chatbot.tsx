import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Text } from 'expo-dynamic-fonts'

const ChatScreen = () => {
  const [loaded, error] = useFonts({
    Poppins: require('../assets/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/health-bot.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.headerContent}>
            <Text style={[styles.headerText]} font="Poppins">PureCare AI</Text>
            <Text style={[styles.headerSubText, { fontFamily: 'Poppins' }]}>
              Your Health Assistant
            </Text>
          </View>
        </View>

        <ScrollView style={styles.chatSection} contentContainerStyle={styles.chatContent}>
          <View style={styles.assistantBubble}>
            <Text style={styles.assistantBubbleText}>
              Hi, I'm PureCare Ai Assistant, your personal health assistant. How can I help you today?
            </Text>
          </View>

          <View style={styles.userBubble}>
            <Text style={styles.userBubbleText}>
              Hi, I've been experiencing irregular periods and unusual discharge lately. I'm a bit concerned.
            </Text>
          </View>

          <View style={styles.assistantBubble}>
            <Text style={styles.assistantBubbleText}>
              I understand your concern. Let me help you assess the situation. Have you noticed any changes in your cycle length or flow compared to your usual pattern?
            </Text>
          </View>

          <View style={styles.userBubble}>
            <Text style={styles.userBubbleText}>
              Yes, my cycle has been unpredictable for the past 2 months. Sometimes it's early, sometimes late. And the discharge has a different color than usual.
            </Text>
          </View>

          <View style={styles.assistantBubble}>
            <Text style={styles.assistantBubbleText}>
              Based on your symptoms, this could be related to several factors. I'm checking your recent health data. I can see your stress levels have been elevated, and there are changes in your sleep patterns. These can affect your cycle.
            </Text>
          </View>

          <View style={styles.userBubble}>
            <Text style={styles.userBubbleText}>
              Yes, work has been quite stressful lately. Should I be worried about the discharge?
            </Text>
          </View>

          <View style={styles.assistantBubble}>
            <Text style={styles.assistantBubbleText}>
              While changes in discharge can be normal, it's important to monitor any unusual changes. I recommend scheduling an appointment with your gynecologist for a proper examination. Would you like me to show you available appointments?
            </Text>
          </View>

          <View style={styles.userBubble}>
            <Text style={styles.userBubbleText}>
              Yes, please. And is there anything I should do in the meantime?
            </Text>
          </View>

          <View style={styles.assistantBubble}>
            <Text style={styles.assistantBubbleText}>
              I recommend maintaining good hygiene practices, wearing breathable cotton underwear, and tracking your symptoms in the app. I'm also noticing your iron levels are slightly low - increasing iron-rich foods might help. Would you like some dietary recommendations?
            </Text>
          </View>

          <View style={styles.userBubble}>
            <Text style={styles.userBubbleText}>
              That would be helpful, thank you. I'll make sure to track everything carefully.
            </Text>
          </View>

          <View style={styles.assistantBubble}>
            <Text style={styles.assistantBubbleText}>
              I've added detailed tracking reminders to your dashboard. I'll also send you information about iron-rich foods and stress management techniques. Remember, your gynecologist will be best placed to provide a proper diagnosis. I've found three available appointments for next week - would you like to see them?
            </Text>
          </View>
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 90}
          style={{ width: '100%' }}>
          <View style={styles.inputSection}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Message FgrAI..."
                placeholderTextColor="#9BA3B2"
                multiline
              />
              <TouchableOpacity style={styles.attachButton}>
                <Text style={styles.attachButtonText}>📎</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.sendButton}>
              <Ionicons name="send" size={24} color="#FFFFFF" style={styles.sendButtonText} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'relative',
    paddingTop: Platform.OS === 'ios' ? 40 : (StatusBar.currentHeight ?? 0) + 10,
    paddingBottom: 10,
    backgroundColor: '#F5F5FF',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerText: {
    color: '#333333',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  headerSubText: {
    color: '#4A4AFF',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  chatSection: {
    flex: 1,
  },
  chatContent: {
    padding: 20,
    paddingBottom: 32,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4A4AFF',
    padding: 16,
    borderRadius: 24,
    borderTopRightRadius: 4,
    marginVertical: 8,
    maxWidth: '80%',
    shadowColor: '#4A4AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  userBubbleText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0FF',
    padding: 16,
    borderRadius: 24,
    borderTopLeftRadius: 4,
    marginVertical: 8,
    maxWidth: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  assistantBubbleText: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  receiptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5FF',
    padding: 16,
    borderRadius: 20,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  transactionAmount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4A4AFF',
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: '#F5F5FF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0FF',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333333',
    maxHeight: 100,
  },
  attachButton: {
    padding: 8,
  },
  attachButtonText: {
    fontSize: 22,
  },
  sendButton: {
    backgroundColor: '#4A4AFF',
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A4AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '600',
  },
  logoContainer: {
    position: 'absolute',
    top: 50,
    left: 25,
    backgroundColor: '#fff',
    borderRadius: 32,
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default ChatScreen;
