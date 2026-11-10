
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

          {/* Input */}
          <View className="mb-4 flex-row items-center gap-2 rounded-2xl border border-border bg-card p-2">
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Describe your ideal home..."
              placeholderTextColor="#9CA3AF"
              multiline
              className="max-h-28 flex-1 px-3 py-2 text-foreground"
              onSubmitEditing={() => sendMessage()}
              blurOnSubmit={false}
              returnKeyType="send"
            />

            {/* Voice button */}
            <Pressable
              onPress={() => setIsListening((current) => !current)}
              accessibilityLabel="Start voice input"
              className={`h-10 w-10 items-center justify-center rounded-full ${
                isListening ? "bg-red-500" : "bg-muted"
              }`}
            >
              <Text>{isListening ? "■" : "🎙"}</Text>
            </Pressable>

            {/* Send button */}
            <Pressable
              onPress={() => sendMessage()}
              disabled={!input.trim()}
              className={`h-10 w-10 items-center justify-center rounded-full ${
                input.trim() ? "bg-primary" : "bg-muted"
              }`}
            >
              <Text className="text-primary-foreground">↑</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
