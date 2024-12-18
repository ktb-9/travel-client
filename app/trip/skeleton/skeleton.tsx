import React, { useEffect, useRef } from "react";
import { View, Animated, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const SkeletonLoading = () => {
  const animValue = useRef(new Animated.Value(0)).current;

  const shimmerAnimation = Animated.loop(
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ])
  );

  useEffect(() => {
    shimmerAnimation.start();
    return () => shimmerAnimation.stop();
  }, []);

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={styles.container}>
      {/* 상단 이미지 박스 */}
      <View style={[styles.imageBox]}>
        <Animated.View
          style={[styles.shimmerOverlay, { transform: [{ translateX }] }]}
        />
      </View>

      {/* 메뉴바 박스 */}
      <View style={styles.menuBox}>
        <Animated.View
          style={[styles.shimmerOverlay, { transform: [{ translateX }] }]}
        />
      </View>

      {/* 카드 박스 */}
      <View style={[styles.cardBox, { borderRadius: 30 }]}>
        <Animated.View
          style={[styles.shimmerOverlay, { transform: [{ translateX }] }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    gap: 30,
    backgroundColor: "#fff",
  },
  imageBox: {
    width: "100%",
    height: 200,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  menuBox: {
    width: "100%",
    height: 40,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  cardBox: {
    width: "100%",
    height: 300,
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 16,
  },
  shimmerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export default SkeletonLoading;
