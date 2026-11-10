import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
} from "react-native";



export default function ProfileButton() {
  return (
    <View className="flex-row items-center justify-between">
        <Pressable className="h-7 w-7 items-center justify-center rounded-full bg-card border border-border">
            <Text className="text-lg">👤</Text>
        </Pressable>
    </View> 
);
}