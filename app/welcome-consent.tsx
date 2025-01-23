import { Icon } from '@roninoss/icons';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Platform, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { useColorScheme } from '~/lib/useColorScheme';

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function WelcomeConsent() {
  const { colors } = useColorScheme();
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
      <Stack.Screen options={{ title: 'Welcome', headerShown: false }} />
      <SafeAreaView style={ROOT_STYLE}>
        <View className="mx-auto max-w-sm flex-1 justify-between px-8 py-6">
          <View className="ios:pt-12 space-y-2 pt-16">
            <Text
              style={{ fontFamily: 'Poppins' }}
              variant="largeTitle"
              className="ios:text-left text-center font-black tracking-tight text-black">
              Welcome to your
            </Text>
            <Text
              style={{ fontFamily: 'Poppins' }}
              variant="largeTitle"
              className="ios:text-left text-center font-black tracking-tight text-primary">
              Adiva
            </Text>
          </View>

          <View className="my-12 space-y-10">
            {FEATURES.map((feature) => (
              <View key={feature.title} className="flex-row items-start gap-5">
                <View className="bg-primary/10 rounded-2xl p-3">
                  <Icon
                    name={feature.icon}
                    size={32}
                    color={colors.primary}
                    ios={{ renderingMode: 'hierarchical' }}
                  />
                </View>
                <View className="flex-1 space-y-1">
                  <Text style={{ fontFamily: 'Poppins' }} className="text-lg font-bold text-black">
                    {feature.title}
                  </Text>
                  <Text
                    style={{ fontFamily: 'Poppins' }}
                    variant="footnote"
                    className="leading-relaxed text-gray-600">
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View className="space-y-6">
            <View className="items-center space-y-3">
              <View className="bg-primary/10 rounded-full p-3">
                <Icon
                  name="account-multiple"
                  size={24}
                  color={colors.primary}
                  ios={{ renderingMode: 'hierarchical' }}
                />
              </View>
              <Text
                style={{ fontFamily: 'Poppins' }}
                variant="caption2"
                className="text-center leading-relaxed text-gray-600">
                By continuing, you agree to our{' '}
                <Link href="/">
                  <Text variant="caption2" className="font-medium text-primary">
                    Terms of Service
                  </Text>
                </Link>{' '}
                and{' '}
                <Link href="/">
                  <Text
                    style={{ fontFamily: 'Poppins' }}
                    variant="caption2"
                    className="font-medium text-primary"
                  />
                  Privacy Policy
                </Link>
              </Text>
            </View>

            <Link href="/" replace asChild>
              <Button
                size={Platform.select({ ios: 'lg', default: 'md' })}
                className="shadow-primary/20 shadow-lg">
                <Text style={{ fontFamily: 'Poppins' }} className="font-medium">
                  Get Started
                </Text>
              </Button>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const FEATURES = [
  {
    title: 'Profile Management',
    description: 'Easily update and manage your personal information, settings, and preferences',
    icon: 'account-circle-outline',
  },
  {
    title: 'Secure Messaging',
    description: 'Chat securely with friends and family in real-time.',
    icon: 'message-processing',
  },
  {
    title: 'Activity Tracking',
    description: 'Monitor your daily activities and track your progress over time.',
    icon: 'chart-timeline-variant',
  },
] as const;
