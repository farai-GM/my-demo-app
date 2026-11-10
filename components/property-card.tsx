
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import ProfileButton from "@/components/profile-button";
import Search from "@/components/search";
import { useSearch } from "@/context/SearchContext";

type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  image: string;
};

const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Modern Family Home",
    location: "Waterkloof Ridge, Pretoria",
    price: 2450000,
    beds: 3,
    baths: 2,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: "2",
    title: "Contemporary Apartment",
    location: "Menlyn, Pretoria",
    price: 1650000,
    beds: 2,
    baths: 2,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  },
  {
    id: "3",
    title: "Spacious Family Residence",
    location: "Edenvale, Johannesburg",
    price: 3200000,
    beds: 4,
    baths: 3,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
  },
];

export default function PropertyCard() {
  const { filters } = useSearch();
  const search = filters.location || "";

  const [savedProperties, setSavedProperties] =
    useState<string[]>([]);

  const toggleSaved = (id: string) => {
    setSavedProperties((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const properties = MOCK_PROPERTIES.filter((property) =>
    property.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-auto w-full max-w-3xl gap-6 px-5 pt-4">

         
          {/* Property feed */}
          {properties.map((property) => {
            const saved = savedProperties.includes(property.id);

            return (
              <View
                key={property.id}
                className="overflow-hidden rounded-3xl border border-border bg-card"
              >
                {/* Property image */}
                <View className="relative">
                  <Image
                    source={{ uri: property.image }}
                    className="h-56 w-full"
                    resizeMode="cover"
                  />

                  <View className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5">
                    <Text className="text-xs font-semibold text-black">
                      FEATURED
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => toggleSaved(property.id)}
                    className="absolute right-4 top-4 h-10 w-10 items-center justify-center rounded-full bg-white"
                  >
                    <Text className="text-xl">
                      {saved ? "❤️" : "♡"}
                    </Text>
                  </Pressable>
                </View>

                {/* Property details */}
                <View className="gap-2 p-4">
                  <Text className="text-2xl font-bold text-foreground">
                    R {property.price.toLocaleString("en-ZA")}
                  </Text>

                  <Text className="text-lg font-semibold text-foreground">
                    {property.title}
                  </Text>

                  <Text className="text-sm text-muted-foreground">
                    📍 {property.location}
                  </Text>

                  <View className="mt-2 flex-row gap-4">
                    <Text className="text-sm text-muted-foreground">
                      🛏 {property.beds} beds
                    </Text>
                    <Text className="text-sm text-muted-foreground">
                      🛁 {property.baths} baths
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}

          {properties.length === 0 && (
            <Text className="py-10 text-center text-muted-foreground">
              No properties found.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
