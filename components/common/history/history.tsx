import React, { useRef, useState } from "react";
import { View, Text, Image, Animated, Dimensions } from "react-native";
import styles from "./styles";
import sokcho from "@/assets/images/sokcho.png";
import chuncheon from "@/assets/images/chuncheon.png";
import { useFonts } from "expo-font";
const { width } = Dimensions.get("window");
type DataState = {
  id: string;
  destination: any;
  mainDescription: string;
  subDescription: string;
  hashTag: string;
};

const CARD_WIDTH = width * 0.42;
const SPACING = 20;

const History = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [fontsLoaded] = useFonts({
    NotoBlack: require("@/assets/fonts/NotoSansKR-Black.ttf"),
    robotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
  });

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
    {
      id: "3",
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
        {data.map((item, index) => renderItem({ item, index }))}
      </Animated.ScrollView>
    </View>
  );
};

export default History;
