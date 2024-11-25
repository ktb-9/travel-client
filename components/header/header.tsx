import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { header } from "@/types/header";
import styles from "./styles";
import { useRouter } from "expo-router";
import addGroupMutation from "@/hooks/api/addGroupMutation";
import { useRecoilValue } from "recoil";
import authState from "@/recoil/authState";
import Button from "../common/Button/button";

const Header = ({ toggle, isDark }: header) => {
  const userValue = useRecoilValue(authState);
  console.log(userValue);
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
        <Button
          variant="icon"
          icon={{
            name: "bag-check-outline",
            size: 24,
          }}
          onPress={() => router.push("/myTripList/myTripList")}
        />
        <Button
          variant="icon"
          icon={{ name: "image", size: 24 }}
          onPress={() => router.push("/image/image")}
        />
        <Button
          variant="icon"
          icon={{ name: "calendar", size: 24 }}
          onPress={createSchedule}
        />
        <Button
          variant="icon"
          icon={{
            name: isDark ? "sunny" : "moon",
            size: 24,
            color: isDark ? "#FFF" : "#000",
          }}
          onPress={toggle}
        />
      </View>
    </View>
  );
};

export default Header;
