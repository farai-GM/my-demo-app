
import {
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import ProfileButton from "@/components/profile-button";
import Search from "@/components/search";
import PropertyCard from "@/components/property-card";
import Heading from "@/components/heading";


export default function HomeScreen() {
 

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-auto w-full max-w-3xl gap-6 px-5 pt-4">

          {/* Header */}
          <View className="flex-row col-span-2 items-center justify-between">
            <Header />
            <ProfileButton />
          </View>
          <Heading level={1} className="mt-2">
            Find your next place.
          </Heading>
          {/* Search */}
          <Search/>
          

          
          {/* Feed heading */}
          <View className="flex-row items-center justify-between">
            
            <Heading level={3}>
                Homes you might love
            </Heading>

            <Heading level={6}>See all →</Heading>
          </View>

          {/* Property feed */}
          <PropertyCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
