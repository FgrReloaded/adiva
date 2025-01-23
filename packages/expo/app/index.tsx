import * as React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import HealthMetricsDashboard from "~/components/dashboard";

const MenuItem = ({
  iconName,
  title,
  description,
  bgColor,
  onPress,
}: {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
  bgColor: string;
  onPress?: () => void;
}) => (
  <Card className={`mb-3 ${bgColor}`}>
    <CardContent className="p-4">
      <Button variant="ghost" onPress={onPress} className="w-full">
        <View className="flex-row items-center">
          <View className="mr-4 rounded-lg bg-white/20 p-2">
            <MaterialCommunityIcons name={iconName} size={24} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-white">{title}</Text>
            <Text className="mt-1 text-sm text-white/80">{description}</Text>
          </View>
        </View>
      </Button>
    </CardContent>
  </Card>
);

const QuickAction = ({
  iconName,
  title,
  bgColor,
  onPress,
}: {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  bgColor: string;
  onPress?: () => void;
}) => (
  <Card className={`${bgColor} mx-1 flex-1`}>
    <CardContent className="p-4">
      <Button variant="ghost" onPress={onPress} className="w-full">
        <View className="items-center">
          <MaterialCommunityIcons name={iconName} size={24} color="white" />
          <Text className="mt-2 text-center text-sm text-white">{title}</Text>
        </View>
      </Button>
    </CardContent>
  </Card>
);

export default function Screen() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const LanguageButton = ({
    label,
    color,
    style,
  }: {
    label: string;
    color: string;
    style: any;
  }) => (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutDown}
      style={[style, { position: "absolute", right: 0 }]}
    >
      <Button
        variant="default"
        className={`h-12 w-20 ${color}`}
        onPress={() => {
          console.log(`Selected language: ${label}`);
          toggleMenu();
        }}
      >
        <Text className="text-sm font-bold text-white">{label}</Text>
      </Button>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView className="flex-1">
        <Card className="bg-white px-6 pb-4 pt-12">
          <CardContent>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Avatar className="mr-3 h-12 w-12" alt="">
                  <AvatarFallback>
                    <Text className="text-lg font-bold text-blue-600">JD</Text>
                  </AvatarFallback>
                </Avatar>
                <View>
                  <Text className="text-2xl text-gray-800">Hello, Pragya!</Text>
                  <Text className="text-gray-500">Have a great day ahead</Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="bell-outline"
                size={24}
                color="#666"
              />
            </View>
          </CardContent>
        </Card>

        <View className="p-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex-row items-center justify-between">
                <Text className="text-lg text-gray-800">Health Overview</Text>
                <Text className="text-blue-500">Details →</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HealthMetricsDashboard />
            </CardContent>
          </Card>

          <View className="mb-6 flex-row justify-between">
            <QuickAction
              // onPress={() => router.push("/education")}
              iconName="book-education"
              title="Education"
              bgColor="bg-blue-500"
            />
            <QuickAction
              // onPress={() => router.push("/scanner")}
              iconName="camera"
              title="AI Medicine Scanner"
              bgColor="bg-purple-500"
            />
          </View>

          <Text className="mb-4 text-xl font-bold text-gray-800">Services</Text>

          <MenuItem
            iconName="map-marker-radius"
            title="CleanStop Finder"
            // onPress={() => router.push("/locator")}
            description="Find clean washrooms nearby"
            bgColor="bg-emerald-500"
          />

          <MenuItem
            iconName="doctor"
            title="DoctorAccess Hub"
            description="Book appointments with experts"
            bgColor="bg-blue-500"
            // onPress={() => router.push("/doctors")}
          />

          <MenuItem
            iconName="pill"
            title="PharmaReach"
            description="Order hygiene products"
            bgColor="bg-purple-500"
            // onPress={() => router.push("/pharma")}
          />

          <MenuItem
            iconName="chat-processing"
            title="PureCare Assistant"
            description="Get personalized health advice"
            bgColor="bg-amber-500"
            // onPress={() => router.push("/chatbot")}
          />

          <MenuItem
            iconName="chart-line"
            title="WellnessFlow"
            description="Track your health metrics"
            bgColor="bg-cyan-500"
            // onPress={() => router.push("/tracker")}
          />
        </View>
      </ScrollView>

      {/* Language Selection */}
      <View className="absolute bottom-6 right-6">
        {isOpen && (
          <View>
            <LanguageButton
              label="English"
              color="bg-blue-500"
              style={{ bottom: 100 }}
            />
            <LanguageButton
              label="Hindi"
              color="bg-red-500"
              style={{ bottom: 50 }}
            />
            <LanguageButton
              label="অসমীয়া"
              color="bg-yellow-500"
              style={{ bottom: 0 }}
            />
          </View>
        )}
        <Button
          variant="default"
          className="h-14 w-14 rounded-full bg-gray-800"
          onPress={toggleMenu}
        >
          <Animated.View>
            <MaterialCommunityIcons name="phone" size={24} color="white" />
          </Animated.View>
        </Button>
      </View>
    </View>
  );
}
