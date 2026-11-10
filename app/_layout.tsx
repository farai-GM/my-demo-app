import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Stack } from 'expo-router';
import { SearchProvider } from "@/context/SearchContext";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <SearchProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SearchProvider>
    </SafeAreaProvider>
  );
}
