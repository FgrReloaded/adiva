import '../global.css';
import 'expo-dev-client';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...NAV_THEME.light,
  },
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...NAV_THEME.dark,
  },
};

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const hasMounted = useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  const [loaded, error] = useFonts({
    OpenSans: require('../assets/OpenSans.ttf'),
  });

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      document.documentElement.classList.add('bg-background');
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded || !loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <Stack>
              <Stack.Screen name="index" options={INDEX_OPTIONS} />
            </Stack>
          </ThemeProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}

const INDEX_OPTIONS = {
  headerLargeTitle: true,
  title: 'Adiva',
} as const;

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? useEffect : useLayoutEffect;
