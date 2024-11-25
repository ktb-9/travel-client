import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { ButtonProps } from "@/types/common/button";
import { variantStyles } from "./variantStyle";
import { textVariantStyles } from "./textVariantStyles";

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant,
  disabled = false,
  loading = false,
  style,
  textStyle,
  testID,
  icon,
}) => {
  const getVariantStyle = () => {
    return variant ? variantStyles[variant] || {} : {};
  };
  const getTextVariantStyle = () => {
    return variant ? textVariantStyles[variant] || {} : {};
  };
  const renderIcon = () => {
    if (!icon) return null;

    return (
      <Ionicons name={icon.name} size={icon.size || 24} color={icon.color} />
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={variant === "outline" ? "#007AFF" : "#FFFFFF"}
        />
      );
    }

    if (!title) {
      return renderIcon();
    }

    return (
      <>
        {title && (
          <Text
            style={[
              getTextVariantStyle(),
              disabled && styles.disabledText,
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}
        {renderIcon()}
      </>
    );
  };

  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        variant && styles.button,
        getVariantStyle(),
        disabled && styles.disabledButton,
        style,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;
