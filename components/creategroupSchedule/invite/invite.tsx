import { ScrollView, Text, View, Image } from "react-native";
import styles from "./styles";
import leader from "@/assets/images/leader.png";
import companion from "@/assets/images/companion.png";
import { useRecoilValue } from "recoil";
import { useGroupSocket } from "@/api/group/useGroupSocket";
import authState from "@/recoil/authState";
import postLink from "@/api/group/postLink";
import groupHostState from "@/recoil/groupHostState";
import Button from "@/components/common/Button/button";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import Toast from "../../common/Toast/Toast";
import { useLocalSearchParams } from "expo-router";
type Params = {
  id: string;
};
const Invite = () => {
  const params = useLocalSearchParams<Params>();
  const encodedId = params.id;
  const groupState = useRecoilValue(groupHostState);
  const decodedId = decodeURIComponent(encodedId); // URL 디코딩
  const userValue = useRecoilValue(authState);
  const { socket, members } = useGroupSocket(parseInt(decodedId), userValue.id);
  const [toastVisible, setToastVisible] = useState(false);
  const createLink = async () => {
    try {
      const response = await postLink(groupState.group_id);
      if (response) {
        await Clipboard.setStringAsync(response.inviteLink); // 변경된 부분
        setToastVisible(true);
      }
    } catch (error) {
      console.error("Failed to create or copy link:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button variant="secondary" title="동행인 추가" onPress={createLink} />
      </View>
      <View style={styles.invitedWrapper}>
        <ScrollView contentContainerStyle={styles.listWrapper}>
          {members.map((value: any) => (
            <View style={styles.listItem}>
              <View style={styles.listContents}>
                <Image
                  style={styles.profile}
                  source={{
                    uri: value.profileImage.replace("http://", "https://"),
                  }}
                />
                <Text style={styles.name}>{value.nickname}</Text>
                <Image
                  style={styles.lead}
                  source={value.role == "HOST" ? leader : companion}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <Toast
        visible={toastVisible}
        message="링크가 복사되었습니다"
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
};
export default Invite;
