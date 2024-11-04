import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import plusIcon from "@/assets/images/plus.png";
import Content from "./content/content";
import { useRecoilState, useRecoilValue } from "recoil";
import { tripPlanState } from "@/recoil/tripPlanState";
import { createSchdeuleState } from "@/recoil/createSchdeuleState";
import scheduleMutations from "@/hooks/api/scheduleMutation";

const Plan = () => {
  const groupInfo = useRecoilValue(createSchdeuleState);
  const [tripPlan, setTripPlan] = useRecoilState(tripPlanState);
  const addDay = () => {
    setTripPlan((prev) => ({
      ...prev,
      days: [
        ...prev.days,
        {
          day: prev.days.length + 1,
          destination: "",
          locations: [],
        },
      ],
    }));
  };

  const handleSubmit = async () => {
    const body = {
      date: groupInfo.date,
      groupId: groupInfo.groupId,
      groupName: groupInfo.groupName,
      days: tripPlan.days,
    };

    mutate(body);
  };
  const { mutate } = scheduleMutations();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>여행일정</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.contentWrapper}>
          {tripPlan.days.map((value) => (
            <Content key={value.day} dayPlan={value} />
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addDay}>
        <Image source={plusIcon} style={styles.addButtonIcon} />
        <Text style={styles.addButtonText}>일정 추가</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>일정 확정</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Plan;
