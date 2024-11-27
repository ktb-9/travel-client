import { ActivityIndicator, Image, Text, View } from "react-native";
import styles from "./styles";
import { defaults } from "@/constants/default";
import TripPlan from "../tripPlan/tripPlan";
import { useRecoilValue } from "recoil";
import tripIdState from "@/recoil/tripIdState";
import { useMemo } from "react";
import tripQuery from "@/hooks/api/tripQuery";
import Group from "../group/group";

const Infos = () => {
  const tripId = useRecoilValue(tripIdState);
  const { data, isLoading, isError } = tripQuery(tripId);

  const renderContent = useMemo(() => {
    if (!data) return null;

    return (
      <>
        <View style={styles.background}>
          <Image source={defaults.image} style={styles.image} />
          <View style={styles.overlay} />
          <Group data={data} />
        </View>
        <View style={styles.planContainer}>
          <TripPlan data={data} />
        </View>
      </>
    );
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.container}>
        <Text>에러 트립</Text>
      </View>
    );
  }

  return <View style={styles.container}>{renderContent}</View>;
};
export default Infos;
