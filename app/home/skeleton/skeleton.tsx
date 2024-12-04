import React, { useEffect, useRef } from "react";
import { View, Animated, Dimensions } from "react-native";
import { useTheme } from "@/hooks/useTheme";

const { width } = Dimensions.get("window");

const Skeleton: React.FC = () => {
  const { isDarkMode } = useTheme();
  const animValue = useRef(new Animated.Value(0)).current;

  // Shimmer animation
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

  // Interpolate for shimmer effect
  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  // Base skeleton styles
  const baseSkeletonStyle = {
    backgroundColor: isDarkMode ? "#333" : "#E1E9EE",
    borderRadius: 20,
  };

  // Shimmer overlay
  const shimmerOverlay = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
    transform: [{ translateX }],
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: isDarkMode ? "#000" : "#F8F8FA",
      }}
    >
      {/* Intro Section */}
      <View
        style={{
          width: "100%",
          height: 450,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View
          style={[
            { width: "67%", height: 290, borderRadius: 10 },
            baseSkeletonStyle,
          ]}
        >
          <Animated.View style={shimmerOverlay} />
        </View>

        <View
          style={[
            { width: "50%", height: 25, borderRadius: 5 },
            baseSkeletonStyle,
          ]}
        >
          <Animated.View style={shimmerOverlay} />
        </View>

        <View
          style={[
            { width: "40%", height: 20, borderRadius: 5 },
            baseSkeletonStyle,
          ]}
        >
          <Animated.View style={shimmerOverlay} />
        </View>
      </View>

      {/* Upcoming Section */}
      <View
        style={{
          width: "90%",
          height: 160,
          borderRadius: 20,
          backgroundColor: "white",
          alignSelf: "center",
          marginVertical: 10,
        }}
      >
        <View
          style={[
            {
              width: "100%",
              height: "100%",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            },
            baseSkeletonStyle,
          ]}
        >
          <Animated.View style={shimmerOverlay} />

          <View
            style={{
              position: "absolute",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View
              style={[
                { width: 75, height: 75, borderRadius: 40, marginBottom: 10 },
                baseSkeletonStyle,
              ]}
            >
              <Animated.View style={shimmerOverlay} />
            </View>

            <View
              style={[
                { width: 100, height: 20, borderRadius: 5, marginBottom: 5 },
                baseSkeletonStyle,
              ]}
            >
              <Animated.View style={shimmerOverlay} />
            </View>

            <View
              style={[
                { width: 150, height: 30, borderRadius: 5 },
                baseSkeletonStyle,
              ]}
            >
              <Animated.View style={shimmerOverlay} />
            </View>
          </View>
        </View>
      </View>

      {/* Hot Places Section */}
      <View
        style={{
          width: "90%",
          height: 650,
          borderRadius: 30,
          backgroundColor: "white",
          alignSelf: "center",
        }}
      >
        <View style={baseSkeletonStyle}>
          <Animated.View style={shimmerOverlay} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            height: 525,
            gap: 15,
          }}
        >
          {[1, 2].map((col) => (
            <View
              key={col}
              style={{
                width: "45%",
                height: "60%",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={[
                  { width: "100%", height: 350, borderRadius: 20 },
                  baseSkeletonStyle,
                ]}
              >
                <Animated.View style={shimmerOverlay} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Skeleton;
