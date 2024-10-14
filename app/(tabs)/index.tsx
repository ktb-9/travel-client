import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
useTheme;

export default function HomeScreen() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    //화면 스타일 div라고생각하자
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDarkMode ? "#000" : "#fff",
      }}
    >
      <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
        Current theme: {isDarkMode ? "Dark" : "Light"}
      </Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
          Toggle Theme
        </Text>
      </TouchableOpacity>
    </View>
  );
}
