import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import leader from "@/assets/images/leader.png";
import companion from "@/assets/images/companion.png";
import { useRecoilValue } from "recoil";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useGroupSocket } from "@/api/group/useGroupSocket";
import authState from "@/recoil/authState";
import postLink from "@/api/group/postLink";
import groupHostState from "@/recoil/groupHostState";
import Button from "@/components/common/Button/button";
type RouteParams = {
  id: string;
};
const Invite = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
  const encodedId = route.params?.id;
  const groupState = useRecoilValue(groupHostState);
  const decodedId = decodeURIComponent(encodedId); // URL 디코딩
  const userValue = useRecoilValue(authState);
  const { socket, members } = useGroupSocket(parseInt(decodedId), userValue.id);
  const createLink = async () => {
    const response = await postLink(groupState.group_id);
    console.log(response);
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
    </View>
  );
};
export default Invite;
