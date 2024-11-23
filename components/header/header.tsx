import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { header } from "@/types/header";
import styles from "./styles";
import { useRouter } from "expo-router";
import addGroupMutation from "@/hooks/api/addGroupMutation";
import { useRecoilValue } from "recoil";
import authState from "@/recoil/authState";

const Header = ({ toggle, isDark }: header) => {
  const userValue = useRecoilValue(authState);
  const { mutate } = addGroupMutation();
  const router = useRouter();
  const profileImageUrl = userValue?.profileImage.replace(
    "http://",
    "https://"
  );
  const createSchedule = () => {
    const body = {
      name: userValue?.nickname,
    };
    mutate(body);
  };
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
          onPress={() => router.push("/myTripList/myTripList")}
          style={styles.addPlan}
        >
          <Ionicons
            name="bag-check-outline"
            size={24}
            color={isDark ? "#FFF" : "#000"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          testID="calendar"
          onPress={() => router.push("/image/image")}
          style={styles.addPlan}
        >
          <Ionicons name="image" size={24} color={isDark ? "#FFF" : "#000"} />
        </TouchableOpacity>
        <TouchableOpacity
          testID="calendar"
          onPress={createSchedule}
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
