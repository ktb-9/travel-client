import { DayProps } from "@/types/viewTrip/viewTrip";
import styles from "./styles";
import { ScrollView, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Locations from "../location/Location";
import { useState } from "react";
import AddLocationModal from "../location/modal/AddLocationModal";
import DayHeader from "./DayHeader/DayHeader";

const Day: React.FC<DayProps> = ({ day, destination, locations, setDays }) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  return (
    <View style={styles.dayContainer} key={day}>
      <DayHeader
        day={day}
        destination={destination}
        locations={locations}
        setIsAddModalVisible={setIsAddModalVisible}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.locationsContainer}>
          {locations.map((location, idx) => (
            <View key={idx} style={styles.locationWrapper}>
              <Locations location={location} day={day} setDays={setDays} />
              {idx < locations.length - 1 && (
                <View style={styles.connector}>
                  <MaterialIcons name="more-vert" size={24} color="#ddd" />
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <AddLocationModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        day={day}
      />
    </View>
  );
};

export default Day;
