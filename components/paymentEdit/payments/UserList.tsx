import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import check from "@/assets/images/check.png";
import checked from "@/assets/images/checked.png";
import {
  PaymentType,
  UserEditType,
  UserListProps,
  UserType,
} from "@/types/payment/payment";
import getPaymentMembersQuery from "@/hooks/api/getPaymentMembersQuery";
import { useRecoilValue } from "recoil";
import tripIdState from "@/recoil/tripIdState";

const UserList: React.FC<UserListProps> = ({
  value,
  onPaymentUserCheck,
  onUserGroupAdd,
}) => {
  const tripId = useRecoilValue(tripIdState);
  const { data, isLoading, isError } = getPaymentMembersQuery(tripId);
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError || !data) {
    return <Text>에러 트립</Text>;
  }
  return (
    <View style={styles.nBbangSection}>
      <Text style={styles.nBbangTitle}>n빵 하기</Text>
      <View style={styles.userContainer}>
        {data.map((user: UserEditType) => (
          <View key={user.user_id} style={styles.userRow}>
            <View style={styles.userInfo}>
              <Image
                style={styles.userAvatar}
                source={{
                  uri: user.profile_image.replace("http://", "https://"),
                }}
              />
              <Text style={styles.userName}>
                {user.isMe ? "(나) " : ""}
                {user.nickname}
              </Text>
            </View>
            <View style={styles.checkContainer}>
              <View style={styles.checkItem}>
                <Text style={styles.checkLabel}>결제</Text>
                <TouchableOpacity
                  style={styles.checkCircle}
                  onPress={() => onPaymentUserCheck(user.user_id)}
                >
                  <Image
                    style={styles.checked}
                    source={value.pay === user.user_id ? checked : check}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.checkItem}>
                <Text style={styles.checkLabel}>n빵</Text>
                <TouchableOpacity
                  style={styles.checkCircle}
                  onPress={() => onUserGroupAdd(user.user_id)}
                >
                  <Image
                    style={styles.checked}
                    source={
                      value.group.some(
                        (groupMember: any) =>
                          groupMember.user_id === user.user_id
                      )
                        ? checked
                        : check
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
export default UserList;
