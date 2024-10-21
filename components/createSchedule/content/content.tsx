import { Text, TextInput, View } from "react-native";
import styles from "./styles";
import { useState } from "react";
import Invite from "../invite/invite";

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
    </View>
  );
};
export default Content;
