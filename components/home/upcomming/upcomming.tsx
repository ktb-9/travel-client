import { Image, Text, View, ActivityIndicator } from "react-native";
import styles from "./styles";
import upCommingQuery from "@/hooks/api/upCommingQuery";

const UpComming = () => {
  const { data } = upCommingQuery();

  return (
    <View style={styles.container}>
      <Image
        source={data.data.thumbnail}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Image
              source={data.data.groupThumbnail}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
        <Text style={styles.nickname}>{data.data.nickname}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.day}>{data.data.day}</Text>
        <Text style={styles.destination}>{data.data.destination}</Text>
      </View>
    </View>
  );
};
export default UpComming;
