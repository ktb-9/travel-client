import { Location, LocationsProps } from "@/types/viewTrip/viewTrip";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import styles from "./styles";
import EditModal from "../modal/editModal";
import { useRouter } from "expo-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { destinationState } from "@/recoil/destinationState";
import tripIdState from "@/recoil/tripIdState";
import { useTripDelete } from "@/hooks/viewTrip/useTripDelete";
import { LocationCard } from "./LocationCard/LocationCard";

const Locations: React.FC<LocationsProps> = ({ location, day, setDays }) => {
  const router = useRouter();
  const [, setLocation] = useRecoilState(destinationState);
  const tripId = useRecoilValue(tripIdState);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [locationValue, setLocationValue] = useState<Location>(location);
  const { handleDelete } = useTripDelete({ location, setDays, tripId });

  useEffect(() => {
    setLocationValue(location);
  }, [location]);

  const renderHashtags = () => {
    if (!locationValue.hashtag) return null;
    const tags = locationValue.hashtag
      .trim()
      .split("#")
      .filter((tag) => tag);

    return (
      <View style={styles.hashtagContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.hashtagBadge}>
            <Text style={styles.hashtagText}>#{tag.trim()}</Text>
          </View>
        ))}
      </View>
    );
  };

  const handleWebView = () => {
    router.push("/locationInfo/locationInfo");
    setLocation(locationValue.name);
  };

  return (
    <View style={styles.container}>
      <LocationCard
        locationValue={locationValue}
        setIsEditModalVisible={setIsEditModalVisible}
        handleDelete={handleDelete}
        renderHashtags={renderHashtags}
        handleWebView={handleWebView}
      />
      <EditModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        location={locationValue}
        day={day}
        setLocationValue={setLocationValue}
      />
    </View>
  );
};

export default Locations;
