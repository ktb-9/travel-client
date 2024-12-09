import { LinearGradient } from "expo-linear-gradient";
import { Image, View } from "react-native";
import styles from "./styles";
import { LocationCardProps } from "@/types/viewTrip/viewTrip";
import Button from "@/components/common/Button/button";
import Badge from "../Badge/Badge";
import LocationInfo from "../LocationInfo/LocationInfo";
import LocationCardFooter from "../LocationCardFooter/LocationCardFooter";
import { defaults } from "@/constants/default";

export const LocationCard = ({
  locationValue,
  setIsEditModalVisible,
  handleDelete,
  renderHashtags,
  handleWebView,
}: LocationCardProps) => {
  return (
    <View style={styles.locationCard}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: locationValue.thumbnail || defaults.gt }}
          style={styles.locationImage}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.imageGradient}
        />
        <View style={styles.actionButtonsContainer}>
          <Button
            variant="icon"
            icon={{ name: "pencil", size: 18, color: "#fff" }}
            onPress={() => setIsEditModalVisible(true)}
            style={styles.actionButton}
          />
          <Button
            variant="icon"
            icon={{ name: "trash", size: 18, color: "#fff" }}
            onPress={handleDelete}
            style={styles.deleteButton}
          />
        </View>
        <Badge locationValue={locationValue} />
      </View>

      <View style={styles.locationContent}>
        <LocationInfo
          locationValue={locationValue}
          renderHashtags={renderHashtags}
        />
        <LocationCardFooter handleWebView={handleWebView} />
      </View>
    </View>
  );
};
