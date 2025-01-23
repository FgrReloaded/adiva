import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'expo-dynamic-fonts';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

import { authClient } from '~/auth-client';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await authClient.signUp.email(
        {
          name,
          email,
          password,
        },
        {
          onError: (error) => {
            console.error(error.error.message);
          },
          onSuccess: () => {
            router.replace('/');
          },
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="mt-12">
        <Text font="Poppins" className="text-3xl font-bold text-gray-800">
          Create Account
        </Text>
        <Text font="Poppins" className="mt-2 text-gray-600">
          Sign up to get started
        </Text>
      </View>

      <View className="mt-8 space-y-4">
        <View>
          <TextInput
            className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3"
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View>
          <TextInput
            className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View>
          <TextInput
            className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="rounded-lg bg-blue-600 px-4 py-3"
          onPress={handleSignUp}
          disabled={loading}>
          <Text font="Poppins" className="text-center text-white">
            {loading ? 'Creating account...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View className="mt-8">
        <Text font="Poppins" className="mb-4 text-center text-gray-600">
          Or continue with
        </Text>
        <View className="flex-row justify-center space-x-4">
          <TouchableOpacity
            className="rounded-lg border border-gray-300 px-6 py-3"
            onPress={() => handleSocialSignUp('google')}>
            <MaterialCommunityIcons name="google" size={24} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-lg border border-gray-300 px-6 py-3"
            onPress={() => handleSocialSignUp('github')}>
            <MaterialCommunityIcons name="github" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View> */}

      <View className="mt-8 flex-row justify-center">
        <Text font="Poppins" className="text-gray-600">
          Already have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
          <Text font="Poppins" className="text-blue-600">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
