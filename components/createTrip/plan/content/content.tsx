import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import destinationIcon from "@/assets/images/destinationLogo.png";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import LocationItem from "../../location/locationItem";
import { DayPlan } from "@/types/createTrip/createTrip";
import useTripPlan from "@/hooks/createTrip/useTripPlan";
import Button from "@/components/common/Button/button";

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
    <View style={styles.container}>
      <View style={styles.destinationWrapper}>
        <Image source={destinationIcon} style={styles.destinationIcon} />
        <TextInput
          style={styles.destinationInput}
          value={dayPlan.destination}
          onChangeText={(destination) =>
            updateDestination(dayPlan, destination)
          }
          placeholder="여행지 입력해주세요..."
        />
      </View>
      <Text style={styles.dayText}>{dayPlan.day} 일차</Text>
      <View style={styles.locationContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.locationInput}
            placeholder="장소/맞집/숙소/검색"
          />
          <Button
            variant="icon"
            icon={{ name: "location", size: 20, color: "#0066cc" }}
            onPress={handleMap}
          />
        </View>
        <ScrollView style={styles.locationsList}>
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
  );
};

export default Content;
