import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const LocationCardFooter = ({
  handleWebView,
}: {
  handleWebView: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.footerContainer} onPress={handleWebView}>
      <LinearGradient
        colors={["#3B82F6", "#2563EB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.footerGradient}
      >
        <Text style={styles.footerText}>자세히 보기</Text>
        <MaterialIcons name="arrow-forward" size={20} color="#fff" />
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default LocationCardFooter;
