import { View } from "react-native";
import styles from "./styles";
styles;
const renderUserIndicators = (
  userIds: string[],
  userColors: Record<string, string>
) => {
  return (
    <View style={styles.userIndicatorsContainer}>
      {userIds.map((userId, index) => (
        <View
          key={userId}
          style={[
            styles.userIndicator,
            { backgroundColor: userColors[userId] || "#CCCCCC" },
            index === 0 && styles.firstIndicator,
          ]}
        />
      ))}
    </View>
  );
};
export default renderUserIndicators;
