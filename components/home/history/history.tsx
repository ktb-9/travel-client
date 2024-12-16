import React, { useRef, useState } from "react";
import { View, Text, Animated, Dimensions } from "react-native";
import styles from "./styles";
import { useFonts } from "expo-font";
import renderItem from "./renderItem";
import getHistoryQuery from "@/hooks/api/getHistoryQuery";
import { HistoryData } from "@/types/home/history";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.42;
const SPACING = 20;

const History = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [fontsLoaded] = useFonts({
    NotoBlack: require("@/assets/fonts/NotoSansKR-Black.ttf"),
    robotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
  });

  const { data } = getHistoryQuery();
  console.log(data);
  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.header1}>추억을 담아</Text>
      <Text style={styles.header2}>여행을 떠올려 보세요!</Text>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{
          display: "flex",
          alignItems: "center",
          paddingHorizontal: SPACING / 2,
          paddingRight: width - CARD_WIDTH * 1.4,
          paddingLeft: width * 0.01,
        }}
        scrollEventThrottle={16} // 이벤트 발생 빈도 설정
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      >
        {data.map((item: HistoryData, index: number) =>
          renderItem({ item, index, scrollX })
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default History;
