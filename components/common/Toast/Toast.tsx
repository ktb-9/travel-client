import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

interface ToastProps {
  visible: boolean;
  message: string;
  onHide: () => void;
}

const Toast = ({ visible, message, onHide }: ToastProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Fade in
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        // Wait for a bit
        Animated.delay(2000),
        // Fade out
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide();
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    zIndex: 999,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});

export default Toast;
