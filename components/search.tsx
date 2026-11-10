
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useSearch } from "@/context/SearchContext";
import FilterChips from "./filter-chips";

export default function Search() {
  const { filters, updateFilters } = useSearch();

  return (
    <View className="gap-4">
      {/* Search input */}
      <View className="flex-row items-center gap-2">
        <View className="flex-1 flex-row items-center rounded-2xl border border-border bg-card px-4">
          <Text className="text-lg">⌕</Text>

          <TextInput
            value={filters.location}
            onChangeText={(location) =>
              updateFilters({ location })
            }
            placeholder="Suburb, city or property..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 px-3 py-4 text-foreground"
          />
        </View>

        <Pressable className="h-14 w-14 items-center justify-center rounded-2xl bg-primary">
          <Text className="text-xl text-primary-foreground">☷</Text>
        </Pressable>
      </View>

      {/* Buy / Rent */}
      <View className="flex-row rounded-2xl bg-muted p-1">
        {(["Buy", "Rent"] as const).map((type) => (
          <Pressable
            key={type}
            onPress={() => updateFilters({ listingType: type })}
            className={`flex-1 items-center rounded-xl py-3 ${
              filters.listingType === type ? "bg-card" : ""
            }`}
          >
            <Text className="font-semibold text-foreground">
              {type}
            </Text>
          </Pressable>
        ))}
      </View>

        <FilterChips/>


    </View>
  );
}
