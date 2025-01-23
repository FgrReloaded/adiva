import { Ionicons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Text } from 'expo-dynamic-fonts';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState, useRef } from 'react';
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
  Alert,
} from 'react-native';

const genAI = new GoogleGenerativeAI('AIzaSyCrRG2yo6jfoUuMG8P_qdxxCGJjQqcpdwU');

const SYSTEM_PROMPT = `You are PureCare AI, a compassionate and knowledgeable women's health assistant.
Your primary focus is on providing accurate, helpful information about women's health, hygiene, and wellness.
Key guidelines:
- Always maintain a professional yet empathetic tone
- Provide evidence-based information
- Recommend consulting healthcare professionals for serious concerns
- Focus on preventive care and education
- Be sensitive to cultural and personal preferences
- Never provide medical diagnoses
- Emphasize the importance of regular check-ups`;

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content:
        "Hi, I'm PureCare AI Assistant, your personal health assistant. How can I help you today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);

  const [loaded, error] = useFonts({
    Poppins: require('../assets/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: 'user',
      content: inputMessage.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: SYSTEM_PROMPT }],
          },
          {
            role: 'model',
            parts: [
              {
                text: "Hi, I'm PureCare AI Assistant, your personal health assistant. How can I help you today?",
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
      });

      const result = await chat.sendMessage(inputMessage);
      const response = await result.response;
      const assistantMessage = {
        role: 'system',
        content: response.text(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Unable to get a response. Please try again later.', [{ text: 'OK' }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderMessage = (message: { role: string; content: string }, index: number) => {
    const isAssistant = message.role === 'system';
    return (
      <View
        key={index}
        style={[styles.messageBubble, isAssistant ? styles.assistantBubble : styles.userBubble]}>
        <Text
          style={[
            styles.messageText,
            isAssistant ? styles.assistantBubbleText : styles.userBubbleText,
          ]}>
          {message.content}
        </Text>
      </View>
    );
  };

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
            <Text style={[styles.headerText]} font="Poppins">
              PureCare AI
            </Text>
            <Text style={[styles.headerSubText, { fontFamily: 'Poppins' }]}>
              Your Health Assistant
            </Text>
          </View>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.chatSection}
          contentContainerStyle={styles.chatContent}>
          {messages.map(renderMessage)}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>PureCare AI is typing...</Text>
            </View>
          )}
        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 90}
          style={{ width: '100%' }}>
          <View style={styles.inputSection}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Message PureCare AI..."
                placeholderTextColor="#9BA3B2"
                multiline
                value={inputMessage}
                onChangeText={setInputMessage}
              />
              <TouchableOpacity style={styles.attachButton}>
                <Text style={styles.attachButtonText}>📎</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.sendButton, !inputMessage.trim() && styles.sendButtonDisabled]}
              onPress={handleSend}
              disabled={!inputMessage.trim() || isLoading}>
              <Ionicons
                name="send"
                size={24}
                color={!inputMessage.trim() ? '#CCCCCC' : '#FFFFFF'}
                style={styles.sendButtonText}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
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
  sendButtonDisabled: {
    backgroundColor: '#E5E7EB',
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
  loadingContainer: {
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  loadingText: {
    color: '#6B7280',
    fontStyle: 'italic',
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
