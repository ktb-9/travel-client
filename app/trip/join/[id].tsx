import joinExistingGroup from "@/api/trip/joinExistingGroup";
import { queryKeys } from "@/constants/querykeys";
import tripIdState from "@/recoil/tripIdState";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useRecoilState } from "recoil";
type Params = {
  id: string;
};
const JoinGroup = () => {
  const params = useLocalSearchParams<Params>();
  const encodedId = params.id;
  const decodedId = decodeURIComponent(encodedId); // URL 디코딩
  const [, setTripId] = useRecoilState(tripIdState);
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleJoin = async () => {
    try {
      const response = await joinExistingGroup(parseInt(decodedId));
      if (response) {
        router.push(`/trip/${response}`);
        setTripId(response);
        queryClient.invalidateQueries({
          queryKey: [queryKeys.getPaymentMember, response],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleJoin();
  }, [decodedId]);
  return (
    <View>
      <Text>대기중</Text>
    </View>
  );
};
export default JoinGroup;
