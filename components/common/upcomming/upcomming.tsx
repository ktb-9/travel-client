import { Image, Text, View } from "react-native";
import styles from "./styles";
import daegu from "@/assets/images/daegu.png";
import jeans from "@/assets/images/jeans.png";
const data = {
  destination: "대구",
  thumbnail: daegu,
  day: "D-19",
  nickname: "청바지",
  groupThumbnail: jeans,
};
const UpComming = () => {
  return (
    <View style={styles.container}>
      <Image source={data.thumbnail} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Image
              source={data.groupThumbnail}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
        <Text style={styles.nickname}>{data.nickname}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.day}>{data.day}</Text>
        <Text style={styles.destination}>{data.destination}</Text>
      </View>
    </View>
  );
};
export default UpComming;
