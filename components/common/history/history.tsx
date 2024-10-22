import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { useFonts } from "expo-font";
import hotPlaceQuery from "@/hooks/api/hotPlaceQuery";
import renderItem from "./renderItem";
const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.42;
const SPACING = 20;

type HotplaceData = {
  id: string;
  destination: any;
  mainDescription: string;
  subDescription: string;
  hashTag: string;
};
const History = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [fontsLoaded] = useFonts({
    NotoBlack: require("@/assets/fonts/NotoSansKR-Black.ttf"),
    robotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
  });
  const { data, isLoading, isError } = hotPlaceQuery();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError || !data) {
    return <Text>에러 로딩 업커밍</Text>;
  }
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
        {data.data.map((item: HotplaceData, index: number) =>
          renderItem({ item, index, scrollX })
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default History;
