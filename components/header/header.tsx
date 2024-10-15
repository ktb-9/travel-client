import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import me from "../../assets/images/me.jpeg";
import { header } from "@/types/header";
import styles from "./styles";

const Header = ({ toggle, isDark }: header) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.profile}>
        <Image
          source={me}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginLeft: 10,
            color: isDark ? "#fff" : "#000",
          }}
        >
          광열 <Text style={{ color: "#B4B2B2" }}>님</Text>
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

export default Header;
