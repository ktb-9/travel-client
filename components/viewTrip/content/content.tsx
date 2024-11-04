import { ActivityIndicator, Text, View } from "react-native";
import styles from "./styles";
import tripQuery from "@/hooks/api/tripQuery";

const Content = () => {
  const { data, isLoading, isError } = tripQuery(1);
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError || !data) {
    return <Text>에러 트립</Text>;
  }
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.background}></View>
    </View>
  );
};
export default Content;
