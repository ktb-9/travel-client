import { TextInput, View } from "react-native";
import styles from "./styles";
import { useState } from "react";
import Invite from "../invite/invite";
import Calendar from "../calendar/calendar";

const Content = () => {
  const [groupName, setGroupName] = useState("");
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
