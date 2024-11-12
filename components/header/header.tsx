import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { header } from "@/types/header";
import styles from "./styles";
import { useRouter } from "expo-router";
import { useRecoilValue } from "recoil";
import { userInfoState_unique } from "@/recoil/authState";

const Header = ({ toggle, isDark }: header) => {
  const userInfo = useRecoilValue(userInfoState_unique);
  const router = useRouter();
  const profileImageUrl = userInfo.profileImage.replace("http://", "https://");
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
          {userInfo.nickname} <Text style={{ color: "#B4B2B2" }}>님</Text>
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
