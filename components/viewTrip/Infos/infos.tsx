import { Image, Text, View } from "react-native";
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
import getPaymentMembersQuery from "@/hooks/api/getPaymentMembersQuery";
import { AddMemberButton } from "./AddMemberButton/AddMemberButton";
import { LeaveRoomButton } from "./LeaveRoomButton/LeaveRoomButton";
import leaveGroupMutation from "@/hooks/api/leaveGroupMutation";
import postLink from "@/api/group/postLink";
import * as Clipboard from "expo-clipboard";
import Toast from "./Toast/Toast";

const Infos = () => {
  const tripId = useRecoilValue(tripIdState);
  const [toastVisible, setToastVisible] = useState(false);
  const { data } = tripQuery(tripId);
  const [backgroundUri, setBackgroundUri] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [groupId, setGroupId] = useRecoilState(groupIdState);
  const { data: groupMembers } = getPaymentMembersQuery(tripId);
  const { mutate: leaveGroup } = leaveGroupMutation(tripId);

  useEffect(() => {
    if (data?.backgroundUrl) {
      setBackgroundUri(data.backgroundUrl);
    } else {
      setBackgroundUri(defaults.bg);
    }
    setGroupId(data.group_id);
  }, [data]);

  const handleAddMember = async () => {
    try {
      const response = await postLink(groupId);
      if (response) {
        await Clipboard.setStringAsync(response.inviteLink); // 변경된 부분
        setToastVisible(true);
      }
    } catch (error) {
      console.error("링크 생성 실패", error);
    }
  };

  const handleLeaveRoom = () => {
    leaveGroup();
  };

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
          <View style={styles.buttonContainer}>
            <AddMemberButton onPress={handleAddMember} />
            <LeaveRoomButton onPress={handleLeaveRoom} />
          </View>

          <BackgroundChangeButton onPress={() => setModalVisible(true)} />
          <Group data={data} />

          {groupMembers && groupMembers.length > 0 && (
            <View style={styles.membersContainer}>
              {groupMembers
                .slice(0, 3)
                .map((member: { profile_image: string }, index: number) => (
                  <View
                    key={index}
                    style={[
                      styles.memberProfileContainer,
                      { zIndex: groupMembers.length - index },
                    ]}
                  >
                    <Image
                      source={{
                        uri:
                          member.profile_image.replace("http://", "https://") ||
                          defaults.gt,
                      }}
                      style={styles.memberProfileImage}
                    />
                  </View>
                ))}
              {groupMembers.length > 3 && (
                <View style={styles.memberCountBadge}>
                  <Text style={styles.memberCountText}>
                    +{groupMembers.length - 3}
                  </Text>
                </View>
              )}
            </View>
          )}
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
  }, [data, backgroundUri, isModalVisible, groupMembers]);

  return (
    <>
      <Toast
        visible={toastVisible}
        message="링크가 복사되었습니다"
        onHide={() => setToastVisible(false)}
      />
      <View style={styles.container}>{renderContent}</View>
    </>
  );
};

export default Infos;
