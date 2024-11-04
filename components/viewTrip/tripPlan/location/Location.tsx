import { Location } from "@/types/viewTrip/viewTrip";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Animated,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import EditModal from "../modal/editModal";

const Locations = (location: Location) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const renderHashtags = () => {
    if (!location.hastag) return null;
    const tags = location.hastag
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

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Pressable
        style={styles.locationCard}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        android_ripple={{ color: "rgba(0, 0, 0, 0.05)" }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: location.thumbnail }}
            style={styles.locationImage}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={styles.imageGradient}
          />
          <View style={styles.pencilContainer}>
            <TouchableOpacity onPress={() => setIsEditModalVisible(true)}>
              <Ionicons
                style={styles.pencil}
                name="pencil"
                size={18}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.badgeContainer}>
            <View style={styles.timeOverlay}>
              <MaterialIcons name="access-time" size={14} color="#fff" />
              <Text style={styles.visitTime}>{location.visitTime}</Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{location.category}</Text>
            </View>
          </View>
        </View>

        <View style={styles.locationContent}>
          <View style={styles.locationHeader}>
            <Text style={styles.locationName}>{location.name}</Text>
          </View>

          {renderHashtags()}

          <View style={styles.infoContainer}>
            <View style={styles.addressContainer}>
              <MaterialIcons name="location-on" size={16} color="#4B5563" />
              <Text style={styles.address} numberOfLines={1}>
                {location.address}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
      <EditModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        location={location}
        onSave={(updatedLocation: any) => {
          // 여기서 location 업데이트 로직 구현
          console.log("Updated location:", updatedLocation);
          setIsEditModalVisible(false);
        }}
      />
    </Animated.View>
  );
};

export default Locations;
