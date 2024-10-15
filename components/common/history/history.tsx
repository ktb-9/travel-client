import React, { useRef, useState } from "react";
import { View, Text, Image, Animated } from "react-native";
import styles from "./styles";
import sokcho from "@/assets/images/sokcho.png";
import chuncheon from "@/assets/images/chuncheon.png";

type DataState = {
  id: string;
  destination: any;
  mainDescription: string;
  subDescription: string;
  hashTag: string;
};

const CARD_WIDTH = 185;
const SPACING = 20;

const History = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [data] = useState<DataState[]>([
    {
      id: "1",
      destination: sokcho,
      mainDescription: "속초 여행",
      subDescription: "2024-06-18~2024-06-19",
      hashTag: "#속초 해산물 #속초 포켓몬빵 #속초 헤엄",
    },
    {
      id: "2",
      destination: chuncheon,
      mainDescription: "춘천 여행",
      subDescription: "2024-08-14~2024-06-19",
      hashTag: "#200일 #애인 #달갈비 #자전거",
    },
    {
      id: "3",
      destination: chuncheon,
      mainDescription: "춘천 여행",
      subDescription: "2024-08-14~2024-06-19",
      hashTag: "#200일 #애인 #달갈비 #자전거",
    },
  ]);

  const renderItem = ({ item, index }: { item: DataState; index: number }) => {
    const inputRange = [
      (index - 1) * (CARD_WIDTH + SPACING),
      index * (CARD_WIDTH + SPACING),
      (index + 1) * (CARD_WIDTH + SPACING),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <Image source={item.destination} style={styles.image} />
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.hashTag}>{item.hashTag}</Text>
          <Text style={styles.mainTitle}>{item.mainDescription}</Text>
          <Text style={styles.subTitle}>{item.subDescription}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.cardContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      >
        {data.map((item, index) => renderItem({ item, index }))}
      </Animated.ScrollView>
    </View>
  );
};

export default History;
