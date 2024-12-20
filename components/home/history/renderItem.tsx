import React from "react";
import {
  Animated,
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { HistoryData } from "@/types/home/history";
import { defaults } from "@/constants/default";
import { useRecoilState } from "recoil";
import tripIdState from "@/recoil/tripIdState";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.42;
const SPACING = 20;

const RenderItem = ({
  item,
  index,
  scrollX,
}: {
  item: HistoryData;
  index: number;
  scrollX: Animated.Value;
}) => {
  const [, setTripId] = useRecoilState(tripIdState);
  const router = useRouter();

  const inputRange = [
    (index - 1) * (CARD_WIDTH + SPACING),
    index * (CARD_WIDTH + SPACING),
    (index + 1) * (CARD_WIDTH + SPACING),
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.9, 1, 0.2],
    extrapolate: "clamp",
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.7, 1, 0.7],
    extrapolate: "clamp",
  });

  const handleViewAnalysis = (tripId: number) => {
    setTripId(tripId);
    router.push("/summary/Summary");
  };

  return (
    <TouchableOpacity onPress={() => handleViewAnalysis(item.tripId)}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <Image
          source={{ uri: item.backgroundUrl || defaults.bg }}
          style={styles.image}
        />
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.mainTitle}>{item.groupName}</Text>
          <Text style={styles.subTitle}>{item.date}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default RenderItem;
