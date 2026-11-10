import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
} from "react-native";



export default function Header() {
  return (
    <View className="flex-row items-center justify-between">
      <View>
        <Text role="heading" aria-level={1} className="text-sm font-semibold tracking-widest text-primary">
          HOMESTEAD
        </Text>
 
       </View>
    </View> 
);
}