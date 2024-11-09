import { View, Text } from "react-native";
import styles from "./styles";

import { useFonts } from "expo-font";
import DestinationCard from "./recommendcard";
import { data } from "./data";

const HotPlace = () => {
  const [fontsLoaded] = useFonts({
    NotoBold: require("@/assets/fonts/NotoSansKR-Black.ttf"),
    robotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>핫 플레이스</Text>
      <Text style={styles.comment}>가장 인기있는 장소</Text>
      <View style={styles.wrapper}>
        <DestinationCard destination={data[0]} />
        <View style={styles.grid23}>
          <DestinationCard destination={data[1]} style={styles.box2} />
          <DestinationCard destination={data[2]} style={styles.box2} />
        </View>
        <DestinationCard destination={data[3]} style={styles.box3} />
      </View>
    </View>
  );
};

export default HotPlace;
