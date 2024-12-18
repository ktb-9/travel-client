import { ActivityIndicator, Image, Text, View } from "react-native";
import styles from "./styles";
import TripPlan from "../tripPlan/tripPlan";
import { useRecoilState, useRecoilValue } from "recoil";
import tripIdState from "@/recoil/tripIdState";
import { useEffect, useMemo, useState } from "react";
import tripQuery from "@/hooks/api/tripQuery";
import Group from "../group/group";
import { BackgroundChangeButton } from "./BackroundChangeButton/BackroundChangeButton";
import BackgroundSelectionModal from "./Modal/ImagePickerSection";
import { defaults } from "@/constants/default";
import React from "react";
import groupIdState from "@/recoil/groupIdState";

const Infos = () => {
  const tripId = useRecoilValue(tripIdState);
  const { data } = tripQuery(tripId);
  const [backgroundUri, setBackgroundUri] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [, setGroupId] = useRecoilState(groupIdState);
  useEffect(() => {
    if (data?.backgroundUrl) {
      setBackgroundUri(data.backgroundUrl);
    } else {
      setBackgroundUri(defaults.bg);
    }
    setGroupId(data.group_id);
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

  return <View style={styles.container}>{renderContent}</View>;
};
export default Infos;
