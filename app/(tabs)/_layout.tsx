import "../../global.css";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { withLayoutContext } from "expo-router";
// CHANGED: Import from 'expo-router/js-top-tabs' instead of '@react-navigation'
import { createMaterialTopTabNavigator } from "expo-router/js-top-tabs"; 
import { SearchProvider } from "@/context/SearchContext";
import BottomNav from "@/components/navbar";

// Create a wrapped layout context that Expo Router native engine recognizes
const MySlidingTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function Layout() {
  return (
    <SafeAreaProvider>
      <SearchProvider>
        <View style={{ flex: 1 }}>
          
          {/* The sliding tab navigator which manages horizontal swipes automatically */}
          <MySlidingTabs
            tabBar={() => null} // Hides the default tab bar entirely so your custom bar shows
            screenOptions={{
              swipeEnabled: true, // Enables full-screen swipe gestures natively
              lazy: true,         // Only loads screens when visited (Excellent for SEO/Performance)
            }}
          >
            <MySlidingTabs.Screen name="saved-properties" options={{ title: "Saved" }} />
            <MySlidingTabs.Screen name="index" options={{ title: "Home" }} />
            <MySlidingTabs.Screen name="assistant" options={{ title: "Assistant" }} />
          </MySlidingTabs>

          {/* Your custom floating self-collapsing navbar */}
          <BottomNav />

        </View>
      </SearchProvider>
    </SafeAreaProvider>
  );
}
