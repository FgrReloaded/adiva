import * as NavigationBar from "expo-navigation-bar";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import * as React from "react";
import { Platform } from "react-native";
async function setNavigationBar(colorScheme: "light" | "dark") {
  if (Platform.OS !== "android") return;

  return Promise.all([
    NavigationBar.setButtonStyleAsync(
      colorScheme === "dark" ? "light" : "dark",
    ),
    NavigationBar.setPositionAsync("absolute"),
    NavigationBar.setBackgroundColorAsync(
      colorScheme === "dark" ? "#00000030" : "#ffffff80",
    ),
  ]);
}

export function useColorScheme() {
  const {
    colorScheme,
    setColorScheme: setNativeWindColorScheme,
    toggleColorScheme: nativeWindToggleColorScheme,
  } = useNativewindColorScheme();

  const setColorScheme = React.useCallback(
    async (scheme: "light" | "dark") => {
      setNativeWindColorScheme(scheme);
      try {
        await setNavigationBar(scheme);
      } catch (error) {
        console.error("useColorScheme.tsx: setColorScheme error:", error);
      }
    },
    [setNativeWindColorScheme],
  );

  const toggleColorScheme = React.useCallback(() => {
    const newScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newScheme);
  }, [colorScheme, setColorScheme]);

  // Initialize navigation bar on mount for Android
  React.useEffect(() => {
    if (Platform.OS === "android") {
      setNavigationBar(colorScheme ?? "dark").catch((error) => {
        console.error(
          "useColorScheme.tsx: initial navigation bar sync error:",
          error,
        );
      });
    }
  }, [colorScheme]);

  return {
    colorScheme: colorScheme ?? "dark",
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
