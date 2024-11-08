import { ActivityIndicator, Image, Text, View } from "react-native";
import styles from "./styles";
import tripQuery from "@/hooks/api/tripQuery";
import { defaults } from "@/constants/default";
import Summary from "../summary/summary";

const Content = () => {
  const { data, isLoading, isError } = tripQuery(1);
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
      </View>
      <View style={styles.summaryContainer}>
        <Summary />
      </View>
    </View>
  );
};
export default Content;
