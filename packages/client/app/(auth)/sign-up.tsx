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
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white p-6">
      <View className="mt-12">
        <Text font="Poppins" className="text-4xl font-bold text-gray-800">
          Welcome! 👋
        </Text>
        <Text font="Poppins" className="mt-3 text-lg text-gray-600">
          Let's create your account
        </Text>
      </View>

      <View className="mt-10 space-y-5">
        <View className="my-2 shadow-sm">
          <TextInput
            className="rounded-xl border-2 border-gray-200 bg-white px-5 py-4"
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View className="shadow-sm">
          <TextInput
            className="rounded-xl border-2 border-gray-200 bg-white px-5 py-4"
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View className="my-2 shadow-sm">
          <TextInput
            className="rounded-xl border-2 border-gray-200 bg-white px-5 py-4"
            placeholder="Create Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className={`mt-4 rounded-xl px-5 py-4 ${
            loading ? 'bg-blue-400' : 'bg-blue-600'
          } shadow-lg shadow-blue-300`}
          onPress={handleSignUp}
          disabled={loading}>
          <Text font="Poppins" className="text-center text-lg font-semibold text-white">
            {loading ? 'Creating account... ⏳' : 'Create Account'}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-10 flex-row justify-center">
        <Text font="Poppins" className="text-gray-600">
          Already have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
          <Text font="Poppins" className="font-semibold text-blue-600">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
