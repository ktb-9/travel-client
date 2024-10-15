import { View, Image, Text } from "react-native";
import styles from "./styles";
import jeju from "@/assets/images/jeju.png";
import busan from "@/assets/images/busan.png";
import heart from "@/assets/images/iconheart.png";
type dataState = {
  destination: any;
  mainDescription: string;
  subDescription: string;
};
const HotPlace = () => {
  const data: dataState[] = [
    {
      destination: jeju,
      mainDescription: "설렘으로 가득한 노을",
      subDescription: "제주에서 추억 만들러 갈까요?",
    },
    {
      destination: busan,
      mainDescription: "스트레스 풀 땐 바다지",
      subDescription: "부산함 갈까!",
    },
  ];

  return (
    <View style={styles.container}>
      {data.map((value: dataState) => (
        <View style={styles.box}>
          <Image source={value.destination} style={styles.image} />
          <View style={styles.overlay} />
          <View style={styles.content}>
            <Text style={styles.mainTitle}>{value.mainDescription}</Text>
            <Text style={styles.subTitle}>{value.subDescription}</Text>
            <Image source={heart} style={styles.icon} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default HotPlace;
