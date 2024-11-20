import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import styles from "./styles";
import leader from "@/assets/images/leader.png";
import companion from "@/assets/images/companion.png";
import { useRecoilValue } from "recoil";
import groupHostState from "@/recoil/groupHostState";
import getMemberQuery from "@/hooks/api/getMemberQuery";
import postLink from "@/api/group/postLink";
import { useRoute } from "@react-navigation/native";
import { groupMembersState } from "@/recoil/groupMemberState";
import { useGroupSocket } from "@/api/group/useGroupSocket";

const Invite = () => {
  const route = useRoute();
  const encodedId = route.params?.id;
  const decodedId = decodeURIComponent(encodedId); // URL 디코딩
  const { socket, members } = useGroupSocket(parseInt(decodedId), 1);
  // const { data, isLoading, isError } = getMemberQuery(parseInt(decodedId));

  // if (isLoading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  // if (isError || !data) {
  //   return <Text>에러 로딩 업커밍</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}></View>
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
