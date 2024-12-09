import { ActivityIndicator, Image, Text, View } from "react-native";
import styles from "./styles";
import TripPlan from "../tripPlan/tripPlan";
import { useRecoilValue } from "recoil";
import tripIdState from "@/recoil/tripIdState";
import { useEffect, useMemo, useState } from "react";
import tripQuery from "@/hooks/api/tripQuery";
import Group from "../group/group";
import { BackgroundChangeButton } from "./BackroundChangeButton/BackroundChangeButton";
import BackgroundSelectionModal from "./Modal/ImagePickerSection";
import { defaults } from "@/constants/default";

const Infos = () => {
  const tripId = useRecoilValue(tripIdState);
  const { data, isLoading, isError } = tripQuery(tripId);
  const [backgroundUri, setBackgroundUri] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (data?.backgroundUrl) {
      setBackgroundUri(data.backgroundUrl);
    } else {
      setBackgroundUri(defaults.bg);
    }
  }, [data]);
  const renderContent = useMemo(() => {
    if (!data) return null;

    return (
      <>
        <View style={styles.background}>
          <Image
            source={{
              uri: backgroundUri,
            }}
            style={styles.image}
          />
          <View style={styles.overlay} />

          <BackgroundChangeButton onPress={() => setModalVisible(true)} />
          <Group data={data} />
        </View>
        <BackgroundSelectionModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onSelectBackground={setBackgroundUri}
          groupId={data.group_id}
        />

        <View style={styles.planContainer}>
          <TripPlan data={data} />
        </View>
      </>
    );
  }, [data, backgroundUri, isModalVisible]);

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
