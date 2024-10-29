import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import destination from "@/assets/images/destinationLogo.png";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useRecoilState, useRecoilValue } from "recoil";

import { Ionicons } from "@expo/vector-icons";
import { tripPlanState } from "@/recoil/tripPlanState";
import LocationItem from "../../location/locationItem";
interface DayPlan {
  day: number;
  destination: string;
  locations: Location[];
}
interface Location {
  name: string;
  address?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

const Content = ({ dayPlan }: { dayPlan: DayPlan }) => {
  const router = useRouter();
  const [, setTripPlan] = useRecoilState(tripPlanState);

  const updateDestination = (destination: string) => {
    setTripPlan((prev) => ({
      ...prev,
      days: prev.days.map((day) =>
        day.day === dayPlan.day ? { ...day, destination } : day
      ),
    }));
  };

  const handleMap = () => {
    router.push({
      pathname: "/map/map",
      params: { day: dayPlan.day },
    });
  };

  const deleteLocation = (index: number) => {
    setTripPlan((prev) => ({
      ...prev,
      days: prev.days.map((day) =>
        day.day === dayPlan.day
          ? {
              ...day,
              locations: day.locations.filter((_, i) => i !== index),
            }
          : day
      ),
    }));
  };

  return (
    <>
      <View style={styles.destinationWrapper}>
        <Image source={destination} style={styles.destinationLogo} />
        <TextInput
          style={styles.trip}
          value={dayPlan.destination}
          onChangeText={updateDestination}
          placeholder="여행지 입력해주세요..."
        />
      </View>
      <Text style={styles.day}>{dayPlan.day}일차</Text>
      <View style={{ alignItems: "center" }}>
        <View style={styles.locationContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="장소/맞집/숙소/검색"
            ></TextInput>
            <TouchableOpacity onPress={handleMap}>
              <Ionicons name="location" size={20} color="#0066cc" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.resultsList}>
            {dayPlan.locations.map((location, index) => (
              <LocationItem
                key={`location-${index}`}
                location={location}
                isLast={index === dayPlan.locations.length - 1}
                onDelete={() => deleteLocation(index)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};
export default Content;
