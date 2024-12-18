import {
  Image,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import upCommingQuery from "@/hooks/api/upCommingQuery";
import { defaults } from "@/constants/default";
import useDday from "@/hooks/home/useDday";
import { useRouter } from "expo-router";
import { useRecoilState } from "recoil";
import tripIdState from "@/recoil/tripIdState";

const UpComming = () => {
  const router = useRouter();
  const { data } = upCommingQuery();
  const [, setTrip] = useRecoilState(tripIdState);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.push(`/trip/${data[0].trip_id}`);
        setTrip(data[0]?.trip_id);
      }}
    >
      <Image
        source={{ uri: data[0]?.background_url || defaults.bg }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Image
              source={{ uri: data[0]?.group_thumbnail || defaults.gt }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
        <Text style={styles.nickname}>{data[0]?.group_name}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.day}>{useDday(data[0]?.date)}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default UpComming;
