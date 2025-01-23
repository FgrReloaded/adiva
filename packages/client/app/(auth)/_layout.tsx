import { Stack } from 'expo-router';
import { NAV_THEME } from '~/theme';
import { useColorScheme } from '~/lib/useColorScheme';

export default function AuthLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    />
  );
}
