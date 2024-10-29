import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import destination from "@/assets/images/destinationLogo.png";
import { PlanType } from "../plan";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { dayState } from "@/recoil/dayState";
import { locationState } from "@/recoil/locationState";
import { Ionicons } from "@expo/vector-icons";
interface ContentProps {
  dayInfo: PlanType;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  data: any;
}
const Content = ({ dayInfo, data, setData }: ContentProps) => {
  const router = useRouter();
  const { day } = dayInfo;
  const [trip, setTrip] = useState("");
  const [, setDay] = useRecoilState(dayState);
  const plan = useRecoilValue(locationState);
  const [locations, setLocations] = useState<string[]>([]);
  const handleMap = () => {
    router.push("/map/map");
    setDay({ day: day });
  };
  useEffect(() => {
    const existingDays = plan.find((loc) => loc.day == day);
    if (existingDays) {
      setLocations(existingDays.locations);
      setData((prevData) => {
        const filteredData = prevData.filter((item) => item.day !== day);
        return [
          ...filteredData,
          {
            day: day,
            trip: trip,
            visit: existingDays.locations,
          },
        ];
      });
    }
  }, [plan]);
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
              <Ionicons name="location" size={20} color="#0066cc" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.resultsList}>
            {locations.map((locationName, index) => (
              <TouchableOpacity
                key={`location-${index}`}
                style={[
                  styles.resultItem,
                  index === locations.length - 1 && styles.lastResultItem,
                ]}
              >
                <View style={styles.resultIconContainer}>
                  <Ionicons name="location" size={20} color="#0066cc" />
                </View>
                <View style={styles.resultTextContainer}>
                  <Text>{locationName}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};
export default Content;
