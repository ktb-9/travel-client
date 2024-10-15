import { View, Image } from "react-native";
import styles from "./styles";
import jeju from "@/assets/images/jeju.png";
import busan from "@/assets/images/busan.png";
type Destination = {
  destination: any; // You might want to use a more specific type for the image
};
const HotPlace = () => {
  const data: Destination[] = [
    {
      destination: jeju,
    },
    {
      destination: busan,
    },
  ];

  return (
    <View style={styles.container}>
      {data.map((value: Destination, index: number) => (
        <View key={index} style={styles.box}>
          <Image source={value.destination} style={styles.image} />
          <View style={styles.overlay} />
        </View>
      ))}
    </View>
  );
};

export default HotPlace;
