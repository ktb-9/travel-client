import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import me from "../../assets/images/me.jpeg";
import { header } from "@/types/header";

const Header = ({ toggle, isDark }: header) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.profile}>
        <Image
          source={me}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <Text style={{ marginLeft: 10, color: isDark ? "#fff" : "#000" }}>
          광열님
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggle} style={styles.button}>
        <Ionicons
          name={isDark ? "sunny" : "moon"}
          size={24}
          color={isDark ? "#FFF" : "#000"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    padding: 5,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
