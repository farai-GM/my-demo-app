
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useSearch } from "@/context/SearchContext";

export default function FilterChips() {
  const { filters, updateFilters } = useSearch();

  return (
    <View className="gap-4">
     
        {/* Filter chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {["Price", "Bedrooms", "Bathrooms", "Property type"].map(
              (filter) => (
                <Pressable
                  key={filter}
                  className="mr-2 rounded-full border border-border px-4 py-2.5"
                >
                  <Text className="text-sm font-medium text-foreground">
                    {filter}  ↓
                  </Text>
                </Pressable>
              )
            )}
          </ScrollView>


    </View>
  );
}
