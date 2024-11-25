import { Ionicons } from "@expo/vector-icons";
import { TextStyle, ViewStyle } from "react-native";
type IconName = keyof typeof Ionicons.glyphMap;
export interface ButtonProps {
  onPress: () => void;
  title?: string;
  variant?: "primary" | "secondary" | "outline" | "icon" | "arrow";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  // 아이콘 관련 props
  icon?: {
    name: IconName;
    size?: number;
    color?: string;
  };
  isDark?: boolean;
}
