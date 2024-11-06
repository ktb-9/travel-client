import { Location } from "@/types/viewTrip/viewTrip";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import {
  Animated,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import EditModal from "../modal/editModal";
import AddLocationModal from "./modal/AddLocationModal";
import deleteLocationMutation from "@/hooks/api/deleteLocationMutation";

const Locations = (location: Location, day: number) => {
  const { mutate } = deleteLocationMutation();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

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
  const onDelete = (locationId: number) => {
    mutate(locationId);
  };

  const handleDelete = () => {
    Alert.alert("장소 삭제", "이 장소를 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "삭제",
        onPress: () => onDelete(location.locationId),
        style: "destructive",
      },
    ]);
  };

  const renderHashtags = () => {
    if (!location.hashtag) return null;
    const tags = location.hashtag
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
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              onPress={() => setIsEditModalVisible(true)}
              style={styles.actionButton}
            >
              <Ionicons name="pencil" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={[styles.actionButton, styles.deleteButton]}
            >
              <AntDesign name="delete" size={18} color="#fff" />
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsAddModalVisible(true)}
      >
        <AntDesign name="plus" size={24} color="#fff" />
        <Text style={styles.addButtonText}>새로운 장소 추가</Text>
      </TouchableOpacity>

      <EditModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        location={location}
        day={day}
      />

      <AddLocationModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        day={day}
      />
    </Animated.View>
  );
};

export default Locations;
