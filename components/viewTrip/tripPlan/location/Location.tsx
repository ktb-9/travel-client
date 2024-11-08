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
import { useRouter } from "expo-router";
import { useRecoilState } from "recoil";
import { destinationState } from "@/recoil/destinationState";

const Locations = (
  location: Location,
  day: number,
  isAddModalVisible: boolean,
  setIsAddModalVisible: (value: boolean) => void
) => {
  const router = useRouter();
  const [, setLocation] = useRecoilState(destinationState);
  const { mutate } = deleteLocationMutation();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [locationValue, setLocationValue] = useState<Location>(() => location);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
    setLocationValue(location);
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
            source={{ uri: locationValue.thumbnail }}
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
              <Text style={styles.visitTime}>{locationValue.visitTime}</Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{locationValue.category}</Text>
            </View>
          </View>
        </View>

        <View style={styles.locationContent}>
          <View style={styles.locationHeader}>
            <Text style={styles.locationName}>{locationValue.name}</Text>
          </View>

          {renderHashtags()}

          <View style={styles.infoContainer}>
            <View style={styles.addressContainer}>
              <MaterialIcons name="location-on" size={16} color="#4B5563" />
              <Text style={styles.address} numberOfLines={1}>
                {locationValue.address}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.footerContainer}
            onPress={handleWebView}
          >
            <LinearGradient
              colors={["#3B82F6", "#2563EB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.footerGradient}
            >
              <Text style={styles.footerText}>자세히 보기</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Pressable>

      <EditModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        location={locationValue}
        day={day}
        setLocationValue={setLocationValue}
      />

      <AddLocationModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        day={day}
        setLocationValue={setLocationValue}
      />
    </Animated.View>
  );
};

export default Locations;
