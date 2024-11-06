import { planState } from "@/types/viewTrip/viewTrip";
import styles from "./styles";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Locations from "../location/Location";
import { useState } from "react";

const Day = (plan: planState) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  return (
    <View style={styles.dayContainer} key={plan.day}>
      <View style={styles.dayHeader}>
        <View style={styles.dayInfo}>
          <Text style={styles.dayText}>{plan.day} 일차</Text>
          <View style={styles.destinationContainer}>
            <MaterialIcons name="place" size={20} color="#4E5968" />
            <Text style={styles.destinationText}>{plan.destination}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{plan.locations.length}곳</Text>
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
          {plan.locations.map((location, idx) => (
            <View key={idx} style={styles.locationWrapper}>
              {Locations(
                location,
                plan.day,
                isAddModalVisible,
                setIsAddModalVisible
              )}
              {idx < plan.locations.length - 1 && (
                <View style={styles.connector}>
                  <MaterialIcons name="more-vert" size={24} color="#ddd" />
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default Day;
