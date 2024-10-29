import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import destination from "@/assets/images/destinationLogo.png";
import marker from "@/assets/images/gps.png";
import { PlanType } from "../plan";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { dayState } from "@/recoil/dayState";
import { locationState } from "@/recoil/locationState";
interface ContentProps {
  dayInfo: PlanType;
}
const Content = ({ dayInfo }: ContentProps) => {
  const router = useRouter();
  const { day } = dayInfo;
  const [trip, setTrip] = useState("");
  const [, setDay] = useRecoilState(dayState);
  const plan = useRecoilValue(locationState);
  console.log(plan);
  const handleMap = () => {
    router.push("/map/map");
    setDay({ day: day });
  };
  return (
    <>
      <View style={styles.destinationWrapper}>
        <Image source={destination} style={styles.destinationLogo} />
        <TextInput
          style={styles.trip}
          value={trip}
          onChangeText={setTrip}
          placeholder="여행지 입력해주세요..."
        />
      </View>
      <Text style={styles.day}>{day}일차</Text>
      <View style={{ alignItems: "center" }}>
        <View style={styles.locationContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="장소/맞집/숙소/검색"
            ></TextInput>
            <TouchableOpacity onPress={handleMap}>
              <Image style={styles.marker} source={marker} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
export default Content;
