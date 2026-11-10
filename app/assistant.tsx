
import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/header";
import ProfileButton from "@/components/profile-button";
import Heading from "@/components/heading";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Find a family home",
  "Compare properties",
  "Help me choose a suburb",
  "Find something under R2 million",
];

function generateStubResponse(input: string) {
  const message = input.toLowerCase();

  if (message.includes("compare")) {
    return "Absolutely! Send me the properties you'd like to compare, and I'll help you evaluate their price, location, features and value.";
  }

  if (message.includes("suburb") || message.includes("location")) {
    return "Let's find the right neighbourhood for you. We can look at property prices, proximity to work, schools, amenities and the lifestyle you're looking for.";
  }

  if (message.includes("budget") || message.includes("million")) {
    return "Let's work within your budget. I can help you explore properties, compare their features and find options that offer the best value.";
  }

  return "I'd be happy to help you find your next home! Tell me a little more about what you're looking for, such as your preferred location, budget and property type.";
}

export default function AssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTextActive, setIsTextActive] = useState(true);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = (text = input) => {
    const trimmed = text.trim();

    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
    };

    const assistantMessage: Message = {
      id: `${Date.now()}-assistant`,
      role: "assistant",
      content: generateStubResponse(trimmed),
    };

    setMessages((current) => [
      ...current,
      userMessage,
      assistantMessage,
    ]);

    setInput("");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <View className="mx-auto w-full max-w-3xl flex-1 px-5 pt-4">

          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Header />
            <ProfileButton />
          </View>

          {/* Assistant title */}
          <View className="items-center gap-2 py-6">
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary">
              <Text className="text-2xl text-primary-foreground">✦</Text>
            </View>

            <Heading level={2} className="text-center">
              Your property assistant
            </Heading>

            <p className="text-center text-muted-foreground">
              Tell me what you're looking for.
              I'll help you find the right property.
            </p>
          </View>

          {/* Conversation */}
          <ScrollView
            ref={scrollViewRef}
            className="flex-1"
            contentContainerClassName="gap-4 pb-4"
            keyboardShouldPersistTaps="handled"
          >
            {messages.length === 0 ? (
              <View className="gap-3 py-4">
                <Text className="font-semibold text-foreground">
                  Try asking
                </Text>

                {SUGGESTIONS.map((suggestion) => (
                  <Pressable
                    key={suggestion}
                    onPress={() => sendMessage(suggestion)}
                    className="rounded-2xl border border-border bg-card px-4 py-3"
                  >
                    <Text className="text-foreground">
                      {suggestion} →
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : (
              messages.map((message) => (
                <View
                  key={message.id}
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.role === "user"
                      ? "self-end bg-primary"
                      : "self-start bg-card border border-border"
                  }`}
                >
                  <Text
                    className={
                      message.role === "user"
                        ? "text-primary-foreground"
                        : "text-foreground"
                    }
                  >
                    {message.content}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>

            {/* State needed at the top of your component: */}


            {/* Outer Row Container to put the field and voice button side-by-side */}
            <View className="mb-5 flex-row items-end gap-2 w-full px-2">
            
            {/* 1. THE TEXT INPUT FIELD CONTAINER */}
            <View 
                className={`h-12 flex-row items-center gap-1 rounded-2xl bg-gray-200 p-1.5 transition-all ${
                isTextActive ? "w-3/4" : "w-1/4"
                }`}
            >
                {isTextActive ? (
                <>
                    <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Describe your home..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    className="max-h-10 flex-1 px-2 py-2 text-foreground bg-transparent"
                    onSubmitEditing={() => sendMessage()}
                    blurOnSubmit={false}
                    returnKeyType="send"
                    onFocus={() => setIsTextActive(true)}
                    style={{ outlineStyle: 'none' } as any} 
                    underlineColorAndroid="transparent"
                    />

                    {/* Send button (Visible when typing) */}
                    <Pressable
                    onPress={() => sendMessage()}
                    disabled={!input.trim()}
                    className={`h-10 w-10 items-center justify-center rounded-2xl ${
                        input.trim() ? "bg-primary" : "bg-muted"
                    }`}
                    >
                    <Text className="text-primary-foreground">↑</Text>
                    </Pressable>
                </>
                ) : (
                /* Keyboard Switch Button (When text area is minimized) */
                <Pressable
                    onPress={() => setIsTextActive(true)}
                    className="h-12 w-full items-center justify-center"
                >
                    <Text className="mb-2 text-2xl text-foreground ">⌨️</Text>
                </Pressable>
                )}
            </View>

            {/* 2. VOICE BUTTON CONTAINER */}
            <Pressable
                onPress={() => {
                setIsTextActive(false);
                setIsListening((current) => !current);
                }}
                accessibilityLabel="Voice input"
                className={` h-12 items-center justify-center rounded-2xl  p-1.5 transition-all ${
                !isTextActive ? "w-3/4 flex-row justify-between px-4" : "w-1/4"
                } ${isListening ? "bg-red-500" : "bg-gray-200"}`}
            >
                {!isTextActive ? (
                <>
                    {/* Expanded Voice Mode Display */}
                    <Text className={`text-base font-medium ${isListening ? "text-white animate-pulse" : "text-foreground"}`}>
                    {isListening ? "Listening..." : "Tap to Speak"}
                    </Text>
                    <Text className={`text-2xl ${isListening ? "text-white" : "text-foreground"}`}>
                    {isListening ? "■" : "🎙"}
                    </Text>
                </>
                ) : (
                /* Minimized Voice Icon Button */
                <Text className="mb-0.5 text-2xl text-foreground">🎙</Text>
                )}
            </Pressable>
        </View>


        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
