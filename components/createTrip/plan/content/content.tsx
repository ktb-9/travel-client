import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import destination from "@/assets/images/destinationLogo.png";
import marker from "@/assets/images/gps.png";
import { PlanType } from "../plan";
import { useState } from "react";
interface ContentProps {
  dayInfo: PlanType;
}
const Content = ({ dayInfo }: ContentProps) => {
  const { day, plan } = dayInfo;
  const [trip, setTrip] = useState("");
  console.log(trip);
  return (
    <>
      <View style={styles.destinationWrapper}>
        <Image source={destination} style={styles.destinationLogo} />
        <TextInput value={trip} onChangeText={setTrip} />
      </View>
      <Text style={styles.day}>{day}일차</Text>
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
