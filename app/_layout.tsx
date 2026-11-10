import "../global.css";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack, useRouter, usePathname } from "expo-router";
import { SearchProvider } from "@/context/SearchContext";
import BottomNav, { NAV_ITEMS } from "@/components/navbar";
// Import Gesture Handlers
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();

  // Find where the user is currently positioned in the navigation array
  const current_index = NAV_ITEMS.findIndex((item) => item.route === pathname);

  // Configure global swipe tracking
  const globalPanGesture = Gesture.Pan().onEnd((event) => {
    const SwipeThreshold = 40; // Minimum distance in pixels to trigger transition

    if (event.translationX > SwipeThreshold) {
      // Swipe Right -> Move Left in array (e.g. Home -> Saved)
      const nextIndex = current_index - 1;
      if (nextIndex >= 0) {
        router.push(NAV_ITEMS[nextIndex].route);
      } else {
        router.push(NAV_ITEMS[NAV_ITEMS.length - 1].route); // Wrap around to end
      }
    } else if (event.translationX < -SwipeThreshold) {
      // Swipe Left -> Move Right in array (e.g. Home -> Assistant)
      const nextIndex = (current_index + 1) % NAV_ITEMS.length;
      router.push(NAV_ITEMS[nextIndex].route);
    }
  });

  return (
    <SafeAreaProvider>
      <SearchProvider>
        {/* 1. Gesture Root View must wrap the interactive canvas area */}
        <GestureHandlerRootView style={{ flex: 1 }}>
          <GestureDetector gesture={globalPanGesture}>
            <View style={{ flex: 1 }}>
              
              {/* The stack handles rendering your active page screens */}
              <Stack screenOptions={{ headerShown: false }} />
              
              {/* BottomNav floats independently on top of the screen views */}
              <BottomNav />

            </View>
          </GestureDetector>
        </GestureHandlerRootView>
      </SearchProvider>
    </SafeAreaProvider>
  );
}
