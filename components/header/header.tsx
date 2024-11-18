import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { header } from "@/types/header";
import styles from "./styles";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface userState {
  nickname: string;
  profileImage: string;
}

const Header = ({ toggle, isDark }: header) => {
  const [userValue, setUserValue] = useState<userState>();
  const router = useRouter();
  const loadUserData = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");

      if (userInfo) {
        setUserValue(JSON.parse(userInfo));
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadUserData();
  }, []);
  const profileImageUrl = userValue?.profileImage.replace(
    "http://",
    "https://"
  );
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.profile}>
        <Image
          source={{ uri: profileImageUrl }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
          onError={() => console.log("Failed to load image")}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginLeft: 10,
            color: isDark ? "#fff" : "#000",
          }}
        >
          {userValue?.nickname}
        </Text>
      </TouchableOpacity>
      <View style={styles.menu}>
        <TouchableOpacity
          testID="calendar"
          onPress={() => router.push("/image/image")}
          style={styles.addPlan}
        >
          <Ionicons name="image" size={24} color={isDark ? "#FFF" : "#000"} />
        </TouchableOpacity>
        <TouchableOpacity
          testID="calendar"
          onPress={() => router.push("/Schedule/createSchedule")}
          style={styles.addPlan}
        >
          <Ionicons
            name="calendar"
            size={24}
            color={isDark ? "#FFF" : "#000"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggle} style={styles.button}>
          <Ionicons
            name={isDark ? "sunny" : "moon"}
            size={24}
            color={isDark ? "#FFF" : "#000"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
