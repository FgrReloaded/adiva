import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'expo-dynamic-fonts';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { authService } from '~/lib/auth/auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await authService.signIn(email, password);
      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50">
      <View className="flex-1 px-8 pt-12">
        <View className="mb-12 items-center">
          <View className="mb-6 h-20 w-20 rounded-full bg-blue-600" />
          <Text font="Poppins" className="text-center text-3xl font-bold text-gray-800">
            Welcome Back
          </Text>
          <Text font="Poppins" className="mt-2 text-center text-gray-600">
            Sign in to your account
          </Text>
        </View>

        <View className="space-y-6">
          <View className="space-y-2">
            <Text font="Poppins" className="ml-1 text-sm text-gray-600">
              Email
            </Text>
            <View className="flex-row items-center rounded-xl border border-gray-200 bg-white px-4">
              <MaterialCommunityIcons name="email-outline" size={20} color="#6B7280" />
              <TextInput
                className="flex-1 px-3 py-3"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View className="my-2 space-y-2">
            <Text font="Poppins" className="ml-1 text-sm text-gray-600">
              Password
            </Text>
            <View className="flex-row items-center rounded-xl border border-gray-200 bg-white px-4">
              <MaterialCommunityIcons name="lock-outline" size={20} color="#6B7280" />
              <TextInput
                className="flex-1 px-3 py-3"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity
            className={`mt-4 rounded-xl py-4 ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
            onPress={handleSignIn}
            disabled={loading}>
            <Text font="Poppins" className="text-center font-semibold text-white">
              {loading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8 flex-row justify-center" />
        <Text font="Poppins" className="text-gray-600">
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
          <Text font="Poppins" className="font-semibold text-blue-600">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
