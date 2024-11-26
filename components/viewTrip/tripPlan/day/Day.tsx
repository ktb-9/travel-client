import { planState } from "@/types/viewTrip/viewTrip";
import styles from "./styles";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Locations from "../location/Location";
import { useState } from "react";
import AddLocationModal from "../location/modal/AddLocationModal";

interface DayProps {
  day: number;
  destination: string;
  locations: planState["locations"];
}

const Day: React.FC<DayProps> = ({ day, destination, locations }) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  console.log(locations);

  return (
    <View style={styles.dayContainer} key={day}>
      <View style={styles.dayHeader}>
        <View style={styles.dayInfo}>
          <Text style={styles.dayText}>{day} 일차</Text>
          <View style={styles.destinationContainer}>
            <MaterialIcons name="place" size={20} color="#4E5968" />
            <Text style={styles.destinationText}>{destination}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{locations.length}곳</Text>
            </View>
          </View>
        </View>
        <View style={{ display: "flex", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAddModalVisible(true)}
          >
            <Text style={styles.addButtonText}>새로운 장소 추가</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.locationsContainer}>
          {locations.map((location, idx) => (
            <View key={idx} style={styles.locationWrapper}>
              <Locations location={location} day={day} />
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
