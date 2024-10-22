import { Animated, Image, Text, View, Dimensions } from "react-native";
import styles from "./styles";

type HotplaceData = {
  id: string;
  destination: any;
  mainDescription: string;
  subDescription: string;
  hashTag: string;
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.42;
const SPACING = 20;

const renderItem = ({
  item,
  index,
  scrollX, // scrollX를 인수로 받음
}: {
  item: HotplaceData;
  index: number;
  scrollX: Animated.Value; // Animated.Value 타입 지정
}) => {
  // inputRange는 카드의 인덱스를 기준으로 각 카드의 위치를 정의
  const inputRange = [
    (index - 1) * (CARD_WIDTH + SPACING), // 이전 카드의 위치
    index * (CARD_WIDTH + SPACING), // 현재 카드의 위치
    (index + 1) * (CARD_WIDTH + SPACING), // 다음 카드의 위치
  ];

  // scale은 스크롤 위치에 따라 카드의 크기를 조정
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.9, 1, 0.2], // 카드가 중심에 있을 때는 크기가 1, 좌우에 있을 때는 0.9
    extrapolate: "clamp", // 범위를 벗어나는 값은 고정(clamp) 처리
  });

  // opacity는 스크롤 위치에 따라 카드의 투명도를 조정
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.7, 1, 0.7], // 카드가 중심에 있을 때는 불투명(1), 좌우에 있을 때는 0.7
    extrapolate: "clamp", // 범위를 벗어나는 값은 고정(clamp) 처리
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

export default renderItem;
