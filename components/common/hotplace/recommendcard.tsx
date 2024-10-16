import { View, Image, Text } from "react-native";
import styles from "./styles";
import heart from "@/assets/images/iconheart.png";
type Destination = {
  id: number;
  image: any;
  mainDescription: string;
  subDescription: string;
};
const DestinationCard: React.FC<{ destination: Destination; style?: any }> = ({
  destination,
  style,
}) => (
  <View style={[styles.box, style]}>
    <Image source={destination.image} style={styles.image} />
    <View style={styles.overlay} />
    <View style={styles.content}>
      <Text style={styles.mainTitle}>{destination.mainDescription}</Text>
      <Text style={styles.subTitle}>{destination.subDescription}</Text>
      <Image source={heart} style={styles.icon} />
    </View>
  </View>
);
export default DestinationCard;
