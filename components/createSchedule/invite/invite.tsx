import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import styles from "./styles";
import inviteQuery from "@/hooks/api/inviteQuery";
import leader from "@/assets/images/leader.png";
import companion from "@/assets/images/companion.png";
import { useRecoilValue } from "recoil";
import groupHostState from "@/recoil/groupHostState";
import getMemberQuery from "@/hooks/api/getMemberQuery";

const Invite = () => {
  const groupState = useRecoilValue(groupHostState);
  const { data, isLoading, isError } = getMemberQuery(groupState.group_id);
  console.log(data);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError || !data) {
    return <Text>에러 로딩 업커밍</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.addCompanion}>
          <Text style={styles.buttonText}>동행인 추가</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.invitedWrapper}>
        <ScrollView contentContainerStyle={styles.listWrapper}>
          {data.map((value: any) => (
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
