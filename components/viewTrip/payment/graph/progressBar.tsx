import React from "react";
import { View, StyleSheet } from "react-native";
import { CATEGORY_COLORS, DEFAULT_COLOR } from "@/constants/default";
import { styles } from "./styles";

type ProgressBarProps = {
  category: string;
  width: string | number;
};

export const ProgressBar = ({ category, width }: ProgressBarProps) => {
  const widthValue = typeof width === "string" ? parseFloat(width) : width;

  return (
    <View style={styles.progressBar}>
      <View
        style={[
          styles.progressFill,
          {
            width: widthValue,
            backgroundColor: CATEGORY_COLORS[category] || DEFAULT_COLOR,
          },
        ]}
      />
    </View>
  );
};
