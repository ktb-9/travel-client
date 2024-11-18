import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import tripQuery from "@/hooks/api/tripQuery";
import { defaults } from "@/constants/default";
import Group from "../group/group";
import TripPlan from "../tripPlan/tripPlan";
import { useRouter } from "expo-router";

const Content = () => {
  const { data, isLoading, isError } = tripQuery(1);
  const router = useRouter();
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError || !data) {
    return <Text>에러 트립</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image source={defaults.image} style={styles.image} />
        <View style={styles.overlay} />
        <Group data={data.data} />
      </View>
      <View style={styles.planContainer}>
        <TripPlan data={data.data} />
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={styles.endTrip}
          onPress={() => router.push("/summary/Summary")}
        >
          <Text style={styles.endText}>여행 종료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Content;
