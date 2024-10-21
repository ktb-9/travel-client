import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { useFonts } from "expo-font";
import hotPlaceQuery from "@/hooks/api/hotPlaceQuery";
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
  const renderItem = ({
    item,
    index,
  }: {
    item: HotplaceData;
    index: number;
  }) => {
    // inputRange는 카드의 인덱스를 기준으로, 각 카드의 위치를 정의합니다.
    const inputRange = [
      (index - 1) * (CARD_WIDTH + SPACING), // 이전 카드의 위치
      index * (CARD_WIDTH + SPACING), // 현재 카드의 위치
      (index + 1) * (CARD_WIDTH + SPACING), // 다음 카드의 위치
    ];

    // scale은 스크롤 위치에 따라 카드의 크기를 조정합니다.
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.2], // 카드가 중심에 있을 때는 크기가 1, 좌우에 있을 때는 0.9로 줄어듭니다.
      extrapolate: "clamp", // 범위를 벗어나는 값은 고정(clamp) 처리합니다.
    });

    // opacity는 스크롤 위치에 따라 카드의 투명도를 조정합니다.
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7], // 카드가 중심에 있을 때는 불투명(1), 좌우에 있을 때는 0.7로 투명해집니다.
      extrapolate: "clamp", // 범위를 벗어나는 값은 고정(clamp) 처리합니다.
    });

    if (!fontsLoaded) return null;
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
          renderItem({ item, index })
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default History;
