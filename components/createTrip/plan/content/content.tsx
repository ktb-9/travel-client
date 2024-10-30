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
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import LocationItem from "../../location/locationItem";
import { DayPlan } from "@/types/createTrip/createTrip";
import useTripPlan from "@/hooks/createTrip/useTripPlan";

const Content = ({ dayPlan }: { dayPlan: DayPlan }) => {
  const router = useRouter();

  const { updateDestination, deleteLocation } = useTripPlan();

  const handleMap = () => {
    router.push({
      pathname: "/map/map",
      params: { day: dayPlan.day },
    });
  };

  return (
    <>
      <View style={styles.destinationWrapper}>
        <Image source={destination} style={styles.destinationLogo} />
        <TextInput
          style={styles.trip}
          value={dayPlan.destination}
          onChangeText={(destination) =>
            updateDestination(dayPlan, destination)
          }
          placeholder="여행지 입력해주세요..."
        />
      </View>
      <Text style={styles.day}>{dayPlan.day}일차</Text>
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
            {dayPlan.locations.map((location, index) => (
              <LocationItem
                key={`location-${index}`}
                location={location}
                isLast={index === dayPlan.locations.length - 1}
                onDelete={() => deleteLocation(dayPlan, index)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};
export default Content;
