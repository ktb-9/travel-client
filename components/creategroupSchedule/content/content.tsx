import { ActivityIndicator, Text, TextInput, View } from "react-native";

import { useEffect, useState } from "react";
import Invite from "../invite/invite";
import getGroupQuery from "@/hooks/api/getGroupQuery";
import { useRoute } from "@react-navigation/native";
import styles from "./styles";
import Calendar from "../calendar/calendar";

const Content = () => {
  const [groupName, setGroupName] = useState("");
  const route = useRoute();
  const encodedId = route.params?.id;
  const decodedId = decodeURIComponent(encodedId); // URL 디코딩
  console.log("decode", decodedId);
  const { data, isLoading, isError } = getGroupQuery(parseInt(decodedId));

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
