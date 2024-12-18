import React from "react";
import { View, Text, Animated, ViewStyle } from "react-native";
import styles from "./styles";

const SkeletonTripCard = () => {
  const shimmerAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnimation]);

  const shimmerTranslate = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  const shimmerStyle: Animated.WithAnimatedObject<ViewStyle> = {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
    transform: [{ translateX: shimmerTranslate }],
  };

  return (
    <View style={styles.tripCard}>
      <View style={styles.tripHeader}>
        <View
          style={[styles.tripIconContainer, { backgroundColor: "#E5E7EB" }]}
        />
        <View
          style={[
            styles.tripName,
            {
              backgroundColor: "#F3F4F6",
              height: 24,
              width: "70%",
              marginLeft: 12,
            },
          ]}
        />
        <Animated.View style={shimmerStyle} />
      </View>

      <View style={styles.tripDetails}>
        <View
          style={[
            styles.detailRow,
            {
              backgroundColor: "#F3F4F6",
              height: 20,
              width: "80%",
              marginBottom: 8,
            },
          ]}
        />
        <View
          style={[
            styles.detailRow,
            {
              backgroundColor: "#F3F4F6",
              height: 20,
              width: "60%",
            },
          ]}
        />
        <Animated.View style={shimmerStyle} />
      </View>
    </View>
  );
};

const MyTripListSkeleton = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>나의 여행</Text>
      {[1, 2, 3, 4].map((item) => (
        <SkeletonTripCard key={item} />
      ))}
    </View>
  );
};

export default MyTripListSkeleton;
