import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import destination from "@/assets/images/destinationLogo.png";
import marker from "@/assets/images/gps.png";
const Content = () => {
  return (
    <>
      <View style={styles.destinationWrapper}>
        <Image source={destination} style={styles.destinationLogo} />
        <Text style={styles.destination}>대구</Text>
        <TouchableOpacity>
          <Text style={styles.edit}>편집</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.day}>1일차</Text>
      <View style={{ alignItems: "center" }}>
        <View style={styles.locationContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="장소/맞집/숙소/검색"
            ></TextInput>
            <TouchableOpacity>
              <Image style={styles.marker} source={marker} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
export default Content;
