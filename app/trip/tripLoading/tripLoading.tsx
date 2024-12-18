import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import blobTop from "@/assets/images/gradientBlobTop.png";
import blobBottom from "@/assets/images/gradoemtBlopBottom.png";
import plane from "@/assets/images/plane.png";
import loadingCard from "@/assets/images/loadingCard.png";
import Button from "@/components/common/Button/button";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TripLoading = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          variant="icon"
          icon={{ name: "arrow-back", size: 24 }}
          onPress={() => router.push("/myTripList/myTripList")}
          style={styles.backBtn}
        />
        <Text style={styles.title}>여행 정보 불러오는중</Text>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>Trip</Text>
        </View>
      </View>
      <View style={styles.textWrapper}>
        <Text>----------</Text>
        <Ionicons name="airplane" size={10} color={"#6F7980"} />
        <Text>----------</Text>
      </View>
      <Image style={styles.blobTop} source={blobTop} />
      <Image style={styles.blobBottom} source={blobBottom} />

      <Image style={styles.plane} source={plane} />
      <Image style={styles.loadingCard} source={loadingCard} />

      <View style={styles.contentContainer}>
        <View style={styles.loadingCircle}>
          <ActivityIndicator size="large" color="white" />
        </View>
        <Text style={styles.loadingText}>여행 정보를 가져오고 있어요</Text>
        <Text style={styles.subLoadingText}>잠시만 기다려주세요</Text>
      </View>
    </SafeAreaView>
  );
};

export default TripLoading;
