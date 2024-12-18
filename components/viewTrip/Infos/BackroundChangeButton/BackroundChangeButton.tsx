import Button from "@/components/common/Button/button";
import styles from "./styles";

export const BackgroundChangeButton = ({
  onPress,
}: {
  onPress: () => void;
}) => {
  return (
    <Button
      variant="icon"
      icon={{ name: "image", size: 24, color: "white" }}
      onPress={onPress}
      style={styles.changeButton}
    />
  );
};
