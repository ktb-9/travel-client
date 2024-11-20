import { ActivityIndicator, Text, TextInput, View } from "react-native";
import styles from "./styles";
import { useState } from "react";
import Invite from "../invite/invite";
import Calendar from "../calendar/calendar";
import getGroupQuery from "@/hooks/api/getGroupQuery";
import { useRecoilValue } from "recoil";
import groupHostState from "@/recoil/groupHostState";

const Content = () => {
  const [groupName, setGroupName] = useState("");
  const groupState = useRecoilValue(groupHostState);
  const { data, isLoading, isError } = getGroupQuery(groupState.group_id);
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError || !data) {
    return <Text>에러 로딩 업커밍</Text>;
  }
  return (
    <View style={styles.container}>
      <TextInput
        value={groupName || ""}
        onChangeText={setGroupName}
        style={styles.inputText}
        placeholder="그룹 이름을 입력해주세요..."
      />
      <Invite />
      <Calendar groupName={groupName} />
    </View>
  );
};
export default Content;
