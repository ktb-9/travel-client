// components/Payment/SubmitButton.tsx
import { TouchableOpacity, Text, View } from "react-native";
import styles from "./styles";

interface SubmitButtonProps {
  onSubmit: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => (
  <View style={styles.submitWrapper}>
    <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
      <Text style={styles.submitButtonText}>지출 수정</Text>
    </TouchableOpacity>
  </View>
);
export default SubmitButton;
